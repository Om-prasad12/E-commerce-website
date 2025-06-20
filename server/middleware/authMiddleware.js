const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


function verifyUser(req, res, next) {
  const token = req.cookies.id;
  if (!token) return res.status(401).json({ message: 'Login first' });
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    req.userId = id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function isAdmin(req,res,next){
    if (!req.userId) return res.status(401).json({ message: 'Login first' });
    userModel.findById(req.userId)
        .then(user => {
        if (!user || !user.role || !user.role.includes('admin')) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
        })
        .catch(err => {
        console.error('Error checking admin status:', err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
}

function isAuthenticated(req, res, next) {
    if (!req.userId) return res.status(401).json({ message: 'Login first' });
    userModel.findById(req.userId)
        .then(user => {
            if (!user || !user.role || (!user.role.includes('vendor') && !user.role.includes('admin'))) {
                return res.status(403).json({ message: "Access denied" });
            }
            next();
        })
        .catch(err => {
            console.error('Error checking vendor status:', err);
            res.status(500).json({ message: 'Something went wrong', error: err.message });
        });
}

async function attachUserInfo(req, res, next) {
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });
    
    req.userName = user.name ||  user.email || 'Unknown User';
    req.isAdmin = user.role.includes('admin');
    req.isVendor = user.role.includes('vendor');
    next();
}


module.exports ={verifyUser, isAdmin, isAuthenticated,attachUserInfo};
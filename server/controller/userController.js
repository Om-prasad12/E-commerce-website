const userModel = require('../models/userModel')


//Middleware to get user id



//For the admin to get all users
async function getUser(req, res){
    try{
        const users = await userModel.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({message:'Something went wrong',error:error.message});
    }
}

//For admin to get used profile by id
async function getUserId(req, res){
    try {
        if (req.userId !== req.params.id) {
            return res.status(403).json({ message: "Not authorized" });
        }
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({message:'Something went wrong',error:error.message});
    }
}


//For the user to get their profile
async function getMyProfile(req, res) {
  try {
    const user = await userModel.findById(req.userId);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({message:'Something went wrong',error:error.message});
  }
}


//For user to update their profile
async function updateMyProfile(req, res){
    try {
    const updates = req.body;
    const allowedUpdates = [
      'name', 'phone', 'profilePicture', 'addresses','notifications', 'rewardsPoints', 'isBlocked'
    ];

    // Optional: validate incoming fields
    const isValidOperation = Object.keys(updates).every(key => allowedUpdates.includes(key));
    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates in request body" });
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", data: updatedUser });
    } catch(error) {
        console.error('Error updating user by ID:', error);
        res.status(500).json({message:'Something went wrong',error:error.message});
    }   
}

async function deleteMyProfile(req, res){
    try{
        const user = await userModel.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });

    }catch(error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({message:'Something went wrong',error:error.message});
      }
}

//For user to get their cart
async function getMyCart(req, res) {
  try {
    const user = await userModel.findById(req.userId).select('cart');
    if (!user) return res.status(404).json({ message: 'User not found' });
     
    res.status(200).json(user.cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({message:'Something went wrong',error:error.message});
  }
}

//For user to add item to their cart
async function addToCart(req, res) {
  try {
    const { productId,vendorId} = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }
    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Login to add product into cart' });

    // Check if product already exists in cart
    const existingItem = user.cart.find(item => item.productId.toString() === productId.toString());
    if (existingItem) {
      existingItem.quantity +=1; // Update quantity
    } else {
      user.cart.push({ productId,vendorId}); // Add new item
    }

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({message:'Something went wrong',error:error.message});
  }
}

//For user to update their cart
async function updateCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Login to update cart' });

    // Find the item in the cart
    const item = user.cart.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    if(item.quantity==item.maxQuantity && quantity>0){
      return res.status(400).json({ message: 'Max limit reached' });
    }
    item.quantity += quantity; // Update quantity
    if(item.quantity <= 0) {
      // If quantity is 0 or less, remove the item from the cart
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);
    }
    await user.save();
    
    res.status(200).json({ message: 'Cart updated', cart: user.cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({message:'Something went wrong',error:error.message});
  }
}

//for user to get their wishlist
async function getMyWishlist(req,res){
  try{
      const user = await userModel.findById(req.userId).select('wishlist');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user.wishlist);
  } catch(error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({message:'Something went wrong',error:error.message});
  }
}

//For user to add item to their wishlist
async function addToWishlist(req, res) {
  try {
    const { productId,vendorId } = req.body;
    if (!productId || !vendorId) {
      return res.status(400).json({ message: 'Product ID and Vendor ID are required' });
    }

    const user = await userModel.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Login to add product into wishlist' });

    // Check if product already exists in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    if(user.wishlist.length >= 20) {
      return res.status(400).json({ message: 'Wishlist limit reached (20 items)' });
    }

    user.wishlist.push({ product: productId, vendorId }); // Add new item with vendor
    await user.save();
    
    res.status(200).json({ message: 'Item added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({message:'Something went wrong',error:error.message});
  }
}

//For user to delete item from their wishlist 
async function deleteWishlist(req, res) {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const user = await userModel.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'Login to delete product from wishlist' });

        // Check if product exists in wishlist
        const index = user.wishlist.indexOf(productId);
        if (index === -1) {
            return res.status(404).json({ message: 'Product not found in wishlist' });
        }

        user.wishlist.splice(index, 1); // Remove item
        await user.save();
        
        res.status(200).json({ message: 'Item removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        console.error('Error deleting from wishlist:', error);
        res.status(500).json({message:'Something went wrong',error:error.message});
    }
}

module.exports = {
    getUser,
    getUserId,
    getMyProfile,
    updateMyProfile,
    deleteMyProfile,
    getMyCart,
    addToCart,
    updateCart,
    getMyWishlist,
    addToWishlist,
    deleteWishlist
};
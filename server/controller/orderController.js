const OrderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
}

async function createOrder(req, res) {
  try {
    const { products, shippingAddress, totalAmount} = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required and cannot be empty' });
    }
    
    const order = new OrderModel({
      user: req.userId, 
      products: products,
      totalAmount,
      shippingAddress,
      paymentStatus:req.body.paymentStatus || 'Pending',
    });
    const user= await userModel.findOneAndUpdate(
      { _id: req.userId },
      { $push: { orders: order._id } },
      { new: true });
      
    
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
}


const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await OrderModel.findById(id)
      .populate("user", "name email") // fetch user details
      .populate("products.product");  // fetch product details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
};


const updateOderStatus = async (req, res) => {
  try{
      const { id } = req.params;
      const { orderStatus } = req.body;
      const orderStatusCheck= await OrderModel.findById(id);
      if (!orderStatusCheck) {
        return res.status(404).json({ message: 'Order not found' });
      }
      if(orderStatusCheck.orderStatus === 'Delivered' || orderStatusCheck.orderStatus === 'Cancelled'){
        return res.status(400).json({ message: `Order status cannot be updated for ${orderStatusCheck.orderStatus} orders` });
      }
      const order = await OrderModel.findByIdAndUpdate(
        id,
        { orderStatus },
        { new: true }
      );

      res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
}


module.exports ={getAllOrders, getOrderById,createOrder, updateOderStatus};
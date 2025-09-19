const catchAsyncError = require('../middleware/CatchAsyncError');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

//Create New Order 
exports.newOrder =  catchAsyncError( async (req, res, next) => {
     const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    paymentInfo,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler('No order items', 400));
  }

  const order = await orderModel.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    paymentInfo: paymentMethod === 'Card' ? paymentInfo : {},
    paidAt: paymentMethod === 'Card' ? Date.now() : null,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
})

//Get Loggedin User Orders - myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({user: req.user.id});

  res.status(200).json({
      success: true,
      orders
  })
})

//Get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await orderModel.findById(req.params.id).populate('user');
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})





//Admin 

// 1.Get All Orders 
exports.orders = catchAsyncError(async (req, res, next) => {
    const orders = await orderModel.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


// 2. Update Order / Order Status 
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found!', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Order has been already delivered!', 400));
  }

  // Update stock for each order item
  for (const orderItem of order.orderItems) {
    await updateStock(orderItem.product, orderItem.quantity);
  }

  const updatedData = {
    orderStatus: req.body.orderStatus,
  };

  if (req.body.orderStatus === 'Delivered') {
    updatedData.deliveredAt = Date.now();
  }

  const updatedOrder = await orderModel.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    order: updatedOrder,
  });
});

async function updateStock(productId, quantity) {
  const product = await productModel.findById(productId);
  if (!product) throw new Error("Product not found");

  const newStock = product.stock - quantity;

  if (newStock < 0) {
    throw new Error(`Insufficient stock for product ${product._id}`);
  }

  product.stock = newStock;
  await product.save({ validateBeforeSave: false });
}


// 3.Delete Order 
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await orderModel.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }

    await order.deleteOne();
    res.status(200).json({
        success: true,
        message:"Deleted successfully"
    })
})


import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction } from "../../actions/orderAction";
import Loader from "../Navbar/Loader";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentMethod,
    _id
  } = orderDetail;

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section className=" mx-auto px-4 py-10">
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
            {/* Header */}
            <div className="border-b pb-4">
              <h2 className="text-3xl font-bold text-gray-800">
                Order Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">Order ID: {_id}</p>
            </div>

            {/* Shipping Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Shipping Information
              </h3>
              <div className="space-y-1 text-gray-600">
                <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
                <p><strong>Phone:</strong> {shippingInfo.phoneNo}</p>
                <p>
                  <strong>Address:</strong> {shippingInfo.address}, {shippingInfo.city},{" "}
                  {shippingInfo.country}
                </p>
                <p><strong>Amount:</strong> Rs. {totalPrice}</p>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Payment Method
              </h3>
              <p className="text-green-600 font-bold">{paymentMethod}</p>
            </div>

            {/* Order Status */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Order Status
              </h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  orderStatus === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : orderStatus === "Processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {orderStatus}
              </span>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Items in Your Order
              </h3>

              <div className="space-y-4">
                {orderItems?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-y pb-4"
                  >
                    {/* Image */}
                    <div className="sm:col-span-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-20 object-contain"
                      />
                    </div>

                    {/* Product Name */}
                    <div className="sm:col-span-5">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {item.name}
                      </Link>
                    </div>

                    {/* Price */}
                    <div className="sm:col-span-2 text-gray-600">
                      Rs. {item.price}
                    </div>

                    {/* Quantity */}
                    <div className="sm:col-span-3 text-gray-600">
                      {item.quantity} Piece(s)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default OrderDetails;

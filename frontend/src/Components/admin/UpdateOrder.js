import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "./Sidebar";
import {
  orderDetail as orderDetailsAction,
  adminUpdateOrders,
} from "../../actions/orderAction";
import { clearError, clearOrderUpdated } from "../../slices/orderSlice";
import Loader from "../Navbar/Loader";

function UpdateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );

  const {
    orderItems = [],
    user = null,
    shippingInfo = {},
    totalPrice = 0,
    paymentMethod = "N/A",
    createdAt = null,
    orderStatus: currentStatus = "Processing",
  } = orderDetail || {};

  const [orderStatus, setOrderStatus] = useState("Processing");

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success("Order updated successfully!", {
        position: "top-right",
        onOpen: () => dispatch(clearOrderUpdated()),
      });
      navigate("/admin/orders");
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onOpen: () => dispatch(clearError()),
      });
    }

    dispatch(orderDetailsAction(orderId));
  }, [dispatch, orderId, isOrderUpdated, error, navigate]);

  useEffect(() => {
    if (orderDetail?._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminUpdateOrders(orderId, { orderStatus }));
  };

  const getStatusBadge = (status) => {
    let badgeClass = "secondary";
    if (status === "Processing") badgeClass = "warning";
    else if (status === "Shipped") badgeClass = "info";
    else if (status === "Delivered") badgeClass = "success";
    else if (status === "Cancelled") badgeClass = "danger";

    return <span className={`badge bg-${badgeClass}`}>{status}</span>;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 col-12 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10 col-12 p-4">
          <h2 className="mb-4 text-center">Update Order</h2>

          {loading ? (
            <Loader />
          ) : (
            <div className="row gx-4">
              {/* Left Column */}
              <div className="col-lg-6 mb-4">
                {/* User Info */}
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">User Information</h5>
                  </div>
                  <div className="card-body">
                    <p><strong>Name:</strong> {user?.firstname ?? "N/A"} {user?.lastname ?? ""}</p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {user?.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : "N/A"}
                    </p>
                    {user?.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="card shadow-sm mb-4">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">Shipping Information</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Address:</strong>{" "}
                      {shippingInfo.address ?? "N/A"}, {shippingInfo.city ?? ""}
                      {shippingInfo.state ? `, ${shippingInfo.state}` : ""}
                      {shippingInfo.postalCode ? `, ${shippingInfo.postalCode}` : ""}
                      {shippingInfo.country ? `, ${shippingInfo.country}` : ""}
                    </p>
                  </div>
                </div>

                {/* Payment & Summary */}
                <div className="card shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Order Summary</h5>
                  </div>
                  <div className="card-body">
                    <p><strong>Payment Method:</strong> {paymentMethod}</p>
                    <p><strong>Total Price:</strong> Rs. {totalPrice.toLocaleString()}</p>
                    <p><strong>Order Date:</strong> {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}</p>
                    <p><strong>Status:</strong> {getStatusBadge(currentStatus)}</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-lg-6 mb-4">
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="orderStatus" className="form-label">
                          Update Status
                        </label>
                        <select
                          id="orderStatus"
                          className="form-select"
                          value={orderStatus}
                          onChange={(e) => setOrderStatus(e.target.value)}
                          required
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      <div className="d-grid mb-4">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Update Order"}
                        </button>
                      </div>
                    </form>

                    <h5>Order Items</h5>
                    <ul className="list-group">
                      {orderItems.length > 0 ? (
                        orderItems.map((item, index) => (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center"
                            key={index}
                          >
                            <div>
                              <strong>{item.name}</strong> <br />
                              Qty: {item.quantity} <br />
                              Price: Rs. {item.price.toLocaleString()}
                            </div>
                            <div>
                              Rs. {(item.quantity * item.price).toLocaleString()}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item">No items found.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateOrder;

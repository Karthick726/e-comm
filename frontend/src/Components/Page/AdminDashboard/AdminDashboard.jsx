import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Home/UserLogin/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "./Common/Layout/Header/Header";
import client from "../../Common/Client/Client";

const AdminDashboard = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getFullOrder();
    getProducts();
  }, []);

  const getFullOrder = async () => {
    try {
      const response = await client.get("/order/get-fullorder", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const response = await client.get("/product/get-products", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

      <main id="main" className="main">
        <div className="pagetitle">
          <h2 className="admin-dash-title">Admin Dashboard</h2>

          <div className="admin-dash-grid">
            <div className="admin-dash-card">
              <h3>Total Orders</h3>
              <p>{orders.length}</p>
              <button
                onClick={() => navigate("/admin/order")}
                className="admin-dash-btn"
              >
                View Orders
              </button>
            </div>

            <div className="admin-dash-card">
              <h3>Total Products</h3>
              <p>{products.length}</p>
              <button
                onClick={() => navigate("/service-add")}
                className="admin-dash-btn"
              >
                View Products
              </button>
            </div>
          </div>

          <div className="admin-dash-orders">
            <h3>Recent Orders</h3>
            <div className="admin-dash-table-container">
              <table className="admin-dash-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Placed At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) =>
                    order.orderItems.map((item) => (
                      <tr key={item._id}>
                        <td className="admin-dash-product">
                          <img
                            src={item.productDetails.image[0]}
                            alt={item.productDetails.productName}
                            className="admin-dash-img"
                          />
                          <span>{item.productDetails.productName}</span>
                        </td>
                        <td>{order.userDetails.username}</td>
                        <td
                          className={
                            item.orderStatus === "Delivered"
                              ? "admin-dash-status delivered"
                              : "admin-dash-status cancelled"
                          }
                        >
                          {item.orderStatus}
                        </td>
                        <td>₹{item.price}</td>
                        <td>{new Date(item.placedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

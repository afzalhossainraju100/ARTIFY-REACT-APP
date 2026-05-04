import React, { useState, useEffect, useMemo, use } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const ArtBooking = () => {
  const navigate = useNavigate();
  const authContext = use(AuthContext);
  const { user, role, profile } = authContext || {};

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // ===== FETCH ORDERS FROM API =====
  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, role]);

  const userRole = role;

  const filteredOrders = useMemo(() => {
    if (!user || !role || orders.length === 0) {
      return [];
    }

    const matchesUser = (value, fallback) =>
      value === user?.uid || value === profile?.uid || value === fallback;

    return role === "customer"
      ? orders.filter((order) =>
          matchesUser(order?.buyer?.id, order?.buyer?.email),
        )
      : role === "artist"
        ? orders.filter((order) =>
            matchesUser(order?.artist?.id, order?.artist?.email),
          )
        : [];
  }, [orders, profile?.uid, role, user]);

  // ===== HANDLE PAYMENT NAVIGATION =====
  const handlePayment = (order) => {
    navigate("/payment", {
      state: {
        order,
        art: order?.artwork,
        totalAmount: order?.totalAmount || order?.artwork?.price,
      },
    });
  };

  // ===== HANDLE SOLD TOGGLE FOR ARTIST =====
  const handleSoldToggle = async (order) => {
    setUpdatingOrderId(order._id);

    try {
      // Determine new status
      const currentStatus = order?.artwork?.status || "unpaid";
      const newStatus = currentStatus === "sold" ? "paid" : "sold";

      // Update order with new status
      const updatedOrder = {
        ...order,
        artwork: {
          ...order?.artwork,
          status: newStatus,
        },
      };

      const response = await fetch(
        `http://localhost:3000/orders/${order._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update local state
      const updatedOrders = orders.map((o) =>
        o._id === order._id ? updatedOrder : o,
      );
      setOrders(updatedOrders);

      console.log(`Order status updated to: ${newStatus}`, updatedOrder);
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // ===== RENDER EMPTY STATE =====
  if (!user) {
    return (
      <section className="min-h-screen bg-amber-50 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center py-16">
            <p className="text-lg text-stone-600 mb-6">
              Please login to view your orders
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-amber-50 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-stone-600">Loading your orders...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-amber-50 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center py-16">
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <section className="min-h-screen bg-amber-50 py-12 px-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl text-stone-900 mb-12">
            My Orders
          </h1>
          <div className="bg-white p-12 text-center border border-stone-300">
            <p className="text-lg text-stone-600 mb-6">
              {userRole === "customer"
                ? "No orders yet. Start exploring our gallery!"
                : userRole === "artist"
                  ? "No orders for your artworks yet. Keep creating!"
                  : "No orders found."}
            </p>
            {userRole === "customer" && (
              <button
                onClick={() => navigate("/all-arts")}
                className="px-6 py-3 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
              >
                Explore Gallery
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-stone-900 mb-2">My Orders</h1>
          <p className="text-stone-600">
            {userRole === "customer"
              ? "Your art purchases and bookings"
              : "Orders placed for your artworks"}
          </p>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              userRole={userRole}
              onPayment={handlePayment}
              onSoldToggle={handleSoldToggle}
              isUpdating={updatingOrderId === order._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== ORDER CARD COMPONENT =====
const OrderCard = ({
  order,
  userRole,
  onPayment,
  onSoldToggle,
  isUpdating,
}) => {
  const artworkStatus = order?.artwork?.status || "unpaid";
  const isSold = artworkStatus === "sold";
  const isUnpaid = artworkStatus === "unpaid";

  const getStatusColor = () => {
    switch (artworkStatus) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-300";
      case "sold":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "unpaid":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="bg-white border border-stone-300 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Artwork Image */}
      <div className="relative h-64 bg-linear-to-br from-purple-900 via-purple-700 to-amber-900 overflow-hidden">
        {order?.artwork?.thumbnail && (
          <img
            src={order?.artwork?.thumbnail}
            alt={order?.artwork?.title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded ${getStatusColor()}`}
        >
          {artworkStatus}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Artwork Title */}
        <h3 className="font-serif text-lg text-stone-900 mb-2 truncate">
          {order?.artwork?.title || "Artwork"}
        </h3>

        {/* Price */}
        <p className="text-2xl font-bold text-amber-600 mb-4">
          ${order?.artwork?.price?.toLocaleString() || "0"}
        </p>

        {/* Order Details */}
        <div className="space-y-2 mb-6 pb-6 border-b border-stone-200 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
              {userRole === "customer" ? "Artist" : "Buyer"}
            </p>
            <p className="text-stone-900 font-medium">
              {userRole === "customer"
                ? order?.artist?.name || "Artist"
                : order?.buyer?.name || "Customer"}
            </p>
          </div>

          {/* Artwork Specs */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <p className="text-xs text-stone-600">Medium</p>
              <p className="text-sm text-stone-900 font-medium">
                {order?.artwork?.medium || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-stone-600">Category</p>
              <p className="text-sm text-stone-900 font-medium">
                {order?.artwork?.category || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <div className="space-y-3 mb-6 pb-6 border-b border-stone-200 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
              Order Date
            </p>
            <p className="text-stone-900">
              {new Date(order?.orderDate).toLocaleDateString()}
            </p>
          </div>

          {userRole === "customer" && order?.delivery && (
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
                Delivery
              </p>
              <p className="text-stone-900">
                {order?.delivery?.city}, {order?.delivery?.state}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* CUSTOMER: Payment Button for Unpaid Orders */}
          {userRole === "customer" && isUnpaid && (
            <button
              onClick={() => onPayment(order)}
              className="w-full py-3 bg-amber-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors"
            >
              Complete Payment
            </button>
          )}

          {/* CUSTOMER: Paid Status Message */}
          {userRole === "customer" && !isUnpaid && (
            <div className="w-full py-3 bg-green-100 text-green-800 font-semibold text-sm uppercase tracking-wider text-center border border-green-300">
              ✓ {artworkStatus === "sold" ? "Sold" : "Paid"}
            </div>
          )}

          {/* ARTIST: Sold Toggle Button */}
          {userRole === "artist" && (
            <button
              onClick={() => onSoldToggle(order)}
              disabled={isUpdating}
              className={`w-full py-3 font-semibold text-sm uppercase tracking-wider transition-colors border ${
                isSold
                  ? "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                  : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
              } disabled:opacity-50`}
            >
              {isUpdating
                ? "Updating..."
                : isSold
                  ? "✓ Mark as Sold"
                  : "Mark as Sold"}
            </button>
          )}

          {/* View Details Link */}
          <button className="w-full py-3 border border-stone-300 text-stone-900 font-semibold text-sm uppercase tracking-wider hover:bg-stone-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtBooking;

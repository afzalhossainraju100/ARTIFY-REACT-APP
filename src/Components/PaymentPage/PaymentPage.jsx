import React, { use, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const generateInvoice = (order) => {
  const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const invoiceDate = new Date().toISOString();
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  return {
    invoiceNumber,
    invoiceDate,
    dueDate,
    status: "paid",
    buyer: {
      name: order?.buyer?.name,
      email: order?.buyer?.email,
      phone: order?.buyer?.phone,
      address: order?.delivery?.address,
      city: order?.delivery?.city,
      state: order?.delivery?.state,
      zipCode: order?.delivery?.zipCode,
      country: order?.delivery?.country,
    },
    artist: {
      name: order?.artist?.name,
      email: order?.artist?.email,
    },
    artwork: {
      title: order?.artwork?.title,
      medium: order?.artwork?.medium,
      category: order?.artwork?.category,
      dimensions: order?.artwork?.dimensions,
      price: order?.artwork?.price,
    },
    delivery: {
      type: order?.delivery?.type,
      address: order?.delivery?.address,
      city: order?.delivery?.city,
      state: order?.delivery?.state,
      zipCode: order?.delivery?.zipCode,
      country: order?.delivery?.country,
    },
    artHandling: {
      frameOption: order?.artHandling?.frameOption,
      glassType: order?.artHandling?.glassType,
    },
    specialInstructions: order?.specialInstructions,
    itemsBreakdown: {
      artworkPrice: order?.artwork?.price,
      framePrice:
        order?.artHandling?.frameOption === "basic-frame"
          ? 50
          : order?.artHandling?.frameOption === "premium-frame"
            ? 150
            : 0,
      deliveryPrice:
        order?.delivery?.type === "express"
          ? 25
          : order?.delivery?.type === "overnight"
            ? 50
            : 0,
    },
    totalAmount: order?.totalAmount,
    paymentMethod: "Credit Card",
    paymentStatus: "completed",
    paidAt: new Date().toISOString(),
  };
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = use(AuthContext);
  const role = authContext?.role;

  const { order, art, totalAmount } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState("credit-card");

  // ===== HANDLE PAYMENT (DUMMY PAYMENT) =====
  const handlePayment = async () => {
    if (!order) {
      setError("No order found");
      return;
    }

    if (role && role !== "customer") {
      setError("Only customers can complete payment.");
      return;
    }

    if (!selectedCard) {
      setError("Please select a payment method.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Generate invoice with all order details
      const invoice = generateInvoice(order);

      // Update order with payment and invoice
      const updatedOrder = {
        ...order,
        artwork: {
          ...order.artwork,
          status: "paid",
        },
        paymentInfo: {
          method: "credit-card",
          status: "completed",
          paidAt: new Date().toISOString(),
        },
        invoice: invoice,
      };

      // Send payment update to API
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
        throw new Error("Payment processing failed");
      }

      const result = await response.json();
      console.log("Payment successful:", result);

      // Show success message
      setPaymentSuccess(true);

      // Redirect to profile after 2 seconds
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  // ===== HANDLE CANCEL =====
  const handleCancel = () => {
    navigate(-1);
  };

  // ===== SUCCESS PAGE RENDERING =====
  if (paymentSuccess) {
    const invoice = generateInvoice(order);
    return (
      <section className="min-h-screen bg-amber-50 py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="font-serif text-4xl text-stone-900 mb-3">
              Order Confirmed!
            </h1>
            <p className="text-stone-600 text-lg">
              Your payment has been processed successfully.
            </p>
          </div>

          {/* Invoice Display */}
          <div className="bg-white border-2 border-amber-600 p-10 max-w-2xl mx-auto">
            <div className="mb-8 pb-8 border-b-2 border-stone-300">
              <h2 className="font-serif text-3xl text-stone-900 mb-6">
                Invoice
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                    Invoice Number
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {invoice.invoiceNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                    Invoice Date
                  </p>
                  <p className="text-lg font-bold text-stone-900">
                    {new Date(invoice.invoiceDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Bill To Section */}
            <div className="mb-8 pb-8 border-b-2 border-stone-300">
              <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-4">
                Bill To
              </p>
              <p className="font-semibold text-stone-900">
                {invoice.buyer.name}
              </p>
              <p className="text-stone-600">{invoice.buyer.email}</p>
              <p className="text-stone-600">{invoice.buyer.phone}</p>
              <p className="text-stone-600 mt-2">{invoice.buyer.address}</p>
              <p className="text-stone-600">
                {invoice.buyer.city}, {invoice.buyer.state}{" "}
                {invoice.buyer.zipCode}
              </p>
              <p className="text-stone-600">{invoice.buyer.country}</p>
            </div>

            {/* Artwork Details */}
            <div className="mb-8 pb-8 border-b-2 border-stone-300">
              <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-4">
                Artwork Details
              </p>
              <p className="text-lg font-semibold text-stone-900">
                {invoice.artwork.title}
              </p>
              <p className="text-sm text-stone-600 mt-2">
                {invoice.artwork.medium} • {invoice.artwork.category}
              </p>
              <p className="text-sm text-stone-600">
                Dimensions: {invoice.artwork.dimensions}
              </p>
            </div>

            {/* Itemization */}
            <div className="mb-8 pb-8 border-b-2 border-stone-300">
              <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-4">
                Item Breakdown
              </p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-stone-700">Artwork Price</span>
                  <span className="font-semibold">
                    ${invoice.itemsBreakdown.artworkPrice.toFixed(2)}
                  </span>
                </div>
                {invoice.itemsBreakdown.framePrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-stone-700">
                      {invoice.artHandling.frameOption === "basic-frame"
                        ? "Basic"
                        : "Premium"}{" "}
                      Frame
                    </span>
                    <span className="font-semibold">
                      ${invoice.itemsBreakdown.framePrice.toFixed(2)}
                    </span>
                  </div>
                )}
                {invoice.itemsBreakdown.deliveryPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-stone-700">
                      {invoice.delivery.type === "express"
                        ? "Express"
                        : "Overnight"}{" "}
                      Delivery
                    </span>
                    <span className="font-semibold">
                      ${invoice.itemsBreakdown.deliveryPrice.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Total */}
            <div className="bg-amber-50 p-6 border-2 border-amber-600">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-stone-900">
                  Total Amount
                </span>
                <span className="text-3xl font-bold text-amber-600">
                  ${invoice.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center mt-12">
            <p className="text-stone-600 mb-6">
              A confirmation email with your invoice has been sent to{" "}
              <span className="font-semibold">{order?.buyer?.email}</span>
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="px-8 py-3 bg-amber-600 text-white font-semibold uppercase tracking-wider hover:bg-amber-700 transition-colors"
            >
              Go to Profile
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!order || !art) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-6">No order found</p>
          <button
            onClick={() => navigate("/all-arts")}
            className="px-6 py-3 bg-amber-600 text-white hover:bg-amber-700"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h1 className="font-serif text-3xl text-stone-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-stone-600 mb-6">
            Your order has been placed successfully. You will receive a
            confirmation email shortly.
          </p>
          <p className="text-sm text-stone-500">
            Redirecting to your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 text-sm uppercase tracking-wider text-amber-700 border border-amber-600 hover:bg-amber-100"
        >
          ← Back
        </button>
        <h1 className="font-serif text-4xl text-stone-900 mb-2">Payment</h1>
        <p className="text-stone-600 mb-12">
          Complete your purchase to finalize your art booking
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Payment Processing */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 border border-stone-300">
              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-stone-900 mb-6">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {/* Credit Card Option */}
                  <label
                    className={`p-4 border-2 rounded cursor-pointer transition-all ${
                      selectedCard === "credit-card"
                        ? "border-amber-600 bg-amber-50"
                        : "border-stone-300 bg-white hover:border-amber-400"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={selectedCard === "credit-card"}
                        onChange={(e) => setSelectedCard(e.target.value)}
                        className="w-5 h-5 accent-amber-600"
                      />
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-12 h-8 bg-linear-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-stone-900">
                            Credit/Debit Card
                          </p>
                          <p className="text-xs text-stone-600">
                            Visa, Mastercard, Amex accepted
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dummy Payment Notice */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded mb-8">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900">Demo Payment</p>
                    <p className="text-blue-700 text-xs">
                      This is a demo payment. Click "Complete Payment" to
                      process your order.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handlePayment}
                  disabled={loading || !selectedCard}
                  className="w-full py-4 bg-amber-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-amber-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? "Processing Payment..." : "Complete Payment"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="w-full py-4 border border-stone-300 text-stone-900 font-semibold text-sm uppercase tracking-wider hover:bg-stone-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
              </div>

              {/* Terms */}
              <p className="text-xs text-stone-600 mt-4">
                By completing this payment, you agree to our terms and
                conditions. Your order and invoice will be confirmed via email.
              </p>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-stone-300 sticky top-8">
              <h2 className="font-serif text-lg text-stone-900 mb-6">
                Order Summary
              </h2>

              {/* Art Image */}
              <div className="mb-6 bg-linear-to-br from-purple-900 via-purple-700 to-amber-900 aspect-square overflow-hidden">
                {(art?.thumbnail || art?.imageUrl) && (
                  <img
                    src={art?.thumbnail || art?.imageUrl}
                    alt={art?.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Art Details */}
              <div className="mb-6 pb-6 border-b border-stone-300">
                <h3 className="font-semibold text-stone-900">{art?.title}</h3>
                <p className="text-xs text-stone-600 mt-2">
                  by {art?.user?.name || order?.artist?.name || "Artist"}
                </p>
              </div>

              {/* Buyer Info */}
              <div className="mb-6 pb-6 border-b border-stone-300">
                <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                  Buyer Information
                </p>
                <p className="text-sm text-stone-900 font-semibold">
                  {order?.buyer?.name}
                </p>
                <p className="text-xs text-stone-600">{order?.buyer?.email}</p>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-stone-300">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Artwork</span>
                  <span className="font-semibold">
                    ${order?.artwork?.price?.toLocaleString() || "0"}
                  </span>
                </div>
                {order?.delivery?.type &&
                  order?.delivery?.type !== "standard" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Shipping</span>
                      <span className="font-semibold">
                        ${order?.delivery?.type === "express" ? "25" : "50"}
                      </span>
                    </div>
                  )}
                {order?.artHandling?.frameOption &&
                  order?.artHandling?.frameOption !== "no-frame" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Framing</span>
                      <span className="font-semibold">
                        $
                        {order?.artHandling?.frameOption === "basic-frame"
                          ? "50"
                          : "150"}
                      </span>
                    </div>
                  )}
              </div>

              {/* Total Amount */}
              <div className="flex justify-between mb-6">
                <span className="font-serif text-lg text-stone-900">Total</span>
                <span className="font-serif text-2xl text-amber-600">
                  $
                  {totalAmount?.toLocaleString() ||
                    order?.totalAmount?.toLocaleString() ||
                    "0"}
                </span>
              </div>

              {/* Status */}
              <div className="text-xs text-amber-700 bg-amber-50 p-3 rounded">
                <p className="font-semibold">
                  Status: {order?.artwork?.status?.toUpperCase() || "PENDING"}
                </p>
                <p className="mt-1">Payment required to complete order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;

import React, { useState, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = use(AuthContext);
  const { user, role, profile } = authContext || {};

  const { art, artist } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: profile?.name || user?.displayName || "",
    buyerEmail: profile?.email || user?.email || "",
    buyerPhone: "",
    deliveryAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    frameOption: "no-frame",
    glassType: "standard",
    deliveryType: "standard",
    specialInstructions: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  // ===== HANDLE INPUT CHANGE =====
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ===== VALIDATE FORM =====
  const validateForm = () => {
    const newErrors = {};
    if (!formData.buyerName.trim()) newErrors.buyerName = "Name is required";
    if (
      !formData.buyerEmail.trim() ||
      !/\S+@\S+\.\S+/.test(formData.buyerEmail)
    ) {
      newErrors.buyerEmail = "Valid email is required";
    }
    if (!formData.buyerPhone.trim()) newErrors.buyerPhone = "Phone is required";
    if (!formData.deliveryAddress.trim())
      newErrors.deliveryAddress = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms";
    return newErrors;
  };

  // ===== HANDLE ORDER SUBMISSION =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (role && role !== "customer") {
      setSubmitError("Only customers can place an order.");
      return;
    }

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!user || !art) {
      setSubmitError("Missing required information");
      return;
    }

    setLoading(true);

    try {
      const totalAmount =
        art?.price +
        (formData.deliveryType === "standard"
          ? 0
          : formData.deliveryType === "express"
            ? 25
            : 50) +
        (formData.frameOption === "basic-frame"
          ? 50
          : formData.frameOption === "premium-frame"
            ? 150
            : 0);

      const orderData = {
        buyer: {
          id: user.uid,
          name: formData.buyerName,
          email: formData.buyerEmail,
          phone: formData.buyerPhone,
        },
        artist: {
          id: artist?.id || art?.userId || "unknown",
          name: artist?.name || art?.user?.name || "Unknown Artist",
          email: artist?.email || art?.user?.email || "unknown@email.com",
        },
        artwork: {
          id: art._id || art.id,
          title: art.title,
          thumbnail: art.thumbnail || art.imageUrl || art.images?.[0]?.url,
          category: art.category,
          medium: art.medium,
          dimensions: art.dimensions,
          price: art.price,
          status: "unpaid",
        },
        delivery: {
          address: formData.deliveryAddress,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          type: formData.deliveryType,
        },
        artHandling: {
          frameOption: formData.frameOption,
          glassType: formData.glassType,
        },
        specialInstructions: formData.specialInstructions,
        totalAmount: totalAmount,
        orderDate: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const savedOrder = await response.json();
      navigate("/payment", {
        state: {
          order: savedOrder,
          art: art,
          totalAmount: totalAmount,
        },
      });
    } catch (error) {
      console.error("Order submission error:", error);
      setSubmitError(
        error.message || "Failed to create order. Please try again.",
      );
      setLoading(false);
    }
  };

  if (!art) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-6">No art selected for booking</p>
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

  return (
    <section className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 text-sm uppercase tracking-wider text-amber-700 border border-amber-600 hover:bg-amber-100"
        >
          ← Back
        </button>
        <h1 className="font-serif text-4xl text-stone-900 mb-2">
          Booking Form
        </h1>
        <p className="text-stone-600 mb-12">Complete your art purchase</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitError && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {submitError}
                </div>
              )}

              {/* Buyer Information */}
              <div className="bg-white p-6 border border-stone-300">
                <h2 className="font-serif text-xl text-stone-900 mb-6">
                  Your Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                    />
                    {errors.buyerName && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.buyerName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="buyerEmail"
                      value={formData.buyerEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                    />
                    {errors.buyerEmail && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.buyerEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="buyerPhone"
                      value={formData.buyerPhone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                    />
                    {errors.buyerPhone && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.buyerPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white p-6 border border-stone-300">
                <h2 className="font-serif text-xl text-stone-900 mb-6">
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                    />
                    {errors.deliveryAddress && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.deliveryAddress}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                      />
                      {errors.city && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                      />
                      {errors.state && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="12345"
                        className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                      />
                      {errors.zipCode && (
                        <p className="text-xs text-red-600 mt-1">
                          {errors.zipCode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Art Handling & Delivery */}
              <div className="bg-white p-6 border border-stone-300">
                <h2 className="font-serif text-xl text-stone-900 mb-6">
                  Art Handling & Delivery
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-3">
                      Framing
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "no-frame", label: "No Frame (Just Canvas)" },
                        { value: "basic-frame", label: "Basic Frame ($50)" },
                        {
                          value: "premium-frame",
                          label: "Premium Frame ($150)",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="radio"
                            name="frameOption"
                            value={option.value}
                            checked={formData.frameOption === option.value}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-stone-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-3">
                      Delivery Method
                    </label>
                    <div className="space-y-2">
                      {[
                        {
                          value: "standard",
                          label: "Standard Shipping (5-7 days) - Free",
                        },
                        {
                          value: "express",
                          label: "Express Shipping (2-3 days) - $25",
                        },
                        {
                          value: "overnight",
                          label: "Overnight Shipping - $50",
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value={option.value}
                            checked={formData.deliveryType === option.value}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-stone-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white p-6 border border-stone-300">
                <label className="block text-xs uppercase tracking-widest text-stone-600 font-semibold mb-3">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="Any special instructions or requests?"
                  rows="4"
                  className="w-full px-4 py-3 border border-stone-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 outline-none resize-none"
                />
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white p-6 border border-stone-300">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1"
                  />
                  <span className="text-sm text-stone-700">
                    I agree to the terms and conditions. Payment is required to
                    complete this booking.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-xs text-red-600 mt-2">
                    {errors.agreeTerms}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-amber-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-amber-700 disabled:opacity-50"
              >
                {loading ? "Processing..." : "Order Now"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 border border-stone-300 sticky top-8">
              <h2 className="font-serif text-lg text-stone-900 mb-6">
                Order Summary
              </h2>
              <div className="mb-6 bg-linear-to-br from-purple-900 via-purple-700 to-amber-900 aspect-square overflow-hidden">
                {(art?.thumbnail || art?.imageUrl) && (
                  <img
                    src={art?.thumbnail || art?.imageUrl}
                    alt={art?.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mb-6 pb-6 border-b border-stone-300">
                <h3 className="font-semibold text-stone-900">{art?.title}</h3>
                <p className="text-xs text-stone-600 mt-2">
                  by {art?.user?.name || "Artist"}
                </p>
              </div>
              <div className="space-y-3 mb-6 pb-6 border-b border-stone-300">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Art Price</span>
                  <span className="font-semibold">
                    ${art?.price?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-semibold">
                    {formData.deliveryType === "standard"
                      ? "Free"
                      : formData.deliveryType === "express"
                        ? "$25"
                        : "$50"}
                  </span>
                </div>
                {formData.frameOption !== "no-frame" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-600">Framing</span>
                    <span className="font-semibold">
                      {formData.frameOption === "basic-frame" ? "$50" : "$150"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-between mb-6">
                <span className="font-serif text-lg text-stone-900">Total</span>
                <span className="font-serif text-2xl text-amber-600">
                  $
                  {(
                    art?.price +
                    (formData.deliveryType === "standard"
                      ? 0
                      : formData.deliveryType === "express"
                        ? 25
                        : 50) +
                    (formData.frameOption === "basic-frame"
                      ? 50
                      : formData.frameOption === "premium-frame"
                        ? 150
                        : 0)
                  ).toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-stone-600">
                ✓ Secure payment
                <br />
                ✓ Money-back guarantee
                <br />✓ Insurance included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;

import React, { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const ArtDetails = () => {
  const { artId } = useParams();
  const navigate = useNavigate();
  const authContext = use(AuthContext);
  const { user, role } = authContext || {};

  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== FETCH ART DETAILS =====
  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/arts/${artId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch art details");
        }
        const data = await response.json();
        setArt(data);
      } catch (err) {
        console.error("Error fetching art:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (artId) {
      fetchArt();
    }
  }, [artId]);

  // ===== HANDLE BOOK NOW =====
  const handleBookNow = () => {
    if (!user) {
      alert("Please login to book art");
      navigate("/login");
      return;
    }

    if (role === "artist") {
      alert("Artists can view artwork details, but they cannot buy artwork.");
      return;
    }

    navigate("/order", { state: { art, artist: art?.user || art?.artist } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-900">Loading art details...</p>
        </div>
      </div>
    );
  }

  if (error || !art) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-6">{error || "Art not found"}</p>
          <button
            onClick={() => navigate("/all-arts")}
            className="px-6 py-3 bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/all-arts")}
          className="mb-8 px-4 py-2 text-sm uppercase tracking-wider text-amber-700 border border-amber-600 hover:bg-amber-100 transition-colors"
        >
          ← Back to Gallery
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Art Image */}
          <div>
            <div className="relative bg-linear-to-br from-purple-900 via-purple-700 to-amber-900 aspect-square overflow-hidden">
              {(art?.thumbnail || art?.imageUrl || art?.images?.[0]?.url) && (
                <img
                  src={art?.thumbnail || art?.imageUrl || art?.images?.[0]?.url}
                  alt={art?.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button
              type="button"
              className="mt-4 w-full py-3 text-sm uppercase tracking-wider text-amber-600 border border-amber-600 hover:bg-amber-600 hover:text-white transition-colors"
            >
              ♡ Save to Collection
            </button>
          </div>

          {/* Right: Art Details */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              {/* Artist Info */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.22em] text-amber-700 font-semibold">
                  {art?.user?.name ||
                    art?.artistName ||
                    art?.artist ||
                    "Unknown Artist"}
                </p>
                {art?.user?.email && (
                  <p className="text-xs text-stone-600 mt-1">
                    {art?.user?.email}
                  </p>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
                {art?.title || "Untitled Artwork"}
              </h1>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-stone-300">
                <p className="text-3xl font-bold text-stone-900">
                  ${Number(art?.price || 0).toLocaleString()}
                </p>
                <p className="text-sm text-stone-600 mt-2">
                  Price may vary based on negotiation
                </p>
              </div>

              {/* Art Specifications */}
              <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-stone-300">
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
                    Medium
                  </p>
                  <p className="text-sm text-stone-900 mt-2">
                    {art?.medium || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
                    Dimensions
                  </p>
                  <p className="text-sm text-stone-900 mt-2">
                    {art?.dimensions || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
                    Category
                  </p>
                  <p className="text-sm text-stone-900 mt-2">
                    {art?.category || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold">
                    Year
                  </p>
                  <p className="text-sm text-stone-900 mt-2">
                    {art?.year || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-stone-600 font-semibold mb-3">
                  About This Artwork
                </p>
                <p className="text-sm leading-relaxed text-stone-700">
                  {typeof art?.description === "object"
                    ? art?.description?.full ||
                      art?.description?.short ||
                      "No description available for this artwork."
                    : art?.description ||
                      "No description available for this artwork."}
                </p>
              </div>
            </div>

            {/* Book Now Button */}
            {role === "artist" ? (
              <div className="w-full border border-amber-600/30 bg-amber-100 px-4 py-4 text-center text-sm text-amber-900">
                Artists can view details only.
              </div>
            ) : (
              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-amber-600 text-white font-semibold text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors active:scale-95"
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtDetails;

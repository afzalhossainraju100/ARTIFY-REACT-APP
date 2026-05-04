import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_VISIBLE_ARTS = 8;

const getArtImage = (art) =>
  art?.thumbnail || art?.imageUrl || art?.images?.[0]?.url || "";

const getArtistName = (art) =>
  art?.user?.name || art?.artistName || art?.artist || "Unknown Artist";

const getDateValue = (art) =>
  new Date(
    art?.uploadedDate || art?.createdAt || art?.updatedAt || 0,
  ).getTime();

const getPopularityValue = (art) =>
  art?.salesCount ||
  art?.stats?.totalLikes ||
  art?.stats?.totalViews ||
  art?.likes ||
  art?.views ||
  0;

const formatPrice = (price) => {
  if (price == null || Number.isNaN(Number(price))) return "Price on request";
  return `$${Number(price).toLocaleString()}`;
};

const sortArts = (arts, sortBy) => {
  const sortableArts = [...arts];

  if (sortBy === "newest") {
    return sortableArts.sort((a, b) => getDateValue(b) - getDateValue(a));
  }

  if (sortBy === "price-low") {
    return sortableArts.sort(
      (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
    );
  }

  if (sortBy === "price-high") {
    return sortableArts.sort(
      (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity),
    );
  }

  if (sortBy === "popular") {
    return sortableArts.sort(
      (a, b) => getPopularityValue(b) - getPopularityValue(a),
    );
  }

  return sortableArts;
};

const ArtCard = ({ art, onCardClick }) => {
  const image = getArtImage(art);

  return (
    <article
      className="group bg-white cursor-pointer transition-transform hover:shadow-lg"
      onClick={() => onCardClick(art._id || art.id)}
    >
      <div
        className="relative h-[260px] overflow-hidden bg-gradient-to-br from-[#422765] via-[#7d5181] to-[#d4a43a] bg-cover bg-center sm:h-[300px] lg:h-[320px]"
        style={image ? { backgroundImage: `url("${image}")` } : undefined}
      >
        <button
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-[#1a1410] shadow-sm transition-colors hover:bg-[#f2b342]"
          aria-label={`Save ${art?.title || "artwork"}`}
          onClick={(e) => e.stopPropagation()}
        >
          ♡
        </button>
      </div>

      <div className="px-5 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8d7b6f]">
          {getArtistName(art)}
        </p>
        <h2 className="mt-2 font-serif text-lg leading-tight text-[#140f0c]">
          {art?.title || "Untitled Artwork"}
        </h2>
        <p className="mt-3 text-sm font-bold text-[#140f0c]">
          {formatPrice(art?.price)}
        </p>
        <p className="mt-1 text-xs text-[#7a6e68]">
          {[art?.medium, art?.dimensions].filter(Boolean).join(" · ") ||
            art?.category ||
            "Original Artwork"}
        </p>
      </div>
    </article>
  );
};

const AllArts = () => {
  const navigate = useNavigate();
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevant");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ARTS);

  const handleArtCardClick = (artId) => {
    navigate(`/art-details/${artId}`);
  };

  useEffect(() => {
    let mounted = true;

    fetch("http://localhost:3000/arts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch arts");
        }

        return response.json();
      })
      .then((data) => {
        if (!mounted) return;
        setArts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setArts([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const sortedArts = useMemo(() => sortArts(arts, sortBy), [arts, sortBy]);
  const visibleArts = sortedArts.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedArts.length;

  const handleLoadMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount * 2, sortedArts.length),
    );
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setVisibleCount(INITIAL_VISIBLE_ARTS);
  };

  return (
    <section className="min-h-screen bg-[#f7f3ed] px-6 py-10 text-[#140f0c]">
      <div className="mx-auto max-w-[1764px]">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-xl">
            {loading ? "Loading Paintings" : `${sortedArts.length} Paintings`}
          </p>

          <label className="flex items-center gap-3 text-xs text-[#6f5f57]">
            <span>Sort by</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="h-9 border border-[#d8cec2] bg-white px-3 text-sm text-[#140f0c] outline-none"
            >
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: INITIAL_VISIBLE_ARTS }).map((_, index) => (
              <div key={index} className="h-[420px] animate-pulse bg-white">
                <div className="h-[300px] bg-[#e8dfd4]" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 bg-[#e8dfd4]" />
                  <div className="h-5 w-40 bg-[#e8dfd4]" />
                  <div className="h-3 w-20 bg-[#e8dfd4]" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleArts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleArts.map((art) => (
                <ArtCard
                  key={art?._id || art?.id || art?.title}
                  art={art}
                  onCardClick={handleArtCardClick}
                />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="border border-[#1a1410] px-12 py-4 text-xs font-semibold transition-colors hover:bg-[#1a1410] hover:text-white"
                >
                  Load More Works
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white px-6 py-16 text-center text-[#6f5f57]">
            No artworks found.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllArts;

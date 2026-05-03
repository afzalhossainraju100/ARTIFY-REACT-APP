import React, { useState } from "react";

const getArtImage = (art) =>
  art?.thumbnail || art?.imageUrl || art?.images?.[0]?.url || "";

const getArtistPhoto = (artist) =>
  artist?.photoUrl || artist?.photoURL || artist?.avatar || "";

const getArtistName = (artist, arts) =>
  artist?.name || arts?.[0]?.user?.name || arts?.[0]?.artistName || "Artist";

const formatPrice = (price) => {
  if (price == null || Number.isNaN(Number(price))) return "Price on request";
  return `$${Number(price).toLocaleString()}`;
};

const ProfileIcon = ({ className = "h-8 w-8" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
    />
  </svg>
);

const ArtistGalleryHeader = ({ artist, arts }) => {
  const [hasPhotoError, setHasPhotoError] = useState(false);
  const photo = getArtistPhoto(artist);
  const name = getArtistName(artist, arts);
  const location = artist?.location;
  const bio =
    artist?.bio ||
    `A curated gallery of original works by ${name}. Explore available artworks, mediums, and collector-ready pieces.`;

  return (
    <div className="mb-10 flex flex-col gap-5 border-b border-[#e2d8ce] pb-8 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#81548a] to-[#d4a43a] text-white">
          {photo && !hasPhotoError ? (
            <img
              src={photo}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setHasPhotoError(true)}
            />
          ) : (
            <ProfileIcon className="h-9 w-9 opacity-80" />
          )}
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c8962a]">
            Artist Gallery
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-tight text-[#140f0c]">
            {name}
          </h2>
          {location && (
            <p className="mt-2 text-xs text-[#8d7b6f]">{location}</p>
          )}
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6f5f57]">
            {bio}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 text-left sm:text-center">
        <div>
          <p className="font-serif text-3xl font-bold text-[#140f0c]">
            {arts.length}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#8d7b6f]">
            Works
          </p>
        </div>
        <div>
          <p className="font-serif text-3xl font-bold text-[#140f0c]">
            {artist?.stats?.totalLikes || 0}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#8d7b6f]">
            Likes
          </p>
        </div>
      </div>
    </div>
  );
};

export const ArtGalleryCard = ({ art }) => {
  const image = getArtImage(art);

  return (
    <article className="bg-white">
      <div
        className="relative h-[230px] overflow-hidden bg-gradient-to-br from-[#422765] via-[#7d5181] to-[#d4a43a] bg-cover bg-center"
        style={image ? { backgroundImage: `url("${image}")` } : undefined}
      >
        <button
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1a1410] shadow-sm transition-colors hover:bg-[#f2b342]"
          aria-label={`Save ${art?.title || "artwork"}`}
        >
          <span aria-hidden="true" className="text-base leading-none">
            &#9825;
          </span>
        </button>
      </div>

      <div className="px-5 py-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8d7b6f]">
          {art?.category || "Original Artwork"}
        </p>
        <h3 className="mt-2 font-serif text-lg leading-tight text-[#140f0c]">
          {art?.title || "Untitled Artwork"}
        </h3>
        <p className="mt-2 text-sm font-bold text-[#140f0c]">
          {formatPrice(art?.price)}
        </p>
        <p className="mt-1 text-xs text-[#7a6e68]">
          {[art?.medium, art?.dimensions].filter(Boolean).join(" - ") ||
            "Collector-ready piece"}
        </p>
      </div>
    </article>
  );
};

const ArtGallary = ({
  artist = null,
  arts = [],
  showArtistHeader = true,
  emptyMessage = "This artist has not published any artworks yet.",
}) => {
  if (!artist && arts.length === 0) return null;

  return (
    <section className="bg-[#f7f3ed]">
      {showArtistHeader && artist && (
        <ArtistGalleryHeader artist={artist} arts={arts} />
      )}

      {arts.length > 0 ? (
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {arts.map((art) => (
            <ArtGalleryCard key={art?._id || art?.id || art?.title} art={art} />
          ))}
        </div>
      ) : (
        <div className="bg-white px-6 py-16 text-center text-[#6f5f57]">
          {emptyMessage}
        </div>
      )}
    </section>
  );
};

export default ArtGallary;

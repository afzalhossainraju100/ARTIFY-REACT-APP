import React, { useMemo } from "react";

const getInitials = (name = "Artist") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ArtistCard = ({ artist }) => {
  const name = artist?.name || artist?.username || "Unknown Artist";

  return (
    <div className="flex h-28 w-80 shrink-0 items-center gap-4 border border-[#ead7b1]/15 bg-[#191512] px-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#d4a43a]">
        <div className="absolute inset-0 flex items-center justify-center bg-[#d4a43a] text-xl font-bold text-[#1a1410]">
          {getInitials(name)}
        </div>
        {artist?.photoURL ? (
          <img
            src={artist.photoURL}
            alt={name}
            className="relative h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold">{name}</h3>
        <p className="mt-1 truncate text-sm text-[#bfb3a8]">
          {artist?.specialties?.[0] || artist?.skills?.[0] || "Artist"}
        </p>
        <button className="mt-3 border border-[#d4a43a] px-4 py-2 text-xs font-semibold tracking-wide text-[#f2b342] transition-colors hover:bg-[#d4a43a] hover:text-black">
          VIEW PROFILE
        </button>
      </div>
    </div>
  );
};

const Artist = ({ artists = [], loading = false }) => {
  const marqueeArtists = useMemo(() => {
    const artistUsers = artists.filter((artist) => artist?.role === "artist");

    if (artistUsers.length === 0) return [];
    return [...artistUsers, ...artistUsers];
  }, [artists]);

  return (
    <section className="overflow-hidden bg-[#0f0d0c] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center gap-3 text-[#e6b65a]">
          <span className="inline-block h-[2px] w-8 bg-[#e6b65a]" />
          <span className="text-xs tracking-widest">FEATURED ARTISTS</span>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0f0d0c] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0f0d0c] to-transparent" />

        {loading ? (
          <div className="mx-auto flex max-w-7xl gap-5 overflow-hidden px-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-28 w-80 shrink-0 animate-pulse bg-[#191512]"
              />
            ))}
          </div>
        ) : marqueeArtists.length > 0 ? (
          <div className="artist-marquee flex w-max gap-5 px-6">
            {marqueeArtists.map((artist, index) => (
              <ArtistCard
                key={`${artist?._id || artist?.email || artist?.name}-${index}`}
                artist={artist}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6 text-sm text-[#bfb3a8]">
            No artists found.
          </div>
        )}
      </div>
    </section>
  );
};

export default Artist;

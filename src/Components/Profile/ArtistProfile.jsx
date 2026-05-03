import React, { useEffect, useMemo, useState } from "react";
import ArtGallary from "../ArtGallaryCard/ArtGallary.jsx";

const tabs = ["gallery", "about", "exhibitions", "reviews"];

const isArtistArt = (art, artist) => {
  if (!art || !artist) return false;

  return (
    art.user?.email === artist.email ||
    art.user?.name === artist.name ||
    art.artistId === artist._id ||
    art.artistId === artist.id ||
    art.user?.id === artist._id ||
    art.user?.id === artist.id
  );
};

const getBestProfileArtist = (users, arts) => {
  const artists = users.filter((user) => user.role === "artist");
  const artistWithArt = artists.find((artist) =>
    arts.some((art) => isArtistArt(art, artist)),
  );

  return artistWithArt || artists[0] || null;
};

const formatStat = (value) => {
  if (value == null) return "0";
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
};

const ArtistAvatar = ({ artist }) => {
  const [hasPhotoError, setHasPhotoError] = useState(false);
  const name = artist?.name || "Artist";
  const photoUrl = artist?.photoUrl || artist?.photoURL;

  return (
    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#81548a] to-[#d4a43a] text-white md:h-28 md:w-28">
      {photoUrl && !hasPhotoError ? (
        <img
          src={photoUrl}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setHasPhotoError(true)}
        />
      ) : (
        <svg
          className="h-10 w-10 opacity-80"
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
      )}
    </div>
  );
};

const ArtistProfile = ({ user = null }) => {
  const [users, setUsers] = useState([]);
  const [arts, setArts] = useState([]);
  const [activeTab, setActiveTab] = useState("gallery");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetch("http://localhost:3000/users").then((response) => {
        if (!response.ok) throw new Error("Unable to fetch users");
        return response.json();
      }),
      fetch("http://localhost:3000/arts").then((response) => {
        if (!response.ok) throw new Error("Unable to fetch arts");
        return response.json();
      }),
    ])
      .then(([usersData, artsData]) => {
        if (!mounted) return;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setArts(Array.isArray(artsData) ? artsData : []);
      })
      .catch(() => {
        if (!mounted) return;
        setUsers([]);
        setArts([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const artist = useMemo(() => {
    if (user?.role === "artist") return user;
    return getBestProfileArtist(users, arts);
  }, [arts, user, users]);

  const artistArts = useMemo(() => {
    if (!artist) return [];
    return arts.filter((art) => isArtistArt(art, artist));
  }, [arts, artist]);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f7f3ed]">
        <div className="bg-[#17100c] px-6 py-16">
          <div className="mx-auto flex max-w-[1764px] gap-6">
            <div className="h-28 w-28 animate-pulse rounded-full bg-white/10" />
            <div className="flex-1 space-y-4">
              <div className="h-8 w-60 animate-pulse bg-white/10" />
              <div className="h-4 w-96 max-w-full animate-pulse bg-white/10" />
              <div className="h-4 w-[520px] max-w-full animate-pulse bg-white/10" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!artist) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        No artist profile found.
      </section>
    );
  }

  const skills = [...(artist.specialties || []), ...(artist.skills || [])].slice(
    0,
    4,
  );
  const worksCount = artistArts.length || artist.stats?.totalArtworks || 0;
  const followersCount = artist.stats?.followers || artist.stats?.totalViews || 0;
  const salesCount = artist.stats?.sales || artist.stats?.totalLikes || 0;

  return (
    <section className="min-h-screen bg-[#f7f3ed] text-[#140f0c]">
      <header className="bg-[#17100c] px-6 py-14 text-white md:py-20">
        <div className="mx-auto flex max-w-[1764px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <ArtistAvatar artist={artist} />

            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">
                {artist.name}
              </h1>
              {artist.location && (
                <p className="mt-3 text-xs text-[#bfb3a8]">
                  <span className="text-[#d4a43a]">⌖</span> {artist.location}
                </p>
              )}
              <p className="mt-5 max-w-xl text-sm leading-7 text-[#d8d0c9]">
                {artist.bio ||
                  "Independent artist creating original works for collectors around the world."}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8d0c9]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <button className="mt-5 bg-[#d4a43a] px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-[#f2b342]">
                + Follow
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center md:min-w-[280px]">
            <div>
              <p className="font-serif text-3xl font-bold text-white">
                {formatStat(worksCount)}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8d7b6f]">
                Works
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-white">
                {formatStat(followersCount)}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8d7b6f]">
                Followers
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-white">
                {formatStat(salesCount)}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#8d7b6f]">
                Sales
              </p>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-[#e4ddd4] bg-white px-6">
        <div className="mx-auto flex max-w-[1764px] gap-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 py-5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
                activeTab === tab
                  ? "border-[#d4a43a] text-[#140f0c]"
                  : "border-transparent text-[#8d7b6f] hover:text-[#140f0c]"
              }`}
            >
              {tab === "reviews" ? "Reviews (48)" : tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="px-6 py-14">
        <div className="mx-auto max-w-[1764px]">
          {activeTab === "gallery" && (
            <ArtGallary artist={artist} arts={artistArts} />
          )}

          {activeTab === "about" && (
            <div className="max-w-3xl bg-white p-8 text-[#6f5f57]">
              <h2 className="font-serif text-3xl text-[#140f0c]">About</h2>
              <p className="mt-4 leading-8">{artist.bio}</p>
            </div>
          )}

          {activeTab === "exhibitions" && (
            <div className="bg-white px-6 py-16 text-center text-[#6f5f57]">
              No exhibitions have been added yet.
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white px-6 py-16 text-center text-[#6f5f57]">
              Reviews will appear here when collectors leave feedback.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArtistProfile;

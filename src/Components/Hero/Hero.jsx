import React from "react";
import { NavLink } from "react-router-dom";

const formatPrice = (p) => {
  if (p == null) return "--";
  return `$${Number(p).toLocaleString()}`;
};

const getArtImage = (art) =>
  art?.imageUrl || art?.thumbnail || art?.images?.[0]?.url || "";

const Tile = ({ art, large }) => {
  const image = getArtImage(art);
  const bg = image ? { backgroundImage: `url("${image}")` } : {};
  const artist = art?.artistName || art?.artist || art?.user?.name || art?.category;

  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-[#241f1b] bg-cover bg-center ${
        large ? "md:h-[520px] h-[320px] w-full" : "h-[200px] md:h-[250px]"
      }`}
      style={bg}
    >
      {!image && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d2f22] via-[#1f1b18] to-[#0f0d0c]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute left-4 bottom-4 text-white">
        <div className="text-sm font-semibold">{art?.title ?? "Untitled"}</div>
        {artist && (
          <div className="mt-1 text-xs text-[#c8b7aa]">{artist}</div>
        )}
        <div className="text-xs text-yellow-400 mt-1">
          {formatPrice(art?.price)}
        </div>
      </div>
    </div>
  );
};

const Hero = ({ arts = [], loading = false }) => {
  const a0 = arts[0] ?? null;
  const a1 = arts[1] ?? null;
  const a2 = arts[2] ?? null;

  return (
    <section className="bg-[#0f0d0c] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left column */}
          <div className="lg:w-1/2 w-full">
            <div className="flex items-center gap-3 text-[#e6b65a] mb-6">
              <span className="inline-block w-8 h-[2px] bg-[#e6b65a]" />
              <span className="text-xs tracking-widest">
                DISCOVER ORIGINAL ART
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Where Art Finds Its
              <div className="mt-2 text-[56px] md:text-[72px] font-serif italic text-[#e6b65a] -tracking-tighter">
                True Home
              </div>
            </h1>

            <p className="mt-6 text-[#bfb3a8] max-w-xl leading-7">
              Connect with independent artists worldwide. Buy, collect, and
              celebrate original artworks — from bold abstracts to quiet
              portraits.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button className="bg-[#d4a43a] px-6 py-3 font-semibold text-black rounded-sm">
                EXPLORE GALLERY
              </button>
              <NavLink to="/all-arts">
                <button className="border border-[rgba(255,255,255,0.06)] px-6 py-3 font-medium rounded-sm">
                  SELL YOUR ART
                </button>
              </NavLink>
            </div>

            <div className="mt-12 border-t border-[rgba(255,255,255,0.03)] pt-8">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl font-semibold">12,400+</div>
                  <div className="text-xs text-[#8d7b6f] mt-2">
                    ORIGINAL WORKS
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">3,800+</div>
                  <div className="text-xs text-[#8d7b6f] mt-2">ARTISTS</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">94</div>
                  <div className="text-xs text-[#8d7b6f] mt-2">COUNTRIES</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - tiles */}
          <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1 md:row-span-2">
              {loading ? (
                <div className="md:h-[520px] h-[320px] bg-gradient-to-br from-purple-700 via-purple-500 to-yellow-500 rounded-sm" />
              ) : (
                <Tile
                  art={a0 || { title: "Violet Reverie No.3", price: 1240 }}
                  large
                />
              )}
            </div>

            <div>
              {loading ? (
                <div className="h-[200px] md:h-[250px] bg-gradient-to-br from-green-700 to-green-400 rounded-sm" />
              ) : (
                <Tile art={a1 || { title: "Forest Silence", price: 680 }} />
              )}
            </div>

            <div>
              {loading ? (
                <div className="h-[200px] md:h-[250px] bg-gradient-to-br from-red-800 to-orange-600 rounded-sm" />
              ) : (
                <Tile art={a2 || { title: "Ember Study", price: 420 }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

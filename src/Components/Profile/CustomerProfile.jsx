import React, { useState } from "react";

const ProfileIcon = () => (
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
);

const CustomerProfile = ({ user = null }) => {
  const [hasPhotoError, setHasPhotoError] = useState(false);

  if (!user) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        No customer information available.
      </section>
    );
  }

  const photoUrl = user?.photoUrl || user?.photoURL;

  return (
    <section className="min-h-screen bg-[#f7f3ed] text-[#140f0c]">
      <header className="bg-[#17100c] px-6 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#81548a] to-[#d4a43a]">
              {photoUrl && !hasPhotoError ? (
                <img
                  src={photoUrl}
                  alt={user.name}
                  className="h-full w-full object-cover"
                  onError={() => setHasPhotoError(true)}
                />
              ) : (
                <ProfileIcon />
              )}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#d4a43a]">
                Customer Profile
              </p>
              <h1 className="mt-2 font-serif text-4xl leading-tight">
                {user.name}
              </h1>
              <p className="mt-2 text-sm text-[#bfb3a8]">@{user.username}</p>
              {user.bio && (
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#d8d0c9]">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          <button className="w-fit border border-[#d4a43a] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#f2b342] transition-colors hover:bg-[#d4a43a] hover:text-black">
            Edit Profile
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        <div className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8d7b6f]">
            Purchased
          </p>
          <p className="mt-3 font-serif text-4xl font-bold">
            {user.stats?.purchasedArtworks || 0}
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8d7b6f]">
            Saved Likes
          </p>
          <p className="mt-3 font-serif text-4xl font-bold">
            {user.stats?.totalLikes || 0}
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8d7b6f]">
            Profile Views
          </p>
          <p className="mt-3 font-serif text-4xl font-bold">
            {user.stats?.totalViews || 0}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="bg-white p-8">
          <h2 className="font-serif text-3xl">Account Details</h2>
          <div className="mt-6 grid gap-4 text-sm text-[#6f5f57] md:grid-cols-2">
            <p>Email: {user.email}</p>
            {user.location && <p>Location: {user.location}</p>}
            <p>Role: Customer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerProfile;

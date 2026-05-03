import React, { useEffect, useState } from "react";

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

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const AdminProfile = ({ user: providedUser = null }) => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(!providedUser);
  const [error, setError] = useState("");
  const [hasPhotoError, setHasPhotoError] = useState(false);

  useEffect(() => {
    if (providedUser) {
      return;
    }

    let mounted = true;

    fetch("http://localhost:3000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch admin information");
        }

        return response.json();
      })
      .then((data) => {
        if (!mounted) return;
        const users = Array.isArray(data) ? data : [];
        setFetchedUser(
          users.find((currentUser) => currentUser.role === "admin") || null,
        );
      })
      .catch((fetchError) => {
        if (!mounted) return;
        setError(fetchError.message);
        setFetchedUser(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [providedUser]);

  const user = providedUser || fetchedUser;

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        Loading admin profile...
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        {error}
      </section>
    );
  }

  if (!user) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        No admin information available.
      </section>
    );
  }

  const photoUrl = user?.photoUrl || user?.photoURL;

  return (
    <section className="min-h-screen bg-[#f7f3ed] text-[#140f0c]">
      <header className="bg-[#17100c] px-6 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#7f1d1d] to-[#d4a43a]">
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
                Admin Profile
              </p>
              <h1 className="mt-2 font-serif text-4xl leading-tight">
                {user.name}
              </h1>
              <p className="mt-2 text-sm text-[#bfb3a8]">@{user.username}</p>
              {user.location && (
                <p className="mt-2 text-sm text-[#bfb3a8]">{user.location}</p>
              )}
              {user.bio && (
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#d8d0c9]">
                  {user.bio}
                </p>
              )}
            </div>
          </div>

          <button className="w-fit bg-[#d4a43a] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-[#f2b342]">
            Open Dashboard
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        <div className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8d7b6f]">
            Artworks
          </p>
          <p className="mt-3 font-serif text-4xl font-bold">
            {user.stats?.totalArtworks || 0}
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8d7b6f]">
            Views
          </p>
          <p className="mt-3 font-serif text-4xl font-bold">
            {user.stats?.totalViews || 0}
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8d7b6f]">
            Likes
          </p>
          <p className="mt-3 font-serif text-4xl font-bold">
            {user.stats?.totalLikes || 0}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="bg-white p-8">
          <h2 className="font-serif text-3xl">Permissions</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {(user.permissions || []).map((permission) => (
              <span
                key={permission}
                className="border border-[#e2d8ce] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6f5f57]"
              >
                {permission.replaceAll("_", " ")}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 text-sm text-[#6f5f57] md:grid-cols-2">
            <p>Email: {user.email}</p>
            {user.location && <p>Location: {user.location}</p>}
            <p>Role: Administrator</p>
            {user.preferences?.profileVisibility && (
              <p>Visibility: {user.preferences.profileVisibility}</p>
            )}
            {user.createdAt && <p>Joined: {formatDate(user.createdAt)}</p>}
            {user.updatedAt && <p>Updated: {formatDate(user.updatedAt)}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;

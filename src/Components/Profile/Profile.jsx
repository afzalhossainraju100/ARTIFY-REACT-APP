import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminProfile from "./AdminProfile.jsx";
import ArtistProfile from "./ArtistProfile.jsx";
import CustomerProfile from "./CustomerProfile.jsx";

const findProfileUser = (users, searchParams) => {
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const role = searchParams.get("role");

  if (id) {
    return users.find((user) => user._id === id || user.id === id) || null;
  }

  if (email) {
    return users.find((user) => user.email === email) || null;
  }

  if (role) {
    return users.find((user) => user.role === role) || null;
  }

  return users[0] || null;
};

const Profile = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetch("http://localhost:3000/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        if (!mounted) return;
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((fetchError) => {
        if (!mounted) return;
        setError(fetchError.message);
        setUsers([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const profileUser = useMemo(
    () => findProfileUser(users, searchParams),
    [users, searchParams],
  );

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        Loading profile...
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

  if (!profileUser) {
    return (
      <section className="min-h-screen bg-[#f7f3ed] px-6 py-20 text-center text-[#6f5f57]">
        No user information available.
      </section>
    );
  }

  if (profileUser.role === "artist") {
    return <ArtistProfile user={profileUser} />;
  }

  if (profileUser.role === "admin") {
    return <AdminProfile user={profileUser} />;
  }

  return <CustomerProfile user={profileUser} />;
};

export default Profile;

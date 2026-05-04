import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
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
  const authContext = React.use(AuthContext);
  const authUser = authContext?.profile || authContext?.user;
  const authRole = authContext?.role || authUser?.role;
  const loading = authContext?.loading;
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authUser) {
      setUsers([authUser]);
      return;
    }

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
        if (mounted) {
          setUsers((currentUsers) => currentUsers);
        }
      });

    return () => {
      mounted = false;
    };
  }, [authUser]);

  const profileUser = useMemo(
    () => authUser || findProfileUser(users, searchParams),
    [authUser, users, searchParams],
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

  if (authRole === "artist" || profileUser.role === "artist") {
    return <ArtistProfile user={profileUser} />;
  }

  if (authRole === "admin" || profileUser.role === "admin") {
    return <AdminProfile user={profileUser} />;
  }

  return <CustomerProfile user={profileUser} />;
};

export default Profile;

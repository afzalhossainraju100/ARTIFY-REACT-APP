import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import Artist from "../Artist/Artist";
import ArtGallary from "../ArtGallaryCard/ArtGallary";
import ArtifyProcess from "../ArtifyProcess/ArtifyProcess";

const Home = () => {
  const [arts, setArts] = useState([]);
  const [artsLoading, setArtsLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [artistsLoading, setArtistsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchArts = async () => {
      const response = await fetch("http://localhost:3000/arts");
      if (response.ok) return response.json();
      throw new Error("Unable to fetch arts");
    };

    fetchArts()
      .then((data) => {
        if (!mounted) return;
        setArts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (mounted) setArts([]);
      })
      .finally(() => {
        if (mounted) setArtsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

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
        const users = Array.isArray(data) ? data : [];
        setArtists(users.filter((user) => user.role === "artist"));
      })
      .catch(() => {
        if (mounted) setArtists([]);
      })
      .finally(() => {
        if (mounted) setArtistsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Hero arts={arts.slice(0, 3)} loading={artsLoading} />
      <Artist artists={artists} loading={artistsLoading} />
      <ArtGallary artists={artists} />
      <ArtifyProcess />
    </div>
  );
};

export default Home;

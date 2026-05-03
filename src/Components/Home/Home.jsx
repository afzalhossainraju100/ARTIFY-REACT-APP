import React from "react";
import LatestArts from "../LatestArts/LatestArts";
import Hero from "../Hero/Hero";
import Artist from "../Artist/Artist";
import ArtGallary from "../ArtGallaryCard/ArtGallary";

const latestArtsPromise = fetch("http://localhost:3000/arts").then((response) =>
  response.json(),
);
const artistPromise = fetch("http://localhost:3000/user").then((response) =>
  response.json(),
);

const Home = () => {
  return (
    <div>
      <Hero latestArtsPromise={latestArtsPromise} />
      <Artist artistPromise={artistPromise} />
      <LatestArts latestArtsPromise={latestArtsPromise} />
      <ArtGallary artistPromise={artistPromise} />
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { IGame } from "../../interface";
import { motion } from "framer-motion";
import { v4 } from "uuid";
import GameCard from "./GameCard";

const GameList = ({ games }: { games: IGame[] }) => {
  const [pageSize, setPageSize] = useState(false);

  const variants = {
    hidden: { opacity: 0, x: 200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 1200, y: 0 },
  };
  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden" // Set the initial state to variants.hidden
        animate="enter" // Animated state to variants.enter
        exit="exit"
        className="my-8 grid  grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {games?.slice(0, pageSize ? 40 : 20).map((game: IGame) => (
          <GameCard game={game} key={v4()} />
        ))}
      </motion.div>
      {games?.length >= 20 ? (
        <button
          onClick={() => setPageSize((prev) => !prev)}
          className="bg-secondary mb-2 ml-auto mt-4 flex rounded-full px-4 py-2 font-bold text-white"
        >
          {pageSize ? "Show less" : "Show more"}
        </button>
      ) : null}
    </>
  );
};

export default GameList;

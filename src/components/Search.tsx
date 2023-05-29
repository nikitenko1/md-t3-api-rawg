import React, { useState } from "react";
import { useSearch, useSearchModal } from "../../lib/zustand";
import shallow from "zustand/shallow";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  // Array pick, re-renders the component when either state.search or state.setSearch change
  const [term, setTerm] = useSearch(
    (state) => [state.search, state.setSearch],
    shallow
  );
  const { setOpenModal } = useSearchModal();
  // Persist the state with local storage so that it remains after a page refresh
  const [search, setSearch] = useLocalStorage("search", "");
  // Easily retrieve media dimensions with this Hook React which also works onResize
  const matches = useMediaQuery("(min-width: 900px)");
  const router = useRouter();

  const variants = {
    focused: {
      flex: matches ? 0.75 : 1,
    },
    notFocused: {
      flex: matches ? 0.25 : 0.5,
    },
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearch(term);
    setOpenModal(false);
    router.push(`/search?q=${term}`, undefined, { shallow: true });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      transition={{ duration: 0.5, type: "spring" }}
      variants={variants}
      animate={isFocused ? "focused" : "notFocused"}
      className={` flex  w-full items-center gap-x-2 rounded-full bg-zinc-700 px-2 py-1  text-sm md:px-4 md:py-2 md:text-base`}
    >
      <BiSearch className="text-zinc-500" />
      <input
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full  bg-transparent text-white outline-none`}
        type="text"
        placeholder={"Search for games"}
      />
    </motion.form>
  );
};

export default Search;

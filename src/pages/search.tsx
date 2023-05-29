import { useScroll } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { IGame, IGameResp } from "../../interface";
import fetchData from "../../rawg/fetchData";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import ProgressBar from "../components/ProgressBar";
import Body from "../components/Body";
import SecondHeader from "../components/SecondHeader";
import GameList from "../components/GameList";

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  // we could show a page scroll indicator by passing scrollYProgress straight to the scaleX style
  // of a progress bar
  const { scrollYProgress } = useScroll();

  //   The AbortController interface represents a controller object
  //   that allows you to abort one or more Web requests as and when desired.
  useEffect(() => {
    const controller = new AbortController();

    refetch();
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [router]);

  let search: string | null;

  const {
    data: games,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGameResp>(
    ["fetchSearch"],
    () =>
      fetchData(
        `https://api.rawg.io/api/games?search=${
          q ?? search
        }&search_precise=${true}&`
      ),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );
  if (isLoading || isFetching)
    return (
      <div className="min-h-screen justify-center pl-60 pt-8">
        <Loader />
      </div>
    );

  return (
    <>
      <ProgressBar progress={scrollYProgress} />
      <Body>
        <SecondHeader title={` ${q}`} />
        <GameList games={games?.results as IGame[]} />
      </Body>
    </>
  );
};

export default SearchPage;

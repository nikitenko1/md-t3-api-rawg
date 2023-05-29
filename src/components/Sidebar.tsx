import React, { useState } from "react";
import { GiFloatingPlatforms } from "react-icons/gi";
import { BiHome, BiListUl, BiMenuAltLeft } from "react-icons/bi";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoLogoGameControllerB,
} from "react-icons/io";
import {
  RiWindowsFill,
  RiAndroidFill,
  RiPlaystationFill,
  RiXboxFill,
} from "react-icons/ri";
import { SiIos, SiNintendoswitch, SiPlaystation5 } from "react-icons/si";
import { GenreResp } from "../../interface";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../../rawg/fetchData";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import Image from "next/legacy/image";

const Sidebar = () => {
  const router = useRouter();
  const { status } = useSession();

  const platformIcons = [
    {
      id: 1,
      name: "Xbox One",
      icon: <RiXboxFill />,
    },
    {
      id: 3,
      name: "IOS",
      icon: <SiIos />,
    },
    {
      id: 4,
      name: "PC",
      icon: <RiWindowsFill />,
    },
    {
      id: 7,
      name: "Nintendo Switch",
      icon: <SiNintendoswitch />,
    },
    {
      id: 18,
      name: "Playstation 4",
      icon: <RiPlaystationFill />,
    },
    {
      id: 21,
      name: "Android",
      icon: <RiAndroidFill />,
    },
    {
      id: 187,
      name: "Playstation 5",
      icon: <SiPlaystation5 />,
    },
  ];

  const { data: genres } = useQuery<GenreResp>(
    ["fetchGenres"],
    () => fetchData(`https://api.rawg.io/api/genres?`),
    {
      refetchOnWindowFocus: false,
      staleTime: 1000000,
    }
  );

  const [showAll, setShowAll] = useState(false);
  // Easily retrieve media dimensions with this Hook React which also works onResize
  const small = useMediaQuery("(min-width:640px)");
  if (router.pathname === "/auth/signin") return null;

  return (
    <aside className="sidebar-scrollbar-short rounded-thumb bg-secondary scrollbar-thin scrollbar-thumb-[#bc13fe]  xs:w-20  fixed left-0 top-0 z-50   h-screen w-20 overflow-y-scroll p-1 sm:w-44  sm:p-4 md:w-56 ">
      <div className="flex items-center justify-between text-white">
        <Link href="/">
          <p className="cursor-pointer text-xs font-black  sm:text-xl  md:text-2xl ">
            UAGAME.
          </p>
        </Link>
        <BiMenuAltLeft className="cursor-pointer text-2xl" />
      </div>
      <ul className="mt-8 flex flex-col items-center space-y-3 sm:items-start">
        <li className="cursor-pointer text-2xl font-semibold text-white">
          <Link href="/">
            <span className="flex flex-col items-center">
              {small ? null : <BiHome />}

              <p className="text-[10px] uppercase sm:text-2xl">Home</p>
            </span>
          </Link>
        </li>

        <li className="cursor-pointer text-2xl font-semibold text-white">
          {status === "authenticated" ? (
            <Link href="/wishlist">
              <span className="flex flex-col items-center">
                {small ? null : <BiListUl />}

                <p className="text-[10px] uppercase sm:text-2xl">Wishlist</p>
              </span>
            </Link>
          ) : null}
        </li>
        <div>
          <li className="cursor-pointer text-2xl font-semibold text-white">
            <Link href="/genres">
              <span className="flex flex-col items-center sm:items-start">
                {small ? null : <IoLogoGameControllerB />}

                <p className="text-[10px] uppercase sm:text-2xl">Genres</p>
              </span>
            </Link>
          </li>
          {small ? (
            <>
              <ul
                className="rounded-thumb scrollbar-thin scrollbar-thumb-[#bc13fe] mt-4 h-24  
              items-center space-y-2 overflow-x-hidden  overflow-y-scroll sm:h-40 md:h-44"
              >
                {genres?.results
                  .slice(0, showAll ? genres.results.length : 3)
                  .map((genre) => (
                    <li
                      className="cursor-pointer px-2 text-sm text-gray-400"
                      key={v4()}
                      onClick={() =>
                        router.push({
                          pathname: "/games",
                          query: {
                            ...router.query,
                            genres: genre.slug,
                          },
                        })
                      }
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-x-2 text-white "
                      >
                        {small ? (
                          <Image
                            src={genre.image_background}
                            width={40}
                            height={40}
                            objectFit="cover"
                            className="rounded-lg"
                            alt="genre"
                          />
                        ) : null}

                        <p className="xs:text-xs text-[8px] sm:text-base">
                          {genre.name}
                        </p>
                      </motion.div>
                    </li>
                  ))}
              </ul>
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex animate-pulse  items-center gap-x-1 text-gray-400 sm:gap-x-2"
              >
                <span className="bg-primary rounded-lg p-2  text-base sm:text-2xl">
                  {showAll ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
                <p className="whitespace-nowrap text-xs sm:text-base">
                  {showAll ? "Hide" : "Show all"}
                </p>
              </button>
            </>
          ) : null}
        </div>
        <li className="cursor-pointer text-2xl font-semibold text-white">
          <Link href="/platforms">
            <span className="flex flex-col items-center">
              {small ? null : <GiFloatingPlatforms />}

              <p className="text-[10px] uppercase sm:text-2xl">PLATFORMS</p>
            </span>
          </Link>
        </li>
        <div className="space-y-2">
          {platformIcons.map((platform) => (
            <li
              className="cursor-pointer text-lg text-white"
              key={v4()}
              onClick={() =>
                router.replace({
                  pathname: "/games",
                  query: {
                    ...router.query,
                    platform: platform.id,
                  },
                })
              }
            >
              <div className="flex items-center gap-x-2">
                <span className="text-lg sm:text-2xl">{platform.icon}</span>
                {small ? <p>{platform.name}</p> : null}
              </div>
            </li>
          ))}
        </div>
      </ul>
    </aside>
  );
};

export default Sidebar;

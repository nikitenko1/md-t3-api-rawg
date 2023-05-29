import React from "react";
import { IPlatformData } from "../../interface";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { v4 } from "uuid";
import { BiUser } from "react-icons/bi";

interface IProps {
  platform: IPlatformData;
}

const PlatformCard = ({ platform }: IProps) => {
  const router = useRouter();

  return (
    <Link
      href={`/games?${
        router.pathname === "/genres"
          ? `genres=${platform.slug}`
          : `platform=${platform.id}`
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-72 w-full cursor-pointer rounded-lg"
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <div>
            <Image
              layout="fill"
              src={platform?.image_background}
              objectFit="cover"
              alt="platform"
            />
          </div>
          <div className="platform-gradient absolute  bottom-0 left-0 right-0 h-full w-full"></div>
          <div className="relative flex w-full flex-col items-center p-4">
            <h1 className=" w-full truncate text-lg font-bold text-white md:text-xl ">
              {platform.name}
            </h1>
            <div className="flex w-full items-center justify-between gap-x-1 border-b border-gray-500 pb-2 text-sm sm:gap-x-2 md:text-base">
              <p className="truncate font-semibold text-white ">
                Popular items
              </p>
              <p className="text-sm text-gray-400">
                {platform.games_count.toLocaleString()}
              </p>
            </div>
            {platform.games.slice(0, 3).map((game) => (
              <div
                key={v4()}
                className="xs:text-xs flex w-full items-center justify-between gap-x-1 pt-1 text-[8px] sm:gap-x-2 md:text-sm"
              >
                <Link href={`/game/${game.id}`}>
                  <p className="cursor-pointer truncate text-white underline">
                    {game.name}
                  </p>
                </Link>
                <div className="flex items-center gap-x-1 text-gray-400">
                  <p>{game.added}</p>
                  <BiUser />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PlatformCard;

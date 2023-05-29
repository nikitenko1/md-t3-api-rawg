import React, { useState } from "react";
import { IGame, IGenre } from "../../interface";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import useHover from "../../hooks/useHover";
import { useRouter } from "next/router";
import { useCartMenu } from "../../lib/zustand";
import { useQueryClient } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import Image from "next/legacy/image";
import { BiListCheck, BiListPlus } from "react-icons/bi";
import {
  RiGlobalLine,
  RiWindowsFill,
  RiAndroidFill,
  RiPlaystationFill,
  RiXboxFill,
  RiAppleFill,
} from "react-icons/ri";
import { SiIos, SiLinux, SiNintendoswitch } from "react-icons/si";
import { v4 } from "uuid";
import { AiOutlinePlus } from "react-icons/ai";
import moment from "moment";

interface IProps {
  game: IGame;
}

const platformIcons: Record<string, React.ReactNode> = {
  web: <RiGlobalLine />,
  pc: <RiWindowsFill />,
  android: <RiAndroidFill />,
  ios: <SiIos />,
  playstation: <RiPlaystationFill />,
  xbox: <RiXboxFill />,
  mac: <RiAppleFill />,
  linux: <SiLinux />,
  nintendo: <SiNintendoswitch />,
};

const GameCard = ({ game }: IProps) => {
  const utils = trpc.useContext();
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [hoverRef, isHovering] = useHover<HTMLDivElement>();

  const { openCartMenu } = useCartMenu();

  const cardVariants = {
    hidden: {
      opacity: 0,
      Y: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const variants = {
    visible: {
      opacity: 1,
      height: "auto",
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const [wishlistAdded, setWishlistAdded] = useState(false);

  const { data: wishlists } = trpc.wishlist.getUserWishlists.useQuery();
  const added = wishlists?.find((wishlist: any) => wishlist.gameId === game.id);

  const addToWishlist = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (status === "unauthenticated") {
      toast.error("You have to be logged in first!");
      return;
    }
    const wishlist = {
      image: game.background_image,
      name: game.name,
      price: Math.round(game?.ratings_count / 150),
      gameId: game.id,
    };
    setWishlistAdded(true);

    toast.success(`Added ${wishlist.name} to wishlist`);
    await addWishlist(wishlist);
    router.push("/wishlist");
  };

  const removeWishlist = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (status === "unauthenticated") {
      toast.error("You have to be logged in first!");
      return;
    }
    setWishlistAdded(false);

    toast.success(`Removed ${game.name} from wishlist`);
    await deleteFromWishlist({ gameId: game.id });
  };

  const addToCart = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (status === "unauthenticated") {
      toast.error("You have to be logged in first!");
      return;
    }
    const cart = {
      image: game.background_image,
      name: game.name,
      price: Math.round(game?.ratings_count / 150),
    };
    await addCart(cart, {
      onSuccess() {
        // Always refetch after error or success:
        queryClient.invalidateQueries(["getCarts"]);
        console.log("success");
      },
    });
    openCartMenu();
  };

  const { mutate: deleteFromWishlist } =
    trpc.wishlist.deleteFromWishlist.useMutation({
      onSuccess() {
        utils.wishlist.getUserWishlists.invalidate();
      },
    });

  const { mutate: addWishlist } = trpc.wishlist.addWishlist.useMutation({
    onSuccess() {
      utils.wishlist.getUserWishlists.invalidate();
    },
  });

  const { mutate: addCart } = trpc.cart.addCart.useMutation({
    onSuccess: () => {
      utils.cart.getCarts.invalidate();
    },
  });

  return (
    <Link href={`/game/${game.id.toString()}`}>
      <motion.div
        className="neon bg-secondary cursor-pointer rounded-2xl border-none text-white "
        whileHover={{ scale: 1.05 }}
        variants={cardVariants}
        whileTap={{ scale: 0.95 }}
        initial={{
          opacity: 0,
          y: -5,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 10,
        }}
      >
        <div className=" relative h-[250px] w-full overflow-hidden rounded-2xl">
          {game?.background_image !== null ? (
            <Image
              src={game.background_image}
              className="object-cover"
              layout="fill"
              alt="game"
            />
          ) : null}
        </div>
        <div className="space-y-2 px-4 py-2" ref={hoverRef}>
          <div className="flex flex-wrap items-center gap-x-2">
            {game?.parent_platforms?.map(({ platform }) => (
              <div key={v4()} title={platform.name}>
                {platformIcons[platform.slug]}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <motion.button
              className="flex items-center gap-x-2"
              whileHover={{ scale: 1.1, color: "#bc13fe" }}
              onClick={addToCart}
            >
              <span>Add to cart</span>
              <AiOutlinePlus />
            </motion.button>
            <p>${(game?.ratings_count / 150).toFixed(2)}</p>
          </div>
          <motion.button
            onClick={added ? removeWishlist : addToWishlist}
            whileHover={{ scale: 1.1, color: "#bc13fe" }}
          >
            {wishlistAdded || added ? (
              <BiListCheck
                className="text-2xl"
                onClick={removeWishlist}
              ></BiListCheck>
            ) : (
              <BiListPlus
                className="text-2xl"
                onClick={addToWishlist}
                data-tip="Add to wishlist"
              />
            )}
          </motion.button>
          <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
            {game?.name}
          </h1>
          <motion.div
            variants={variants}
            initial="hidden"
            className="space-y-2 divide-y divide-gray-700 text-xs"
            animate={isHovering ? "visible" : "hidden"}
          >
            <div className="flex items-center justify-between pt-2 text-gray-400">
              <p>Release Date: </p>
              <p>{moment(game?.released).format("LL")}</p>
            </div>
            <div className="flex items-center justify-between pt-2 text-gray-400">
              <p>Genres: </p>
              <div className="flex items-center gap-x-2">
                {game?.genres.map((genre: IGenre) => (
                  <p key={v4()}>{genre?.name}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 text-gray-400">
              <p>Rating </p>
              <p>{game?.rating}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default GameCard;

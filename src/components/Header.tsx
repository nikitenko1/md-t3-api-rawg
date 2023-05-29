import React from "react";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "usehooks-ts";
import { useCartMenu, useSearchModal } from "../../lib/zustand";
import { useRouter } from "next/router";
import Search from "./Search";
import { BiSearch } from "react-icons/bi";
import Profile from "./Profile";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  const { data: cartItems } = trpc.cart.getCarts.useQuery();
  const { status } = useSession();

  const router = useRouter();
  const { openCartMenu } = useCartMenu();
  const { setOpenModal } = useSearchModal();

  // Easily retrieve media dimensions with this Hook React which also works onResize
  const isNotMobile = useMediaQuery("(min-width: 768px)");
  if (router.pathname === "/auth/signin") return null;

  return (
    <div
      className="xs:pl-32 mr-4 mt-2 flex items-center justify-between gap-x-2 pl-20 sm:gap-x-4
    sm:pl-44 md:gap-x-8 md:pl-60"
    >
      {isNotMobile ? (
        <Search />
      ) : (
        <button
          onClick={() => setOpenModal(true)}
          className="bg-secondary xs:text-xl rounded-full p-2 text-lg text-white"
        >
          <BiSearch />
        </button>
      )}
      <Profile />
      <div className="relative">
        <AiOutlineShoppingCart
          className="cursor-pointer text-xl text-white hover:text-[#bc13fe]"
          onClick={openCartMenu}
        />
        {status === "authenticated" ? (
          <span
            className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full
           bg-[#bc13fe] text-xs text-white"
          >
            {cartItems?.length}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Header;

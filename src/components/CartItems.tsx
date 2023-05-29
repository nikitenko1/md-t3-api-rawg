import React, { useRef } from "react";
import { trpc } from "../utils/trpc";
import { toast } from "react-hot-toast";
import { useCartMenu } from "../../lib/zustand";
import { useOnClickOutside } from "usehooks-ts";
import Loader from "./Loader";
import { motion } from "framer-motion";
import getStripe from "../utils/get-stripejs";
import { IoMdClose } from "react-icons/io";
import { v4 } from "uuid";
import CartItem from "./CartItem";
import { useSession } from "next-auth/react";

const CartItems = () => {
  const utils = trpc.useContext();
  const { status } = useSession();
  const { data: cartItems, isLoading } = trpc.cart.getCarts.useQuery();
  const { mutateAsync: clearCarts } = trpc.cart.clearCarts.useMutation({
    onSuccess() {
      // Always refetch after error or success:
      utils.cart.getCarts.invalidate();
    },
  });

  const clearCartsHandle = async () => {
    clearCarts();
    await toast.success("Carts cleared");
  };

  const { closeCartMenu, isOpen } = useCartMenu();
  const menu = useRef<HTMLDivElement>(null);

  const variants = {
    open: {
      right: 0,
      opacity: 1,
    },
    hidden: {
      right: -50,
      opacity: 0,
    },
  };
  //   React hook for listening for clicks outside of a specified element (see useRef).
  useOnClickOutside(menu, () => {
    closeCartMenu();
  });
  // Redirecting to Stripe Checkout Page
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const res = await fetch("/api/create-stripe-session", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
      method: "POST",
    });
    const data = await res.json();

    await stripe?.redirectToCheckout({ sessionId: data?.id });
  };
  if (isLoading) return <Loader />;

  return (
    <motion.div
      initial={{ right: -50, opacity: 0 }}
      animate={isOpen ? "open" : "hidden"}
      exit="hidden"
      variants={variants}
      ref={menu}
      className="bg-secondary fixed right-0 top-0 z-50 flex min-h-screen w-72 flex-col space-y-4 p-4"
    >
      <IoMdClose
        className="cursor-pointer self-end text-xl text-white"
        onClick={closeCartMenu}
      />
      <>
        {status === "authenticated" ? (
          <>
            <div className="space-y-4">
              {cartItems?.map((item) => (
                <CartItem item={item} key={v4()} />
              ))}
            </div>
            <button
              className="rounded-lg bg-[#bc13fe] px-4 py-2 text-white"
              onClick={handleCheckout}
            >
              Buy
            </button>
            <button
              className="rounded-lg bg-[#bc13fe] px-4 py-2 text-white"
              onClick={clearCartsHandle}
            >
              Clear
            </button>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-white">Please login first!</h1>
        )}
      </>
    </motion.div>
  );
};

export default CartItems;

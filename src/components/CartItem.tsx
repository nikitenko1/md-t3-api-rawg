import { motion } from "framer-motion";
import Image from "next/legacy/image";
import { CartItem } from "../../lib/zustand";
import { trpc } from "../utils/trpc";
import useHover from "../../hooks/useHover";
import { BsFillTrashFill } from "react-icons/bs";

interface IProps {
  item: CartItem;
}
const CartItem = ({ item }: IProps) => {
  const utils = trpc.useContext();
  const [hoverRef, isHovering] = useHover<HTMLDivElement>();

  const { mutate: removeCartItem } = trpc.cart.deleteCart.useMutation({
    onSettled: () => {
      // Always refetch after error or success:
      utils.cart.getCarts.invalidate();
    },
  });

  const handleDelete = () => {
    removeCartItem({
      cartId: item.id,
    });
  };

  return (
    <motion.div
      ref={hoverRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-full cursor-pointer items-center gap-x-4"
    >
      <Image
        className="rounded-lg"
        src={item.image}
        objectFit="cover"
        width={50}
        height={50}
        alt="cart"
      />
      <div className="relative flex flex-col text-sm text-gray-400">
        <p>{item.name}</p>
        <p>${item.price}</p>
        {isHovering && (
          <div className="absolute bottom-0 right-0 text-red-600">
            <BsFillTrashFill onClick={handleDelete} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartItem;

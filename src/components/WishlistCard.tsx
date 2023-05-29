import React from "react";
import { IWishlist } from "../../interface";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { toast } from "react-hot-toast";
import Image from "next/legacy/image";

const WishlistCard = ({ wishlist }: { wishlist: IWishlist }) => {
  const { status } = useSession();
  const utils = trpc.useContext();

  const { mutate: deleteFromWishlist } =
    trpc.wishlist.deleteFromWishlist.useMutation({
      onSuccess() {
        // Always refetch after error or success:
        utils.wishlist.getUserWishlists.invalidate();
      },
    });

  const removeWishlist = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (status === "unauthenticated") {
      toast.error("You have to be logged in first!");
      return;
    }

    toast.success(`Removed ${wishlist.name} from wishlist`);
    await deleteFromWishlist({ gameId: wishlist.gameId });
  };

  return (
    <div
      className="bg-primary neon flex flex-col items-center  gap-x-4 gap-y-4 rounded-lg p-4
     text-white md:flex-row"
    >
      <div className="relative h-44 w-full md:w-36">
        <Image
          className="rounded-lg"
          objectFit="cover"
          src={wishlist.image}
          layout="fill"
          alt="wishlist"
        />
      </div>
      <div>
        <p>{wishlist.name}</p>
      </div>
      <div className="flex flex-col justify-between md:ml-auto">
        <p>$ {wishlist.price}</p>
        <div className="flex flex-col items-center justify-center gap-x-2 space-y-2 md:flex-row">
          <button
            onClick={removeWishlist}
            className="bg-secondary whitespace-nowrap rounded-lg px-4 py-2 font-bold text-white"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;

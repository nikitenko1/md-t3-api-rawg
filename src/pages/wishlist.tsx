import React from "react";
import { trpc } from "../utils/trpc";
import Body from "../components/Body";
import SecondHeader from "../components/SecondHeader";
import { IWishlist } from "../../interface";
import { v4 } from "uuid";
import WishlistCard from "../components/WishlistCard";

const WishlistPage = () => {
  const { data: wishlists } = trpc.wishlist.getUserWishlists.useQuery();

  return (
    <Body>
      <SecondHeader title={"Wishlist"} />
      <div className="space-y-4">
        {wishlists?.map((wishlist: IWishlist) => (
          <WishlistCard key={v4()} wishlist={wishlist} />
        ))}
      </div>
    </Body>
  );
};

export default WishlistPage;

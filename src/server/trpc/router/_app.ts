import { router } from "../trpc";
import { authRouter } from "./auth";
import { cartRouter } from "./cart";
import { wishListRouter } from "./wishList";
// import { exampleRouter } from "./example";

export const appRouter = router({
  // example: exampleRouter,
  auth: authRouter,
  cart: cartRouter,
  wishlist: wishListRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const cartRouter = router({
  getCarts: publicProcedure.query(({ ctx }) => {
    const session = ctx.session;
    const userId = session?.user?.id;

    return ctx.prisma.cart.findMany({
      where: {
        userId,
      },
    });
  }),

  addCart: publicProcedure
    .input(
      z
        .object({ name: z.string(), price: z.number(), image: z.string() })
        .nullish()
    )
    .mutation(({ input, ctx }) => {
      if (!ctx.session) throw new Error("You have to be logged in first");

      const session = ctx.session;
      const userId = session?.user?.id;
      return ctx.prisma.cart.create({
        data: {
          name: input?.name as string,
          price: input?.price as number,
          image: input?.image as string,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),

  deleteCart: publicProcedure
    .input(z.object({ cartId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.cart.delete({
        where: {
          id: input.cartId,
        },
      });
    }),

  clearCarts: publicProcedure.mutation(({ ctx }) => {
    const userId = ctx?.session?.user?.id;
    return ctx.prisma.cart.deleteMany({
      where: {
        userId,
      },
    });
  }),
});

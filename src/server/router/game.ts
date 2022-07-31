import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const gameRouter = createProtectedRouter().mutation("create", {
  async resolve({ input, ctx }) {
    const gamePlayer = await ctx.prisma.gamePlayer.create({
      data: { userId: ctx.session.user.id },
    });

    const game = await ctx.prisma.game.create({
      data: { players: { connect: { id: gamePlayer.id } } },
    });
    return { success: true, game };
  },
});
import { resolve } from "path";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const gameRouter = createProtectedRouter()
  .mutation("create", {
    input: z.object({
      email: z.string().email(),
    }),
    async resolve({ input, ctx }) {
      const emailUser = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!emailUser) {
        throw new Error("User with email does not exist");
      }

      const selfPlayer = await ctx.prisma.gamePlayer.create({
        data: { userId: ctx.session.user.id },
      });

      const otherPlayer = await ctx.prisma.gamePlayer.create({
        data: { userId: emailUser.id },
      });

      const game = await ctx.prisma.game.create({
        data: {
          players: {
            connect: [{ id: selfPlayer.id }, { id: otherPlayer.id }],
          },
        },
      });

      return { success: true, game };
    },
  })
  .query("getMine", {
    async resolve({ ctx }) {
      const games = ctx.prisma.game.findMany({
        where: {
          players: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
        include: {
          players: true,
        },
      });

      return games;
    },
  })
  .query("getGameInfo", {
    input: z.object({ gameId: z.string() }),
    async resolve({ input, ctx }) {
      const game = ctx.prisma.game.findFirst({
        where: {
          players: {
            some: {
              userId: ctx.session.user.id,
            },
          },
          AND: {
            id: input.gameId,
          },
        },
        include: {
          players: true,
        },
      });

      return game;
    },
  })
  .query("getPlayerScore", {
    input: z.object({ playerId: z.string() }),
    async resolve({ input, ctx }) {
      const gamePlayer = await ctx.prisma.gamePlayer.findFirst({
        where: {
          id: input.playerId,
        },
        include: {
          points: true,
        },
      });

      if (!gamePlayer) {
        return 0;
      }

      return gamePlayer.points.length;
    },
  })
  .mutation("givePointTo", {
    input: z.object({ playerId: z.string() }),
    async resolve({ input, ctx }) {
      const point = await ctx.prisma.point.create({
        data: {
          gamePlayerId: input.playerId,
        },
      });

      return point;
    },
  });

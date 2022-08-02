import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const userRouter = createProtectedRouter().query("get", {
    input: z
      .object({
        id: z.string(),
      }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.user.findFirst({
        where: {
          id: input.id
        }
      });
    },
  })

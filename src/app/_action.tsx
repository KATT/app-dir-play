"use server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createAction, publicProcedure } from "./utils/trpc";

// Idea of procedure that can handle both form data and called as action
const normalizeRawInputProcedure = publicProcedure.use((opts) => {
  if (opts.rawInput instanceof FormData) {
    return opts.next({
      rawInput: Object.fromEntries(opts.rawInput),
    });
  }
  return opts.next();
});

export const createPost = createAction(
  publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
      }),
    )
    .mutation(async (opts) => {
      const session = await opts.ctx.getSession();

      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return {
        id: "123",
      };
    }),
);

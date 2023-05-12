"use server";
import { z } from "zod";
import { publicProcedure } from "./utils/trpc";
import { TRPCError } from "@trpc/server";
import { asAction } from "./_lib";

const normalizeRawInputProcedure = publicProcedure.use((opts) => {
  if (opts.rawInput instanceof FormData) {
    return opts.next({
      rawInput: Object.fromEntries(opts.rawInput),
    });
  }
  return opts.next();
});

export const createPost = asAction(
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

      // ...
    }),
);

"use server";

import { z } from "zod";
import { createAction, serverActionProc } from "../utils/trpc";
import { posts } from "./data";
import { Temporal } from "@js-temporal/polyfill";
import { revalidatePath } from "next/cache";

export const createPost = createAction(
  serverActionProc
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async (opts) => {
      // const session = await opts.ctx.getSession();

      // if (!session) {
      //   throw new TRPCError({
      //     code: "UNAUTHORIZED",
      //   });
      // }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      posts.push({
        id: Math.random(),
        title: opts.input.title,
        content: opts.input.content,
        createdAt: Temporal.Now.instant(),
      });

      revalidatePath("/");
    })
);

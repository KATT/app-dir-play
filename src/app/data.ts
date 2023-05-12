import { Temporal } from "@js-temporal/polyfill";

export const posts = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post",
    createdAt: Temporal.Now.instant(),
  },
];

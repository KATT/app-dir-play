export const posts = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post",
    createdAt: Date.now(),
  },
];

export type Post = (typeof posts)[number];

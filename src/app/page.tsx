import { revalidatePath } from "next/cache";
import { Form, SubmitButton } from "./Form";

import { Temporal } from "@js-temporal/polyfill";

const posts = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post",
    createdAt: Temporal.Now.instant(),
  },
];

async function addPost(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!title || !content) {
    return {
      status: 400,
      error: "Title and content are required",
    };
    // throw new Error("Title and content are required");
  }

  posts.push({
    id: Math.random(),
    title,
    content,
    createdAt: Temporal.Now.instant(),
  });

  revalidatePath("/");
}

function InputGroup(props: { children: React.ReactNode }) {
  return <div className='flex flex-col space-y-1'>{props.children}</div>;
}

function Section(props: { children: React.ReactNode }) {
  return <section className='space-y-4'>{props.children} </section>;
}

type Post = (typeof posts)[number];
function PostItem(props: { post: Post; superSecretSessionKey: string }) {
  const { post } = props;

  return (
    <li className='flex flex-col gap-2'>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p>{post.content}</p>
      <Form
        action={async () => {
          "use server";
          console.log(".... deleting post", post);

          const idx = posts.findIndex((it) => it.id === post.id);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (idx === -1) {
            throw new Error("Post not found");
          }

          posts.splice(idx, 1);
          revalidatePath("/");
        }}
      >
        <SubmitButton className='bg-red-500 text-white p-2 rounded-md cursor-pointer'>
          Delete
        </SubmitButton>
      </Form>
    </li>
  );
}

export default function Home() {
  return (
    <main className='min-h-screen items-center p-24 space-y-8'>
      {/* List the posts */}
      <Section>
        <h1 className='text-4xl font-bold'>Posts</h1>

        <ul className='space-y-4'>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              superSecretSessionKey={"DO_NOT_SEND_ME_TO_CLIENT"}
            />
          ))}
        </ul>
      </Section>
      <Section>
        <h2 className='text-2xl font-bold'>Add a post</h2>
        <Form action={addPost} className='space-y-4' method='POST'>
          <InputGroup>
            <label htmlFor='title'>Title</label>

            <input type='text' name='title' id='title' />
          </InputGroup>

          <InputGroup>
            <label htmlFor='content'>Content</label>
            <textarea name='content' id='content' />
          </InputGroup>

          <SubmitButton
            className='transition bg-blue-500 text-white p-2 rounded-md cursor-pointer disabled:bg-slate-400'
            pendingProps={{
              disabled: true,
              className: "bg-gray-400 text-gray-500 cursor-not-allowed",
            }}
          >
            Submit
          </SubmitButton>
        </Form>
      </Section>
    </main>
  );
}

import { revalidatePath } from "next/cache";
import { Form, SubmitButton } from "./Form";
import { NextResponse } from "next/server";

const posts = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post",
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

  posts.push({ id: Math.random(), title, content });

  revalidatePath("/");
}

function InputGroup(props: { children: React.ReactNode }) {
  return <div className='flex flex-col space-y-1'>{props.children}</div>;
}

function Section(props: { children: React.ReactNode }) {
  return <section className='space-y-4'>{props.children} </section>;
}

export default function Home() {
  return (
    <main className='min-h-screen items-center p-24 space-y-8'>
      {/* List the posts */}
      <Section>
        <h1 className='text-4xl font-bold'>Posts</h1>

        <ul className='space-y-4'>
          {posts.map((post) => (
            <li key={post.id} className='flex flex-col gap-2'>
              <h2 className='text-2xl font-bold'>{post.title}</h2>
              <p>{post.content}</p>
            </li>
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

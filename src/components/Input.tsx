import { twMerge } from "tailwind-merge";

export function InputGroup(props: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-1">{props.children}</div>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={twMerge(
        "border-foreground-muted ring-offset-background focus-visible:ring-foreground-muted flex h-10 w-full rounded-md border bg-transparent px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        props.className
      )}
    />
  );
}
export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={twMerge(
        "flex h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.className
      )}
    />
  );
}

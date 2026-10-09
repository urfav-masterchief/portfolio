import { notFound } from "next/navigation";
import EditorClient from "./EditorClient";

export const dynamic = "force-dynamic";

export default function EditorPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <EditorClient />;
}

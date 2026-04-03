/**
 * Landing page — redirects to /tree.
 */
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/tree");
}

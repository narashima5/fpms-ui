import { redirect } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - FPMS" },
    { name: "description", content: "Welcome to Fertilizer Product Management System!" },
  ];
}


export default function Home() {
  
  return <div>Home</div>
}

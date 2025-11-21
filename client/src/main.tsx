import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
// import "@/styles/bubblesort.css"
import "@/styles/stack.css"
import "@/styles/queue.css"
import "@/styles/algoPage.css"
import "@/styles/bst.css"
import "@/styles/dijkstra.css"
import "@/styles/array.css"
import "@/styles/linkList.css"
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key! Did you set VITE_CLERK_PUBLISHABLE_KEY in .env?");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);

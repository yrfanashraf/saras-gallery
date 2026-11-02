import { useState } from "react";
import IntroPage from "./pages/IntroPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";

export default function App() {
  const [page, setPage] = useState("intro"); // "intro" | "gallery"

  if (page === "intro") {
    return (
      <IntroPage
        onDone={() => {
          window.scrollTo(0, 0);
          setPage("gallery");
        }}
      />
    );
  }
  return <GalleryPage onBack={() => setPage("intro")} />;
}

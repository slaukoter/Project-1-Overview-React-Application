import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import DeckListPage from "./pages/DeckListPage";
import AboutPage from "./pages/AboutPage";
import DeckDetailPage from "./pages/DeckDetailPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DeckListPage />} />
        <Route path="/decks" element={<DeckListPage />} />
        <Route path="/decks/:deckId" element={<DeckDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;

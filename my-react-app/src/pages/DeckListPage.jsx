import { Link } from "react-router-dom";
import { decks } from "../data/decks";

function DeckListPage() {
  return (
    <div>
      <h2>Decks</h2>

      <ul>
        {decks.map((deck) => (
          <li key={deck.id}>
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeckListPage;

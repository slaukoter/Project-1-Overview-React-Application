import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <h1>Steven's Magic the Gathering Decks</h1>

      <nav className="links">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/decks">Decks</Link>
          </li>
        </ul>
      </nav>

      <hr />
    </header>
  );
}

export default NavBar;

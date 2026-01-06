import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decks } from "../data/decks";
import "./DeckDetailPage.css";
import { fetchCardByName } from "../utils/scryfall";

function DeckDetailPage() {
  const { deckId } = useParams();

  // Find matching deck.
  const deck = decks.find((d) => d.id === deckId);

  // Commander fetch state
  const [commanderCard, setCommanderCard] = useState(null);
  const [loadingCommander, setLoadingCommander] = useState(false);
  const [commanderError, setCommanderError] = useState(null);

  // Selected card (click-to-preview) state
  const [selectedCardName, setSelectedCardName] = useState(null);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [selectedError, setSelectedError] = useState(null);

  // Guard, prevents crashing.
  if (!deck) {
    return <h2>Deck not found</h2>;
  }

  // Fetch commander data from Scryfall when commander name changes
  useEffect(() => {
    if (!deck.commander) {
      setCommanderCard(null);
      setCommanderError(null);
      setLoadingCommander(false);
      return;
    }

    const controller = new AbortController();

    async function fetchCommander() {
      try {
        setLoadingCommander(true);
        setCommanderError(null);

        const data = await fetchCardByName(deck.commander, controller.signal);
        setCommanderCard(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setCommanderError(err.message || "Failed to fetch commander.");
        setCommanderCard(null);
      } finally {
        setLoadingCommander(false);
      }
    }

    fetchCommander();
    return () => controller.abort();
  }, [deck.commander]);

  // When you navigate to a different deck, clear the selected preview
  useEffect(() => {
    setSelectedCardName(null);
    setSelectedCardData(null);
    setSelectedError(null);
    setLoadingSelected(false);
  }, [deckId]);

  // Fetch the selected card when a card name is clicked
  useEffect(() => {
    if (!selectedCardName) {
      setSelectedCardData(null);
      setSelectedError(null);
      setLoadingSelected(false);
      return;
    }

    const controller = new AbortController();

    async function fetchSelectedCard() {
      try {
        setLoadingSelected(true);
        setSelectedError(null);

        const data = await fetchCardByName(selectedCardName, controller.signal);

        setSelectedCardData(data);
      } catch (err) {
        if (err.name === "AbortError") return;
        setSelectedError(err.message || "Failed to fetch card.");
        setSelectedCardData(null);
      } finally {
        setLoadingSelected(false);
      }
    }

    fetchSelectedCard();

    return () => controller.abort();
  }, [selectedCardName]);

  const selectedImageUrl =
    selectedCardData?.image_uris?.normal ||
    selectedCardData?.card_faces?.[0]?.image_uris?.normal;

  return (
    <div className="deck-detail">
      <h2>{deck.name}</h2>

      {deck.commander && (
        <p>
          <strong>Commander:</strong> {deck.commander}
        </p>
      )}

      {deck.description && <p>{deck.description}</p>}

      <hr />

      <h3>Commander Card</h3>

      {loadingCommander && <p>Loading commander...</p>}
      {commanderError && <p className="error">Error: {commanderError}</p>}

      {!loadingCommander && !commanderError && commanderCard && (
        <div className="commander-card">
          {(commanderCard.image_uris?.normal ||
            commanderCard.card_faces?.[0]?.image_uris?.normal) && (
            <img
              src={
                commanderCard.image_uris?.normal ||
                commanderCard.card_faces?.[0]?.image_uris?.normal
              }
              alt={commanderCard.name}
            />
          )}

          <div className="commander-text">
            <h4>{commanderCard.name}</h4>
            <p>
              <em>{commanderCard.type_line}</em>
            </p>
            <p className="oracle-text">{commanderCard.oracle_text}</p>
          </div>
        </div>
      )}

      <hr className="divider" />

      <div className="detail-layout">
        {/* LEFT: Decklist */}
        <div className="left">
          <h3>Decklist</h3>

          <ul className="decklist">
            {deck.cards.map((card) => (
              <li key={`${card.name}-${card.qty}`}>
                {card.qty}{" "}
                <button
                  type="button"
                  className="card-link"
                  onClick={() => setSelectedCardName(card.name)}
                >
                  {card.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: Card preview */}
        <div className="right">
          <h3>Card Preview</h3>

          {!selectedCardName && <p>Click a card name to preview it.</p>}
          {loadingSelected && <p>Loading card...</p>}
          {selectedError && <p className="error">Error: {selectedError}</p>}

          {!loadingSelected && !selectedError && selectedCardData && (
            <div className="card-preview">
              {selectedImageUrl && (
                <img
                  src={selectedImageUrl}
                  alt={selectedCardData.name}
                  className="card-preview-image"
                />
              )}

              <div>
                <h4 style={{ marginTop: 0 }}>{selectedCardData.name}</h4>
                <p>
                  <em>{selectedCardData.type_line}</em>
                </p>
                <p className="oracle-text">{selectedCardData.oracle_text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeckDetailPage;

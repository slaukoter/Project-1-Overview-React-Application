const BASE_URL = "https://api.scryfall.com";

export async function fetchCardByName(name, signal) {
  const url = `${BASE_URL}/cards/named?exact=${encodeURIComponent(name)}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    let message = `Scryfall error: ${res.status}`;
    try {
      const errData = await res.json();
      if (errData?.details) message = errData.details;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}

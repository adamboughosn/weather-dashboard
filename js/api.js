// Session 11: a 404 is not an error to fetch — check response.ok and throw,
// so network failures and HTTP errors both end up in the same catch.
export async function getJSON(url) {
  const response = await fetch(url); // may reject (offline, DNS, CORS)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

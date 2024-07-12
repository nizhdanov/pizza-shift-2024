export const postAddressSuggestions = async (query: string) => {
  const response = await fetch(import.meta.env.DADATA_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${import.meta.env.DADATA_API_KEY}`
    },
    body: JSON.stringify({ query, count: 3 })
  }).then((response) => response.json());

  return response.suggestions as PostAddressSuggestionsResponse;
};

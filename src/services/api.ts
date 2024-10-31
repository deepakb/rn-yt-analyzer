export async function fetchFromApi(endpoint: string) {
  const response = await fetch(`https://api.example.com/${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
} 
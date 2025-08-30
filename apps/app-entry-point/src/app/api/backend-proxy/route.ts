export async function POST(request: Request) {
  const url = request.url;
  const response = await fetch(url);
  return response;
}
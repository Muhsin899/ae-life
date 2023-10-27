export default async function getLatestCartDetails({cartID}:{cartID:string}) {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/carts/v2/${cartID}?lang=ae-en`
  );
  if (!res.ok) throw new Error("Failed to fetch Data");
  return res.json();
}

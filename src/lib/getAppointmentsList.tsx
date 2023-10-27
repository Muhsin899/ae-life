export default async function getAppointmentsList() {
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/appointments/list?lang=ae-en`
  );

  if (!res.ok) throw new Error("Failed to Fetch Data");

  return res.json();
}

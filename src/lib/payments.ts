// Payment placeholder — real Razorpay integration goes here later.
// Do NOT wire real payment logic in visual components.
export async function processPaymentPlaceholder(_amount: number) {
  await new Promise((r) => setTimeout(r, 1800));
  return { ok: true, id: "placeholder_" + Math.random().toString(36).slice(2) };
}

// Small helpers for showing what the server really said and for reading the payment confirmation reply.

// The server's own message when it sent one (short, plain text), otherwise the fallback.
export const serverMessage = (error, fallback) => {
  const message = error && error.response && error.response.data && error.response.data.message
  return typeof message === "string" && message.trim() && message.length <= 300 ? message : fallback
}

// "pending": the payment is still being confirmed (HTTP 202), do not ask the customer to pay again.
// "success": the order exists. "failed": anything else.
export const verifyOutcome = (response) => {
  if (response && response.status === 202) return "pending"
  if (response && response.data && response.data.success === true) return "success"
  return "failed"
}

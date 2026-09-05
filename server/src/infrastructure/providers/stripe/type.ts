export type StripeClientArgs = {
  isVibhava: false
  credentials: {
    publishableKey: string
    stripeKeyId: string
  }
} | {
  isVibhava: true
}
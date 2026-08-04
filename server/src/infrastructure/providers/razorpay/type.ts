export type RazorpayGatewayArgs = {
  isVibhava: false
  credentials: {
    key_id: string
    key_secret: string
  }
} | {
  isVibhava: true
}
import Stripe from 'stripe'

type StripeLibConfig = {
  apiSecret: string
}

const apiVersion = '2022-11-15'

export default (config: StripeLibConfig) => {
  const { apiSecret } = config

  const stripeClient = new Stripe(apiSecret, {
    apiVersion,
    appInfo: {
      name: 'Stripe Official VTEX',
      version: apiVersion,
      partner_id: 'pp_partner_JI8ExJywRoRqKg',
      url: 'https://www.stripe.com/partners/vtex',
    },
  })

  return stripeClient
}

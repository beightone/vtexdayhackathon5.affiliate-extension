import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import { stringify } from 'qs'
import type Stripe from 'stripe'

export default class StripeClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://api.stripe.com/v1`, context, {
      ...options,
      timeout: 10000,
      headers: {
        ...options?.headers,
        'X-Vtex-Use-Https': 'true',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Bearer sk_test_51HgW2AJaRKWlKpKLlNiukm6KWUnmZNFVK6sdtcHNgaoJt8zvHQ7o6kNjlBO1OGGEaqj5t4Y9c4XgTjvb5xgIItWc008Hlagxgq',
      },
    })
  }

  public async createAccount(
    data: Stripe.AccountCreateParams
  ): Promise<Stripe.Response<Stripe.Account>> {
    return this.http.post('/accounts', stringify(data))
  }
}

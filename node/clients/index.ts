import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'

import StripeClient from './stripe'

export type ExternalAccountAffiliation = {
  affiliateId: string
  externalAccountId: string
  type: string
}

export class Clients extends IOClients {
  public get externalAccountAffiliation() {
    return this.getOrSet(
      'externalAccountAffiliation',
      masterDataFor<ExternalAccountAffiliation>('externalAccountAffiliation')
    )
  }

  public get stripe() {
    return this.getOrSet('stripe', StripeClient)
  }
}

import type {
  ClientsConfig,
  ServiceContext,
  RecorderState,
  EventContext,
} from '@vtex/api'
import { method, Service } from '@vtex/api'
import type { AffiliateInput, OrderForm } from '@vtex/clients'

import { Clients } from './clients'
import { createAffiliateGatewayAccount } from './middlewares/createAffiliateGatewayAccount'

const TIMEOUT_MS = 1000

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 3,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>
  type UserLoginContext = ServiceContext<Clients, UserLoginState>

  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }

  interface UserLoginEventContext extends EventContext<Clients> {
    body: {
      orderFormId: string
    }
  }

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    affiliate?: AffiliateInput
  }

  interface UserLoginState extends RecorderState {
    affiliate?: AffiliateInput
    orderForm: OrderForm
    userProfileId?: string | null
  }
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    createAffiliateGatewayAccount: method({
      POST: [createAffiliateGatewayAccount],
    }),
  },
})

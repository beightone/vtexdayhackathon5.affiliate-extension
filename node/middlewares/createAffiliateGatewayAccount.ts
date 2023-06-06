import { json } from 'co-body'

type Params = {
  id: string
  email: string
  phone: string
  name: string
  address: {
    city: string
    country: string
    postalCode: string
    state: string
    neighborhood: string
    reference: string
    number: string
    street: string
  }
}

export async function createAffiliateGatewayAccount(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    vtex: { logger },
    req,
    clients: { stripe, externalAccountAffiliation },
  } = ctx

  const { email, id, phone, address, name }: Params = await json(req)

  console.info({ email, id, phone, address, name })

  const {
    city,
    neighborhood,
    reference,
    postalCode,
    state,
    number,
    street,
  } = address

  const line1 = `${street} ${number}`
  const line2 = `${reference} ${neighborhood}`

  const [firstName, lastName] = name.split(' ')

  const phoneFormatted = `+55${phone.replace(/\D/gi, '')}`

  try {
    const accountData = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: 'custom',
      country: 'BR',
      email,
      default_currency: 'brl',
      business_profile: {
        mcc: '5734',
        product_description: 'teste',
      },
      business_type: 'individual',
      individual: {
        dob: {
          day: 1,
          month: 1,
          year: 1901,
        },
        address: {
          line1,
          line2,
          city,
          country: 'BR',
          postal_code: postalCode,
          state,
        },
        email,
        phone: phoneFormatted,
        id_number: '222222222',
        first_name: firstName,
        last_name: lastName,
        political_exposure: 'none',
      },
      metadata: {
        affiliate_source: 'vtex',
        affiliate_id: id,
      },
      external_account: {
        account_number: '0001234',
        routing_number: '110-0000',
        country: 'BR',
        currency: 'brl',
        object: 'bank_account',
        account_holder_name: 'Gabriel Tamura Mamiya',
        account_holder_type: 'individual',
      },
      tos_acceptance: {
        ip: '172.18.80.19',
        date: 1547923073,
      },
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    } as any

    console.info({ accountData })

    const response = await stripe.createAccount(accountData)

    await externalAccountAffiliation.save({
      affiliateId: id,
      externalAccountId: response.id,
      type: 'stripe',
    })

    ctx.status = 200
    ctx.body = { response }
  } catch (err) {
    console.error({ err })
    console.error({ errResponse: JSON.stringify(err.response.data) })
    logger.error({
      metric: 'create-affiliate-gateway-account',
      message: err.message,
    })
    throw new Error(err.message)
  }

  await next()
}

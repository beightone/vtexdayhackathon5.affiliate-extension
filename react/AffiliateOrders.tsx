import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

import AffiliateOrdersTable from './components/AffiliateOrdersTable'
import AffiliateOrdersChart from './components/AffiliateOrdersChart'

interface Order {
  orderId: string
  orderDate: string
  orderTotal: number
  orderTotalCommission: number
  status: string
}

function AffiliateOrders() {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    async function fetchDocuments() {
      const fields = ['orderId']

      const schema = 'payment'
      const entity = 'supplier_payments'

      const endpoint = `/api/dataentities/${entity}/search`
      const params = `_fields=${fields.toString()}&_schema=${schema}&_sort=createdIn DESC`

      const response = fetch(`${endpoint}?${params}`)

      return (await response).json()
    }

    async function fetchOrders(orderId: string) {
      const endpoint = `/api/oms/pvt/orders/${orderId}`

      const response = await fetch(endpoint)

      return response.json()
    }

    async function fetchAll() {
      const documents = await fetchDocuments()

      const promises = documents.map((document: any) =>
        fetchOrders(`${document.orderId}-01`)
      )

      const _orders = await Promise.all(promises)

      const newOrders = _orders.map((order: any) => {
        return {
          orderId: order.orderId,
          orderDate: format(new Date(order.creationDate), 'dd/MM/yyyy'),
          orderTotal: order.value,
          orderTotalCommission: order.value * 0.01,
          status: order.status,
        }
      })

      setOrders(newOrders)
      setIsLoading(false)
    }

    fetchAll()
  }, [])

  return (
    <div className="mw8 center mv8">
      <div className="mb6">
        <AffiliateOrdersTable isLoading={isLoading} orders={orders} />
      </div>

      <AffiliateOrdersChart orders={orders} />
    </div>
  )
}

export default AffiliateOrders

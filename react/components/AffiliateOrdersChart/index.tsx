/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import { LineChart, Card } from 'vtex.styleguide'

const formatCurrency = (value: number) => `R$ ${(value / 100).toFixed(2)}`

interface Order {
  orderId: string
  orderDate: string
  orderTotal: number
  orderTotalCommission: number
  status: string
}

interface AffiliateOrdersChartProps {
  orders: Order[]
}

const AffiliateOrdersChart: React.FC<AffiliateOrdersChartProps> = ({
  orders,
}) => {
  const keys = ['orderTotal', 'orderTotalCommission']
  const mapper: Record<string, string> = {
    orderTotal: 'Total do pedido',
    orderTotalCommission: 'Comissão',
  }

  const formatter = (value: number, name: string) => {
    const newValue = formatCurrency(value)

    return [newValue, mapper[name]]
  }

  return (
    <div className="mw8 center mv8">
      <h2>Gráfico</h2>

      <Card>
        <LineChart
          data={orders}
          dataKeys={keys}
          xAxisKey="orderDate"
          tooltipFormatter={formatter}
        />
      </Card>
    </div>
  )
}

export default AffiliateOrdersChart

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useMemo } from 'react'
import { Table, Card, Tag } from 'vtex.styleguide'

const getStatusTag = (status: string) => {
  if (status === 'invoiced') {
    return <Tag type="success">Finalizado</Tag>
  }

  if (status === 'cancel') {
    return <Tag type="error">Cancelado</Tag>
  }

  return <Tag type="warning">Em processo</Tag>
}

const formatCurrency = (value: number) => `R$ ${(value / 100).toFixed(2)}`

const Currency: React.FC<{ value: number }> = ({ value }) => {
  return <>{formatCurrency(value)}</>
}

const jsonschema = {
  properties: {
    orderId: {
      title: 'ID do pedido',
    },
    orderDate: {
      title: 'Data',
    },
    orderTotal: {
      title: 'Total do pedido',
      cellRenderer: ({ cellData }: { cellData: number }) => {
        return <Currency value={cellData} />
      },
    },
    orderTotalCommission: {
      title: 'Comissão',
      cellRenderer: ({ cellData }: { cellData: number }) => {
        return <Currency value={cellData} />
      },
    },
    status: {
      title: 'Status do pedido',
      cellRenderer: ({ cellData }: { cellData: string }) => {
        return getStatusTag(cellData)
      },
    },
  },
}

interface Order {
  orderId: string
  orderDate: string
  orderTotal: number
  orderTotalCommission: number
  status: string
}

interface AffiliateOrdersTableProps {
  orders: Order[]
  isLoading: boolean
}

const AffiliateOrdersTable: React.FC<AffiliateOrdersTableProps> = ({
  orders,
  isLoading,
}) => {
  const allOrderTotal = useMemo(() => {
    const total = orders.reduce((acc, order) => {
      return acc + order.orderTotal
    }, 0)

    return formatCurrency(total)
  }, [orders])

  const allOrderTotalCommission = useMemo(() => {
    const total = orders.reduce((acc, order) => {
      return acc + order.orderTotalCommission
    }, 0)

    return formatCurrency(total)
  }, [orders])

  return (
    <div className="mw8 center mv8">
      <h2>Dashboard do Afiliado</h2>

      <Card>
        <Table
          fullWidth
          schema={jsonschema}
          items={orders}
          totalizers={[
            {
              label: 'Total dos pedidos',
              value: allOrderTotal,
              isLoading,
            },

            {
              label: 'Comissão Total',
              value: allOrderTotalCommission,
              isLoading,
            },
            {
              label: 'Número de pedidos',
              value: orders.length,
              isLoading,
            },
          ]}
        />
      </Card>
    </div>
  )
}

export default AffiliateOrdersTable

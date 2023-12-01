import { fromatPrice } from '@/lib/db/format'
import React from 'react'

interface PriceTagProps {
    price: number,
    className?: string
}
const PriceTag = ({price, className}: PriceTagProps) => {
  return (
    <span className={`badge ${className}`}>{fromatPrice(price)}</span>
  )
}

export default PriceTag
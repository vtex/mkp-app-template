interface OrderStatusChange {
  domain: string
  orderId: string
  currentState: string
  lastState: string
  currentChangeDate: string
  lastChangeDate: string
}

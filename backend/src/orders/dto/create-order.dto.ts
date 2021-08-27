
export class OrderItem {
    inventoryId: number
    qyt: number
}

export class CreateOrderDto {
    shopId: number
    orderItems: OrderItem[]
}

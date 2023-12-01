export function fromatPrice(price: number){
    return price.toLocaleString('en-US', {
        style: "currency",
        currency: "INR"
    })
}
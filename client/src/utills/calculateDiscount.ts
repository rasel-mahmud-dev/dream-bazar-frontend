


function calculateDiscount(discount: number, price: number) {
  let offPrice = ( (discount / 100 ) * price )
  return price - offPrice
}

export default calculateDiscount
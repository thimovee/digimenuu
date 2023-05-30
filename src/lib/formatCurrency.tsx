export default function formatCurrency(price: number, discount?: number): string {
  let discountedPrice = price;
  if (discount) {
    discountedPrice = price - (price * (discount / 100));
  }
  const formattedPrice: string = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(discountedPrice);
  
  return formattedPrice;
}

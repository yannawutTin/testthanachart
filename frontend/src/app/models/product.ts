export interface Product {
  id: number;
  productName: string;
  productCode: string;
  pricePerPiece: number;
  quantityInStock: number;
}

export interface StockItem extends Product {
  qty: number;
}

export interface InsufficientItem {
  productId: number;
  availableQty: number;
}

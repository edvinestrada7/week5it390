export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  sku?: string;
  lastUpdated?: Date;
}
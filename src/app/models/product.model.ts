export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'Vegetable' | 'Fruit' | 'Others';
}
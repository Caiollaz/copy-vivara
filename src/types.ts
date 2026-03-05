export interface Product {
  id: string;
  name: string;
  category: 'Anéis' | 'Colares' | 'Brincos' | 'Pulseiras';
  price: number;
  description: string;
  image: string;
  material: string;
  stone?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

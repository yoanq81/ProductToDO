export type State = 'approved' | 'rejected';

export interface ProductList {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand: string;
  thumbnail: string;
  state: State;
}

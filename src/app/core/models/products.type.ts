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

export class PendingProduct {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public price: number,
    public stock: number,
    public brand: string,
    public thumbnail: string,
  ) {}
}

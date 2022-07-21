export interface Product {
  id?: string;
  name: string;
  price: number;
  price_solde: number;
  description: string;
  fichetech: string;
  imageURL: string[];
  category: string;
  quantity: number;
  isMyProduct: boolean;
  createdAt: Date;
}

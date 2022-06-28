export interface Product {
  $key: string;
  id: string;
  name: string;
  price: number;
  price_solde: number;
  description: string;
  fichetech: string;
  imageURL: File;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

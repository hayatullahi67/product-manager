export interface Product {
  id: string;
  name: string;
  price: number;
  imageUri: string;
  createdAt: string;
}

export interface ProductInput {
  name: string;
  price: number;
  imageUri: string;
}

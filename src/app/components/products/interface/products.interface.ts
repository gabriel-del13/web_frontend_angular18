
export interface CategoryInterface {
  id: number;
  name_category: string;
  parent_category: number | null;
}

export interface ProductImageInterface {
  id: number;
  image_url: string;

}


export interface ProductInterface {
  id: number;
  name_product: string;
  description: string;
  price: number;
  available_quantity: number;
  status: string;
  category: CategoryInterface;
  images: ProductImageInterface[];
}
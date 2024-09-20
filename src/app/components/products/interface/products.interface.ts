
export interface CategoryInterface {
  id_category: number;
  name_category: string;
  parent_category: CategoryInterface | null;
  subcategories: CategoryInterface[];
}

export interface ProductImageInterface {
  id: number;
  image_url: string;

}


export interface ProductInterface {
  id_product: number;
  name_product: string;
  description: string;
  price: number;
  available_quantity: number;
  status: string;
  child_category: CategoryInterface;
  images: ProductImageInterface[];
}

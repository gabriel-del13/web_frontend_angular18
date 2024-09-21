
export interface ParentCategoryInterface {
  id: number;
  name_parentcategory: string;
  subcategories: ChildCategoryInterface[];
  showChildren?: boolean;  // Propiedad opcional
  isSelected: boolean;  // Nueva propiedad para manejar la selección

}


export interface ChildCategoryInterface {
  id_childcategory: number;
  name_childcategory: string;
  parent_category: ParentCategoryInterface[] | null;
  isSelected: boolean;  // Nueva propiedad para manejar la selección

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
  child_category: ChildCategoryInterface;
  parent_category: ParentCategoryInterface;
  images: ProductImageInterface[];
}

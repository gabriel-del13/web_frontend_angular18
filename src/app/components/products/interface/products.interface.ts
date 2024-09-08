

export interface ProductInterface {
    id: number;
    name_product: string;
    description: string;
    price: number;
    available_quantity: number;
    images: string;
    status: string;
    category: {
      id: number;
      name_category: string;
      parent_category: number;
    };
  }
interface Product {
  id: string;
  name: string;
  description: string;
  img: string;
  is_deleted: boolean;
  status: string;
  price: number;
  category: string;
  popularity: number;
  stock: number;
}

interface ProductInCart extends Product {
  id: string;
  quantity: number;
  size: string;
  color: string;
  stock: number;
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}

interface Order {
  id: number;
  orderStatus: string;
  orderDate: string;
  data: {
    email: string;
  };
  products: ProductInCart[];
  subtotal: number;
  user: {
    email: string;
    id: number;
  };
}

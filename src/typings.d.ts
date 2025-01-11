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
  amount: number;
  price: string;
  total_price: string;
  product: { id: string; name: string; img: string };
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}

interface OrderSingle {
  id: string;
  name: string;
  amount: number;
  price: number;
  total_price: number;
  order_products: ProductInCart[];
}

interface Order {
  id: number;
  status: string;
  // orderDate: string;
  // data: {
  //   email: string;
  // };
  // order_products: ProductInCart[];
  total_price: number;
  user: number;
}

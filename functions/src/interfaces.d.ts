interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  fullname: string;
}

interface ProductRating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}
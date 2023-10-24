import { v4 as uuidv4 } from 'uuid';

export type Product = {
  id: string,
  price: number,
  title: string,
  description?: string,
  imageUrl?: string
}

export type Stock = {
  product_id: string,
  count: number
}

export const products: Product[] = [
  {
    description: "",
    id: uuidv4(),
    price: 30000,
    title: "BMW X1",
    imageUrl: "https://www.carscoops.com/wp-content/uploads/2020/07/bmw-x1-third-generation-render-3.jpg" 
  },
  {
    description: "",
    id: uuidv4(),
    price: 35000,
    title: "BMW X2",
    imageUrl: "https://s1.cdn.autoevolution.com/images/news/naked-2024-bmw-x2-comes-from-another-nation-imagination-201555-7.jpg"
  },
  {
    description: "Short Product Description7",
    id: uuidv4(),
    price: 45000,
    title: "BMW X3",
    imageUrl:"https://media.ed.edmunds-media.com/bmw/x3/2022/ns/2022_bmw_x3_actf34_ns_12622_1600.jpg"
  },
  {
    description: "Short Product Description2",
    id: uuidv4(),
    price: 50000,
    title: "BMW X4",
    imageUrl: "https://images.hindustantimes.com/auto/img/2022/03/06/1600x900/bmw_x4_m40i_1645668561649_1646552842155.jpg"
  },
  {
    description: "Short Product Description4",
    id: uuidv4(),
    price: 70000,
    title: "BMW X5",
    imageUrl: "https://cdcssl.ibsrv.net/autodata/images/?img=CAC90BMS191A01300.jpg"
  },
  {
    description: "Short Product Descriptio1",
    id: uuidv4(),
    price: 75000,
    title: "BMW X6",
    imageUrl: "https://www.actualidadmotor.com/wp-content/uploads/2022/08/BMW-X6-Delantera.jpg"
  },
  {
    description: "Short Product Description7",
    id: uuidv4(),
    price: 90000,
    title: "BMW X7",
    imageUrl: "https://www.autocar.co.uk/sites/autocar.co.uk/files/images/car-reviews/first-drives/legacy/99-bmw-x7-2022-facelift-official-images-studio-front.jpg"
  },
];

export const stocks: Stock[] = products.map(product => ({product_id: product.id, count: product.price/1000}))
import { EventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { products } from '../mockData';

const getProductsById : EventAPIGatewayProxyEvent = async (event) => {
  const productId = event.pathParameters.id;

  return formatJSONResponse({
    products: products.filter((product) => product.id === Number(productId)),
  });
};

export const main = getProductsById;

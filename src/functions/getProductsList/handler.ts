import { EventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { products } from '../mockData';

const getProductsList : EventAPIGatewayProxyEvent = async (event) => {
  return formatJSONResponse({
    products,
  });
};

export const main = getProductsList;

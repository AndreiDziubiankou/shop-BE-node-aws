import { EventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { DynamoDBClient,  } from '@aws-sdk/client-dynamodb';
import { Product, Stock } from 'product-service/scripts/mockData';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient({ region: 'eu-west-1' });
const docDbClient = DynamoDBDocumentClient.from(dbClient);

const getProductsById : EventAPIGatewayProxyEvent = async (event) => {
  const productId = event.pathParameters.id;

  const productsScanComand = new ScanCommand({TableName: process.env.PRODUCTS_TABLE})

  const products = (await docDbClient.send(productsScanComand)).Items as unknown as Product[];

  const stocksScanComand = new ScanCommand({TableName: process.env.STOCKS_TABLE})

  const stocks = (await docDbClient.send(stocksScanComand)).Items as unknown as Stock[];

  return formatJSONResponse({
    products: products.filter((product) => product.id === productId).map(product => {
      return { ...product, stock: stocks.find(stock => product.id === stock.product_id).count}
    }),
  }, 200);
};

export const main = getProductsById;

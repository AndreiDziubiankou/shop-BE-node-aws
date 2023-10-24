import { EventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/api-gateway';
import { DynamoDBClient,  } from '@aws-sdk/client-dynamodb';
import { Product } from 'src/scripts/mockData';
import { DynamoDBDocumentClient, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient({});
const docDbClient = DynamoDBDocumentClient.from(dbClient);

const getProductsById : EventAPIGatewayProxyEvent = async (event) => {
  const productBody = JSON.parse(event.body || '{}');

  console.log('create item: ', productBody);

  if (productBody) {

    const { id, price, title, description, imageUrl, stock } = productBody as Product & {stock: number}
    
    const command = new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCTS_TABLE,
            Item: {
              id,
              description,
              imageUrl,
              price,
              title
            },
          },
        },
        {
          Put: {
            TableName: process.env.STOCKS_TABLE,
            Item: {
              product_id: id,
              count: stock,
            },
          },
        },
      ],
    });;

    await docDbClient.send(command);

    return formatJSONResponse({
      product: productBody
    });
  }
  
};

export const main = getProductsById;

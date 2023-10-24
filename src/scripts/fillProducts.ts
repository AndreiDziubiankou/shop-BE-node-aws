import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {BatchWriteCommand,DynamoDBDocumentClient} from '@aws-sdk/lib-dynamodb';

import {products, stocks} from './mockData';

const dbClient = new DynamoDBClient({});
const docDbClient = DynamoDBDocumentClient.from(dbClient);

async function  main (){
  const command = new BatchWriteCommand({
    RequestItems: {
      products: [...products.map((product) => ({
        PutRequest: {
          Item: product,
        },
      }))
      ],
      stocks:[...stocks.map((stock) => ({
        PutRequest: {
          Item: stock,
        },
      }))
      ]
    },
  });

  const response = await docDbClient.send(command);
  console.log(response);
  return response;
};

main();
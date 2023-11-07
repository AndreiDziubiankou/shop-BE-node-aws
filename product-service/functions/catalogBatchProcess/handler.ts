import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';
import { DynamoDBDocumentClient, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from 'product-service/scripts/mockData';
import { SQSEvent } from "aws-lambda";

const dbClient = new DynamoDBClient({ region: 'eu-west-1' });
const docDbClient = DynamoDBDocumentClient.from(dbClient);

const catalogBatchProcess = async (event: SQSEvent) => {
  const snsClient = new SNSClient({ region: 'eu-west-1' });
  const newProducts = event.Records.map(record => JSON.parse(record.body));

  for (const product of newProducts){
    // create products logic here
		const id = uuidv4();
    const { price, title, description, imageUrl, stock } = product as Product & {stock: number}
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
  }

  const snsParams = { Message: 'Products successfully created! \n' + [...newProducts.map(product => JSON.stringify(product))], TopicArn: process.env.SNS_ARN };
  await snsClient.send(new PublishCommand(snsParams));
}

export const main = catalogBatchProcess;
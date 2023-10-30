import {S3} from 'aws-sdk';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';
import { formatErrorResponse, formatJSONResponse } from '@libs/api-gateway';

const s3 = new S3({region: 'eu-west-1'});
const BUCKET = process.env.S3_BUCKET;

export const importProductsFile = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    const fileName = event.queryStringParameters?.name;

    if (!fileName) {
      return formatErrorResponse(
         'Query parameter "name" is missing',
        404
      );
    }

    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const signedUrl = await s3.getSignedUrlPromise('putObject', params);

    return formatJSONResponse(signedUrl, 200);
};

export const main = importProductsFile;
import { S3, SQS } from 'aws-sdk';
import csvParser from 'csv-parser';
import { S3Event, S3EventRecord, S3Handler } from 'aws-lambda';

const s3 = new S3({ region: 'eu-west-1' });
const sqs = new SQS({region: 'eu-west-1'});

export const importFileParser: S3Handler = async (
  event: S3Event
) => {
  const record: S3EventRecord = event.Records?.[0];

  const params = {
    Bucket: record.s3.bucket.name,
    Key: record.s3.object.key,
  };

  try {
    await new Promise((resolve, reject) => {
      s3.getObject(params)
        .createReadStream()
        .pipe(csvParser())
        .on('data', async data => {
          console.info('CSV file row data:', data);

          const message = await sqs.sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(data),
          }).promise()

          console.log('sented message: ', message)
        })
    });
  } catch (error) {
    console.error('Error processing S3 object:', error);
  }
};

export const main = importFileParser;
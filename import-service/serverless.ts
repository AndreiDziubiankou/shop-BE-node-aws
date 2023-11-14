import type { AWS } from '@serverless/typescript';

import importProductsFile from './functions/importProductsFile';
import importFileParser from './functions/importFileParser';

const serverlessConfiguration: AWS = {
  service: 'adziubiankou-aws-store-import-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      S3_BUCKET: 'adziubiankou-aws-import-servise-storage',
      SQS_URL: 'https://sqs.eu-west-1.amazonaws.com/747719121619/catalogItemsQueue'
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow', Action: ['s3:ListBucket'],
          Resource: 'arn:aws:s3:::adziubiankou-aws-import-servise-storage/*',
        }, {
          Effect: 'Allow', Action: ['s3:GetObject',
            's3:GetObjectTagging',
            's3:PutObject',
            's3:PutObjectTagging',
            's3:DeleteObject'],
          Resource: 'arn:aws:s3:::adziubiankou-aws-import-servise-storage/*',
        },{
          Effect: 'Allow', Action: ['sqs:*'],
          Resource: 'arn:aws:sqs:eu-west-1:747719121619:catalogItemsQueue',
        }]
      }
    }
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
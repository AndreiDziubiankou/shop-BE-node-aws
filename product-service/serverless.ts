import type { AWS } from '@serverless/typescript';

import getProductsList from './functions/getProductsList';
import getProductsById from './functions/getProductsById';
import createProduct from './functions/createProduct'
import catalogBatchProcess from './functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'adziubiankou-aws-store-product-service',
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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: 'products',
      STOCKS_TABLE: 'stocks',
      SNS_ARN: {Ref:'createProductTopic'}
    },
    iam: {
      role: {
        statements: [{
          Effect: 'Allow', Action: ['dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem',
            'dynamodb:BatchGetItem',
            'dynamodb:BatchWriteItem'],
          Resource: 'arn:aws:dynamodb:eu-west-1:*:*',
        }, {
          Effect: 'Allow', Action: ['sqs:*'],
          Resource: { "Fn::GetAtt": ["catalogItemsQueue", "Arn"] },
        },
        {
          Effect: 'Allow', Action: ['sns:*'],
          Resource: { Ref: 'createProductTopic' }
        },
        ]
      }
    }
  },

  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct, catalogBatchProcess },
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
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
      },
      createProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      emailSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: 'email',
          Endpoint: 'dziubiankou@gmail.com',
          TopicArn: {
            Ref: 'createProductTopic'
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;

import type { AWS } from '@serverless/typescript';

import basicAuthorizer from './functions/basicAuthorizer';


const serverlessConfiguration: AWS = {
  useDotenv: true,
  service: 'adziubiankou-aws-store-auth-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    httpApi: {
      cors: true
    },
  },

  // import the function via paths
  functions: { basicAuthorizer },
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
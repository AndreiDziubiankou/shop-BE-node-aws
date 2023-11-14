import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true
            }
          }
        },
        cors: true,
        authorizer: {
          name: 'basicAuthorizer',
          type: 'token',
          identitySource: 'method.request.header.Authorization',
          resultTtlInSeconds: 0,
          arn: 'arn:aws:lambda:eu-west-1:747719121619:function:adziubiankou-aws-store-auth-service-dev-basicAuthorizer'
        }
      },
    },
  ],
};
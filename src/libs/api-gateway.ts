import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"

export type EventAPIGatewayProxyEvent = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response)
  }
}

import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"

export type EventAPIGatewayProxyEvent = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = (bodyData: Record<string, unknown> | string, statusCode) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(bodyData)
  }
}

export const formatErrorResponse = (errorMessage: string, statusCode: number) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(errorMessage)
  }
}

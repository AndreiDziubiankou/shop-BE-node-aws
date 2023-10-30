# Serverless - AWS Node.js Typescript

endpoints:
  GET - https://x6fsk91y8g.execute-api.eu-west-1.amazonaws.com/dev/product/available
  GET - https://x6fsk91y8g.execute-api.eu-west-1.amazonaws.com/dev/product/{id}
  POST - https://x6fsk91y8g.execute-api.eu-west-1.amazonaws.com/dev/products
  GET - https://v8684ic78c.execute-api.eu-west-1.amazonaws.com/dev/import

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).
Simple API to get products

Product schema: {
  id: number,
  price: number,
  title: string,
  description?: string,
  imageUrl?: string
}

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS          

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

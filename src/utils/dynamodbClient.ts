import { DynamoDB } from "aws-sdk"

const options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    accessKeyId: "x",
    secretAccessKey: "x",
}

const ifOffline = () => {
    return process.env.IS_OFFLINE;
}

export const document = ifOffline()
    ? new DynamoDB.DocumentClient(options)
    : new DynamoDB.DocumentClient();
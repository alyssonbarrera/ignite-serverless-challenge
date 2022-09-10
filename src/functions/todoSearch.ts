import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;

    const todos = await document.query({
        TableName: "todo",
        KeyConditionExpression: "user_id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    if (todos.Count === 0) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: "Todo not found"
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(todos.Items)
    }
}
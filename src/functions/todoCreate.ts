import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidV4 } from "uuid";

interface ICreateTodo {
    title: string;
    deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { id: user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

    const todoItems = {
        id: uuidV4(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline).toISOString()
    }

    await document.put({
        TableName: "todo",
        Item: todoItems
    }).promise();

    const response = await document.query({
        TableName: "todo",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo created",
            todo: response.Items[0]
        })
    }
}
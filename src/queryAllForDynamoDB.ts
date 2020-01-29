import { DynamoDB } from 'aws-sdk'

export enum ReturnType {
	items,
	none,
}

export interface FullQueryForDynamoDBParams {
	onEachItem?: (item: any) => Promise<any>,
	returnType?: ReturnType,
}

export const queryAllForDynamoDB = async (
	dynamodb: DynamoDB.DocumentClient,
	params: DynamoDB.DocumentClient.QueryInput,
	extendedParams: FullQueryForDynamoDBParams = {},
): Promise<DynamoDB.DocumentClient.QueryOutput> => {
	let LastEvaluatedKey = null
	const doOnEachItem = (typeof extendedParams.onEachItem === 'function')
	const onEachItem = extendedParams.onEachItem
	const returnType = extendedParams.returnType || ReturnType.items
	const result: DynamoDB.DocumentClient.QueryOutput = {}
	do {
		const roundParams = Object.assign({}, params)
		if (LastEvaluatedKey) {
			roundParams.ExclusiveStartKey = LastEvaluatedKey
		}
		const queryResponse = await dynamodb.query(roundParams).promise()
		if (queryResponse.Count && Array.isArray(queryResponse.Items)) {
			if (doOnEachItem) {
				queryResponse.Items.forEach((item: any) => onEachItem(item))
			}
			if (returnType !== ReturnType.none) {
				result.Items = (result.Items || []).concat(queryResponse.Items)
			}
			result.Count = (result.Count || 0) + queryResponse.Count
		}
		LastEvaluatedKey = queryResponse.LastEvaluatedKey || null
	} while (LastEvaluatedKey)
	return result
}

import test from 'ava'
import * as sinon from 'sinon'
import { MockAWSError } from './mocks/_MockAWSError'
import { MockAWSRequest, MockPromiseResult } from './mocks/_MockAWSRequest'
import { MockAWSResponse } from './mocks/_MockAWSResponse'
import { queryAllForDynamoDB, ReturnType } from '../queryAllForDynamoDB'

const generateQueryFake = (
	output: (() => AWS.DynamoDB.DocumentClient.QueryOutput) |
		AWS.DynamoDB.DocumentClient.QueryOutput,
) => {
	const queryFake = (
		params: AWS.DynamoDB.DocumentClient.QueryInput,
		callback?: (
			err: MockAWSError,
			data: AWS.DynamoDB.DocumentClient.QueryOutput
		) => void
	) => {
		const request = new MockAWSRequest<
			AWS.DynamoDB.DocumentClient.QueryOutput,
			MockAWSError
		>();
		const response = new MockAWSResponse<
			AWS.DynamoDB.DocumentClient.QueryOutput,
			MockAWSError
		>();
		const promiseStub: () => Promise<MockPromiseResult<
			AWS.DynamoDB.DocumentClient.QueryOutput,
			MockAWSError
		>> = () => Promise.resolve(Object.assign(
			{},
			(typeof output === 'function') ? output() : output,
			{ $response: response }
		))
		sinon.replace(request, 'promise', promiseStub)
		return request
	}
	return queryFake
}

test('Simple query works', async t => {
	const AWS = require('aws-sdk')
	const expectedOutput = {
		Count: 1,
		Items: [ { test: '1', data: '1' } ]
	}
	const queryFake = generateQueryFake(expectedOutput)
	const querySpy = sinon.spy(queryFake)
	const dynamodb = new AWS.DynamoDB.DocumentClient;
	sinon.replace(dynamodb, 'query', querySpy);
	const expectedParams = {
		TableName: 'Test',
		IndexName: 'testIndex',
		KeyConditionExpression: '#test = :test',
		ExpressionAttributeNames: { '#test': 'test' },
		ExpressionAttributeValues: { ':test': '1' }
	} as AWS.DynamoDB.DocumentClient.QueryInput
	const results = await queryAllForDynamoDB(dynamodb, expectedParams)
	t.deepEqual( results, expectedOutput, 'Should return test item' )
	t.is(querySpy.callCount, 1, 'query should be called only once')
	t.true(
		querySpy.firstCall.calledWith(expectedParams),
		'query should use params'
	)
})

test('All items returned when LastEvaluatedKey is used', async t => {
	const AWS = require('aws-sdk')
	let setLastEvaluatedKey = true
	const outputFunc: () => AWS.DynamoDB.DocumentClient.QueryOutput = () => {
		let output: AWS.DynamoDB.DocumentClient.QueryOutput | null = null
		if (setLastEvaluatedKey) {
			output = {
				Count: 1,
				Items: [ { test: '1', data: '1' }],
				LastEvaluatedKey: { test: '1' }
			}
			setLastEvaluatedKey = false
		}
		else {
			output = {
				Count: 1,
				Items: [ { test: '2', data: '2' }],
			}
		}
		return output
	}
	const queryFake = generateQueryFake(outputFunc)
	const querySpy = sinon.spy(queryFake)
	const dynamodb = new AWS.DynamoDB.DocumentClient;
	sinon.replace(dynamodb, 'query', querySpy)
	const params = {
		TableName: 'Test',
		IndexName: 'testIndex',
		KeyConditionExpression: '#test = :test',
		ExpressionAttributeNames: { '#test': 'test' },
		ExpressionAttributeValues: { ':test': '1' },
	} as AWS.DynamoDB.DocumentClient.QueryInput
	const results = await queryAllForDynamoDB(dynamodb, params)
	t.deepEqual( results, 
		{
			Count: 2,
			Items: [{ test: '1', data: '1' }, { test: '2', data: '2' }]
		},
		'Should return both items'
	)
	t.is(querySpy.callCount, 2, 'query should have been called twice')
	t.true(
		querySpy.firstCall.calledWith(params),
		'first call should use initial params'
	)
	t.true(
		querySpy.lastCall.calledWith(Object.assign(
			{}, params,
			{
				ExclusiveStartKey: { test: '1' }
			}
		)),
		'last call should include LastEvaluatedKey property'
	)
})

test('onEachItem', async t => {
	const AWS = require('aws-sdk')
	let setLastEvaluatedKey = true
	const outputFunc: () => AWS.DynamoDB.DocumentClient.QueryOutput = () => {
		let output: AWS.DynamoDB.DocumentClient.QueryOutput | null = null
		if (setLastEvaluatedKey) {
			output = {
				Count: 1,
				Items: [ { test: '1', data: '1' }],
				LastEvaluatedKey: { test: '1' }
			}
			setLastEvaluatedKey = false
		}
		else {
			output = {
				Count: 1,
				Items: [ { test: '2', data: '2' }],
			}
		}
		return output
	}
	const queryFake = generateQueryFake(outputFunc)
	const querySpy = sinon.spy(queryFake)
	const dynamodb = new AWS.DynamoDB.DocumentClient;
	sinon.replace(dynamodb, 'query', querySpy)
	const params = {
		TableName: 'Test',
		IndexName: 'testIndex',
		KeyConditionExpression: '#test = :test',
		ExpressionAttributeNames: { '#test': 'test' },
		ExpressionAttributeValues: { ':test': '1' },
	} as AWS.DynamoDB.DocumentClient.QueryInput
	const onEachItem = sinon.fake()
	await queryAllForDynamoDB(dynamodb, params, { onEachItem })
	t.deepEqual(
		onEachItem.firstCall.args, [ { test: '1', data: '1' } ],
		'should be called with first item'
	)
	t.deepEqual(
		onEachItem.lastCall.args, [ { test: '2', data: '2' }],
		'should be called with second item'
	)
	t.is(onEachItem.callCount, 2, 'should be called only twice')
})

test('ReturnType.none', async t => {
	const AWS = require('aws-sdk')
	let setLastEvaluatedKey = true
	const outputFunc: () => AWS.DynamoDB.DocumentClient.QueryOutput = () => {
		let output: AWS.DynamoDB.DocumentClient.QueryOutput | null = null
		if (setLastEvaluatedKey) {
			output = {
				Count: 1,
				Items: [ { test: '1', data: '1' }],
				LastEvaluatedKey: { test: '1' }
			}
			setLastEvaluatedKey = false
		}
		else {
			output = {
				Count: 1,
				Items: [ { test: '2', data: '2' }],
			}
		}
		return output
	}
	const queryFake = generateQueryFake(outputFunc)
	const querySpy = sinon.spy(queryFake)
	const dynamodb = new AWS.DynamoDB.DocumentClient;
	sinon.replace(dynamodb, 'query', querySpy)
	const params = {
		TableName: 'Test',
		IndexName: 'testIndex',
		KeyConditionExpression: '#test = :test',
		ExpressionAttributeNames: { '#test': 'test' },
		ExpressionAttributeValues: { ':test': '1' },
	} as AWS.DynamoDB.DocumentClient.QueryInput
	const result = await queryAllForDynamoDB(dynamodb, params, {
		returnType: ReturnType.none
	})
	t.deepEqual(typeof result.Items, 'undefined', 'Items property not set')
	t.deepEqual(result, { Count: 2 }, 'Count is returned')
})

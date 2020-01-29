import * as AWS from 'aws-sdk'

export class MockAWSResponse<D, E> implements AWS.Response<D, E> {
	hasNextPage(): boolean {
		throw new Error("Method not implemented12.");
	}	nextPage(callback?: (err: E, data: D) => void): void | AWS.Request<D, E> {
		throw new Error("Method not implemented13.");
	}
	data: void | D;
	error: void | E;
	requestId: string;
	redirectCount: number;
	retryCount: number;
	httpResponse: AWS.HttpResponse;
}

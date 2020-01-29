import * as AWS from 'aws-sdk'
import { WaiterConfiguration } from 'aws-sdk/lib/service'
import { MockAWSError } from './_MockAWSError'
import { MockAWSResponse } from './_MockAWSResponse'

class FakeAWSService implements AWS.Service {
	defineService(
		serviceIdentifier: string, versions: string[], features?: any
	): typeof AWS.Service {
		throw new Error("Method not implemented1.")
	}	makeRequest(
		operation: string, params?: { [key: string]: any },
		callback?: (err: MockAWSError, data: any) => void
	): MockAWSRequest<any, MockAWSError> {
		throw new MockAWSError({message: 'Method not implemented2'})
	}
	makeUnauthenticatedRequest(
		operation: string, params?: { [key: string]: any },
		callback?: (err: MockAWSError, data: any) => void
	): MockAWSRequest<any, MockAWSError> {
		throw new MockAWSError({message: 'Method not implemented3'})
	}
	setupRequestListeners(request: MockAWSRequest<any, MockAWSError>): void {
		throw new MockAWSError({message: 'Method not implemented4'})
	}
	waitFor(
		state: string,
		params?: { [key: string]: any; $waiter?: WaiterConfiguration },
		callback?: (err: MockAWSError, data: any) => void
	): MockAWSRequest<any, MockAWSError>
	waitFor(
		state: string,
		callback?: (err: MockAWSError, data: any) => void
	): MockAWSRequest<any, MockAWSError> {
		throw new MockAWSError({message: 'Method not implemented5'})
	}
	apiVersions: string[]
	config: import("aws-sdk/lib/config").ConfigBase &
		import("aws-sdk/lib/service").ServiceConfigurationOptions
	endpoint: AWS.Endpoint
}

const fakeAWSService = new FakeAWSService()

export type MockPromiseResult<D, E> = D & {$response: MockAWSResponse<D, E>};

export class MockAWSRequest<D, E> implements MockAWSRequest<D, E> {
	abort(): void {
		throw new Error("Method not implemented6.")
	}	createReadStream(): import("stream").Readable {
		throw new Error("Method not implemented7.")
	}
	eachPage(callback: (err: E, data: D, doneCallback?: () => void) => boolean): void {
		throw new Error("Method not implemented8.")
	}
	isPageable(): boolean {
		throw new Error("Method not implemented9.")
	}
	send(callback?: (err: E, data: D) => void): void {
		throw new Error("Method not implemented10.")
	}
	on(event: "validate", listener: (request: MockAWSRequest<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "build", listener: (request: MockAWSRequest<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "sign", listener: (request: MockAWSRequest<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "send", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "retry", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "extractError", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "extractData", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "success", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "error", listener: (err: MockAWSError, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "complete", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "httpHeaders", listener: (statusCode: number, headers: { [key: string]: string }, response: MockAWSResponse<D, E>, statusMessage: string) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "httpData", listener: (chunk: Buffer | Uint8Array, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "httpUploadProgress", listener: (progress: import("aws-sdk/lib/request").Progress, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "httpDownloadProgress", listener: (progress: import("aws-sdk/lib/request").Progress, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "httpError", listener: (err: Error, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: "httpDone", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	on(event: string, listener: any, prepend?: boolean): MockAWSRequest<D, E> {
		throw new MockAWSError({message: 'Not implemented'})
	}
	onAsync(event: "validate", listener: (request: MockAWSRequest<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "build", listener: (request: MockAWSRequest<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "sign", listener: (request: MockAWSRequest<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "send", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "retry", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "extractError", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "extractData", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "success", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "error", listener: (err: MockAWSError, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "complete", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "httpHeaders", listener: (statusCode: number, headers: { [key: string]: string }, response: MockAWSResponse<D, E>, statusMessage: string) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "httpData", listener: (chunk: Buffer | Uint8Array, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "httpUploadProgress", listener: (progress: import("aws-sdk/lib/request").Progress, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "httpDownloadProgress", listener: (progress: import("aws-sdk/lib/request").Progress, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "httpError", listener: (err: Error, response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: "httpDone", listener: (response: MockAWSResponse<D, E>) => void, prepend?: boolean): MockAWSRequest<D, E>
	onAsync(event: string, listener: any, prepend?: boolean): MockAWSRequest<D, E> {
		throw new MockAWSError({message: 'Not implemented'})
	}
	promise(): Promise<MockPromiseResult<D, E>> {
		throw new MockAWSError({message: "Method not implemented11."})
	}
	startTime: Date
	httpRequest: AWS.HttpRequest
}
 
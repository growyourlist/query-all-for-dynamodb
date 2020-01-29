import * as AWS from 'aws-sdk'

export class MockAWSError extends Error implements AWS.AWSError {

	public retryable: boolean
	public code: string
	public time: Date
	public statusCode: number
	public hostname: string
	public region: string
	public retryDelay: number
	public requestId: string
	public extendedRequestId: string
	public cfId: string

	constructor(opts: {
		message?: string
		retryable?: boolean
		code?: string
		time?: Date
		statusCode?: number
		hostname?: string
		region?: string
		retryDelay?: number
		requestId?: string
		extendedRequestId?: string
		cfId?: string
	} = {}) {
		super()
		this.message = (typeof opts.message !== 'undefined' ?
			opts.message : 'Mock Error');
		this.retryable = (typeof opts.retryable !== 'undefined' ?
			opts.retryable : true);
		this.code = (typeof opts.code !== 'undefined' ?
			opts.code : 'MOCK');
		this.time = (typeof opts.time !== 'undefined' ?
			opts.time : new Date);
		this.statusCode = (typeof opts.statusCode !== 'undefined' ?
			opts.statusCode : 500);
		this.hostname = (typeof opts.hostname !== 'undefined' ?
			opts.hostname : '');
		this.region = (typeof opts.region !== 'undefined' ?
			opts.region : 'us-east-1');
		this.retryDelay = (typeof opts.retryDelay !== 'undefined' ?
			opts.retryDelay : 1);
		this.requestId = (typeof opts.requestId !== 'undefined' ?
			opts.requestId : 'mock-1');
		this.extendedRequestId = (typeof opts.extendedRequestId !== 'undefined' ?
			opts.extendedRequestId : 'mock-1');
		this.cfId = (typeof opts.cfId !== 'undefined' ?
			opts.cfId : 'mock-1');
	}
}

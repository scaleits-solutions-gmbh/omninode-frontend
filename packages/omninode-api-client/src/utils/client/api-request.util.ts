import { ApiRequestInput } from "@/schemas/api-request-input.schema";
import { HttpRequestSchema } from "@scaleits-solutions-gmbh/org-lib-backend-serverless-common-kit/defs";
import { z } from "zod";
import { parseOrThrow } from '@scaleits-solutions-gmbh/org-lib-backend-common-kit';
import type { AuthenticatedApiRequestInput } from "@/schemas/authenticated-api-request-input.schema";
import { contextlessRequestSchema } from "@/schemas/contextless-request.schema";

export async function apiRequest<
	TInputSchema extends z.ZodType<z.infer<typeof HttpRequestSchema>, any, any> | undefined,
	TOutputSchema extends z.ZodTypeAny
>({method, path, inputValidationSchema, outputValidationSchema, request, apiConnection}: Omit<ApiRequestInput, 'inputValidationSchema' | 'outputValidationSchema'> & { inputValidationSchema?: TInputSchema; outputValidationSchema: TOutputSchema; }): Promise<z.infer<TOutputSchema>> {
	const validatedInput = inputValidationSchema && request
		? (parseOrThrow({
			schema: contextlessRequestSchema<TInputSchema>(inputValidationSchema),
			value: request,
			failLogMessage: 'Input validation failed',
		}) as z.infer<NonNullable<TInputSchema>>)
		: undefined;

	const url = new URL(apiConnection.baseUrl.replace(/\/$/, ''));
	const basePath = url.pathname.replace(/\/$/, '');
	const appendPath = path.startsWith('/') ? path : `/${path}`;
	url.pathname = `${basePath}${appendPath}`;
	const query = validatedInput?.queryParams ?? request?.queryParams;
	if (query) {
		for (const [key, value] of Object.entries(query)) {
			if (value !== undefined && value !== null) {
				url.searchParams.set(String(key), String(value));
			}
		}
	}

	const headers: Record<string, string> = {
		...((validatedInput?.headers ?? request?.headers) ?? {}),
	};
	const body = validatedInput?.body ?? request?.body;
	if (body !== undefined && headers['Content-Type'] == null && headers['content-type'] == null) {
		headers['Content-Type'] = 'application/json';
	}

	const options: RequestInit = { method, headers };
	if (method !== 'GET' && body !== undefined) {
		options.body = JSON.stringify(body);
	}

	let response: Response;
	if (apiConnection.timeoutMs != null) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), apiConnection.timeoutMs);
		try {
			response = await fetch(url.toString(), { ...options, signal: controller.signal });
		} finally {
			clearTimeout(timeoutId);
		}
	} else {
		response = await fetch(url.toString(), options);
	}
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url.toString()}: ${response.statusText}`);
	}
	const data = await response.json();

	const validatedOutput = parseOrThrow({
		schema: outputValidationSchema,
		value: data,
		failLogMessage: 'Output validation failed',
	}) as z.infer<TOutputSchema>;

	return validatedOutput;
}

export async function authenticatedApiRequest<
	TInputSchema extends z.ZodType<z.infer<typeof HttpRequestSchema>, any, any> | undefined,
	TOutputSchema extends z.ZodTypeAny
>({method, path, inputValidationSchema, outputValidationSchema, request, apiConnection}: Omit<AuthenticatedApiRequestInput, 'inputValidationSchema' | 'outputValidationSchema'> & { inputValidationSchema?: TInputSchema; outputValidationSchema: TOutputSchema; }): Promise<z.infer<TOutputSchema>> {
	console.log("request", request);
	const validatedInput =  request as any

	const url = new URL(apiConnection.baseUrl.replace(/\/$/, ''));
	const basePath = url.pathname.replace(/\/$/, '');
	const appendPath = path.startsWith('/') ? path : `/${path}`;
	url.pathname = `${basePath}${appendPath}`;
	const query = validatedInput?.queryParams ?? request?.queryParams;
	if (query) {
		for (const [key, value] of Object.entries(query)) {
			if (value !== undefined && value !== null) {
				url.searchParams.set(String(key), String(value));
			}
		}
	}

	const headers: Record<string, string> = {
		...((validatedInput?.headers ?? request?.headers) ?? {}),
	};

	if (apiConnection.apiAuthenticationSchema?.type === 'bearer' && apiConnection.apiAuthenticationSchema.token) {
		headers['Authorization'] = `Bearer ${apiConnection.apiAuthenticationSchema.token}`;
	}

	const body = validatedInput?.body ?? request?.body;
	if (body !== undefined && headers['Content-Type'] == null && headers['content-type'] == null) {
		headers['Content-Type'] = 'application/json';
	}

	const options: RequestInit = { method, headers };
	if (method !== 'GET' && body !== undefined) {
		options.body = JSON.stringify(body);
	}

	let response: Response;
	if (apiConnection.timeoutMs != null) {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), apiConnection.timeoutMs);
		try {
			response = await fetch(url.toString(), { ...options, signal: controller.signal });
		} finally {
			clearTimeout(timeoutId);
		}
	} else {
		response = await fetch(url.toString(), options);
	}
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url.toString()}: ${response.statusText}`);
	}
	let data: unknown;
	if (response.status !== 204) {
		data = await response.json();
	}

	const validatedOutput = parseOrThrow({
		schema: outputValidationSchema,
		value: {statusCode: response.status, body: data, headers: response.headers},
		failLogMessage: 'Output validation failed',
	}) as z.infer<TOutputSchema>;

	return validatedOutput;
}
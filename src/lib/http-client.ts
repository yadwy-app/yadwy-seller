type HttpClientConfig = {
	baseURL?: string;
	headers?: Record<string, string>;
};

type GenericResponse = unknown;

type RequestOptions = RequestInit & {
	params?: Record<string, string | number | boolean | undefined>;
};

class HttpClient {
	private baseURL: string;
	private headers: Record<string, string>;
	private interceptors: {
		request: ((config: RequestInit) => RequestInit | Promise<RequestInit>)[];
		response: ((response: Response) => Response | Promise<Response>)[];
	} = {
		request: [],
		response: [],
	};

	constructor(config?: HttpClientConfig) {
		this.baseURL = config?.baseURL || "";
		this.headers = {
			"Content-Type": "application/json",
			...(config?.headers || {}),
		};
	}

	// Interceptor methods
	public addRequestInterceptor(
		callback: (config: RequestInit) => RequestInit | Promise<RequestInit>,
	) {
		this.interceptors.request.push(callback);
	}

	public addResponseInterceptor(
		callback: (response: Response) => Response | Promise<Response>,
	) {
		this.interceptors.response.push(callback);
	}

	// Build URL with query parameters
	private buildUrl(
		endpoint: string,
		params?: Record<string, string | number | boolean | undefined>,
	): string {
		const url = `${this.baseURL}${endpoint}`;
		if (!params) return url;

		const searchParams = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined && value !== null) {
				searchParams.append(key, String(value));
			}
		}

		const queryString = searchParams.toString();
		return queryString ? `${url}?${queryString}` : url;
	}

	// Base request method
	private async request<T = GenericResponse>(
		endpoint: string,
		options: RequestOptions = {},
	): Promise<T> {
		const { params, ...fetchOptions } = options;

		let config: RequestInit = {
			...fetchOptions,
			headers: {
				...this.headers,
				...(fetchOptions.headers || {}),
			},
		};

		// Run request interceptors
		for (const interceptor of this.interceptors.request) {
			config = await interceptor(config);
		}

		const url = this.buildUrl(endpoint, params);
		let response = await fetch(url, config);

		// Run response interceptors
		for (const interceptor of this.interceptors.response) {
			response = await interceptor(response);
		}

		if (!response.ok) {
			const errorBody = await response.json().catch(() => ({}));
			throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
		}

		// Attempt to parse JSON
		try {
			const data = await response.json();
			return data as T;
		} catch {
			return {} as T; // Fallback for empty/non-json responses
		}
	}

	// HTTP Methods
	public get<T = GenericResponse>(endpoint: string, options?: RequestOptions) {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	}

	public post<T = GenericResponse>(
		endpoint: string,
		data?: unknown,
		options?: RequestOptions,
	) {
		return this.request<T>(endpoint, {
			...options,
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	public put<T = GenericResponse>(
		endpoint: string,
		data?: unknown,
		options?: RequestOptions,
	) {
		return this.request<T>(endpoint, {
			...options,
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	public patch<T = GenericResponse>(
		endpoint: string,
		data?: unknown,
		options?: RequestOptions,
	) {
		return this.request<T>(endpoint, {
			...options,
			method: "PATCH",
			body: JSON.stringify(data),
		});
	}

	public delete<T = GenericResponse>(
		endpoint: string,
		options?: RequestOptions,
	) {
		return this.request<T>(endpoint, { ...options, method: "DELETE" });
	}
}

// Create HTTP client instance with authentication support
export const httpClient = new HttpClient({
	baseURL: import.meta.env.VITE_API_URL,
});

// Add request interceptor for authentication
httpClient.addRequestInterceptor((config) => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		};
	}
	return config;
});

// Add response interceptor for handling auth errors and token refresh
httpClient.addResponseInterceptor(async (response) => {
	if (response.status === 401) {
		// Try to refresh token
		const refreshToken = localStorage.getItem("refreshToken");
		if (refreshToken) {
			try {
				// Create a new HTTP client instance without interceptors for refresh request
				const refreshClient = new HttpClient({
					baseURL: import.meta.env.VITE_API_URL,
				});

				const refreshResponse = await refreshClient.post<{
					accessToken: string;
				}>("/v1/auth/refresh", {
					refreshToken,
				});

				// Update access token
				localStorage.setItem("accessToken", refreshResponse.accessToken);

				// We can't retry the request here because we don't have access to the original request config
				// The retry will happen automatically when the user makes the next request with the new token
				// For now, just return the 401 response and let the calling code handle it

				return response;
			} catch (error) {
				console.error("Token refresh failed:", error);
			}
		}

		// If refresh fails, clear tokens
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		// You might want to redirect to login page here
		// window.location.href = '/login';
	}
	return response;
});

export { HttpClient };

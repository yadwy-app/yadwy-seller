// Shared types used across multiple modules

export interface ApiError {
	code: string;
	message: string;
}

export interface PaginationParams {
	page?: number;
	size?: number;
}

export interface PaginatedResponse<T> {
	content: T[];
	totalElements: number;
	totalPages: number;
	page: number;
	size: number;
}

// Product-related types - colocated with product services

export interface CreateProductRequestDto {
	name: string;
	description: string;
	price: number;
	categoryId: number;
	visible: boolean;
}

export interface UpdateProductRequestDto {
	name?: string;
	description?: string;
	price?: number;
	categoryId?: number;
	visible?: boolean;
}

export interface ProductResponseDto {
	id: number;
	name: string;
	description: string;
	price: number;
	categoryId: number;
	sellerId: number;
	visible: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ProductListParams {
	sellerId?: number;
	categoryId?: number;
	visible?: boolean;
	page?: number;
	size?: number;
}

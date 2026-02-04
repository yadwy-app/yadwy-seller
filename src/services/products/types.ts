// Product-related types - colocated with product services

export interface LocalizedText {
	ar: string;
	en: string;
}

export interface CreateProductRequestDto {
	name: LocalizedText;
	description: LocalizedText;
	price: number;
	categoryId: number;
	visible: boolean;
}

export interface UpdateProductRequestDto {
	name?: LocalizedText;
	description?: LocalizedText;
	price?: number;
	categoryId?: number;
	visible?: boolean;
}

export interface ProductResponseDto {
	id: number;
	sellerId: number;
	name: LocalizedText;
	description: LocalizedText;
	images: string[];
	price: number;
	compareAtPrice?: number;
	categoryId: number;
	stock: number;
	trackInventory: boolean;
	visible: boolean;
}

export interface ProductListParams
	extends Record<string, string | number | boolean | undefined> {
	sellerId?: number;
	categoryId?: number;
	visible?: boolean;
	page?: number;
	size?: number;
}

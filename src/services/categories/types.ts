// Category-related types - colocated with category services

export interface CreateCategoryRequestDto {
	name: string;
	slug: string;
	parentId?: number;
}

export interface UpdateCategoryRequestDto {
	name?: string;
	slug?: string;
	parentId?: number;
}

export interface CategoryResponseDto {
	id: number;
	name: string;
	slug: string;
	parentId?: number;
	children?: CategoryResponseDto[];
	createdAt: string;
	updatedAt: string;
}

export interface CategoryListParams {
	parentId?: number;
	include?: "children";
}

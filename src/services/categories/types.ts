// Category-related types - colocated with category services

export interface LocalizedDto {
	ar: string;
	en?: string;
}

export interface CreateCategoryRequestDto {
	name: LocalizedDto;
	slug: string;
	imageUrl?: string;
	description?: LocalizedDto;
	parentId?: number;
}

export interface UpdateCategoryRequestDto {
	name?: LocalizedDto;
	imageUrl?: string;
	description?: LocalizedDto;
}

export interface CategoryResponseDto {
	id: number;
	name: LocalizedDto;
	slug: string;
	description?: LocalizedDto;
	imageUrl?: string;
	parentId?: number;
	children?: CategoryResponseDto[];
}

export interface CategoryListParams
	extends Record<string, string | number | boolean | undefined> {
	parentId?: number;
	include?: "children";
}

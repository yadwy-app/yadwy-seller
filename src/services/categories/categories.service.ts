import { httpClient } from "@/lib/http-client";
import type {
	CategoryListParams,
	CategoryResponseDto,
	CreateCategoryRequestDto,
	UpdateCategoryRequestDto,
} from "./types";

class CategoriesService {
	async getCategories(
		params?: CategoryListParams,
	): Promise<CategoryResponseDto[]> {
		const response = await httpClient.get<CategoryResponseDto[]>(
			"/v1/categories",
			{ params },
		);
		return response;
	}

	async getCategoryById(id: number): Promise<CategoryResponseDto> {
		const response = await httpClient.get<CategoryResponseDto>(
			`/v1/categories/${id}`,
		);
		return response;
	}

	async createCategory(
		data: CreateCategoryRequestDto,
	): Promise<CategoryResponseDto> {
		const response = await httpClient.post<CategoryResponseDto>(
			"/v1/categories",
			data,
		);
		return response;
	}

	async updateCategory(
		id: number,
		data: UpdateCategoryRequestDto,
	): Promise<CategoryResponseDto> {
		const response = await httpClient.put<CategoryResponseDto>(
			`/v1/categories/${id}`,
			data,
		);
		return response;
	}

	async deleteCategory(id: number): Promise<void> {
		await httpClient.delete(`/v1/categories/${id}`);
	}
}

export const categoriesService = new CategoriesService();

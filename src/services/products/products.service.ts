import { httpClient } from "@/lib/http-client";
import type {
	CreateProductRequestDto,
	ProductListParams,
	ProductResponseDto,
} from "./types";

export const productsService = {
	/**
	 * Get products with optional filtering
	 */
	getProducts: async (
		params: ProductListParams = {},
	): Promise<ProductResponseDto[]> => {
		try {
			const response = await httpClient.get<ProductResponseDto[]>(
				"/v1/products",
				{
					params,
				},
			);

			return response;
		} catch (error) {
			console.error("Failed to fetch products:", error);
			throw error;
		}
	},

	/**
	 * Get a single product by ID
	 */
	getProductById: async (id: number): Promise<ProductResponseDto> => {
		const response = await httpClient.get<ProductResponseDto>(
			`/v1/products/${id}`,
		);

		return response;
	},

	/**
	 * Create a new product
	 */
	createProduct: async (
		data: CreateProductRequestDto,
	): Promise<ProductResponseDto> => {
		const response = await httpClient.post<ProductResponseDto>(
			"/v1/products",
			data,
		);

		return response;
	},
};

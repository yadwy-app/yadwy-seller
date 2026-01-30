import { useQuery } from "@tanstack/react-query";
import { getProductById, mockProducts } from "@/data/mock-products";
import type { Product } from "@/types";

export function useProducts() {
	return useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: async () => {
			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 200));
			return mockProducts;
		},
	});
}

export function useProduct(id: string) {
	return useQuery<Product | undefined>({
		queryKey: ["products", id],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			return getProductById(id);
		},
		enabled: !!id,
	});
}

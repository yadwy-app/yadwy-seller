import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { productsService } from "@/services/products";
import type { ProductResponseDto } from "@/services/products/types";

export function useProducts() {
	return useQuery<ProductResponseDto[]>({
		queryKey: ["products"],
		queryFn: async () => {
			const user = await authService.getCurrentUser();
			if (!user) {
				throw new Error("User not authenticated");
			}

			return productsService.getProducts({
				sellerId: user.id,
			});
		},
	});
}

export function useProduct(id: string) {
	return useQuery<ProductResponseDto | undefined>({
		queryKey: ["products", id],
		queryFn: async () => {
			if (!id) return undefined;
			return productsService.getProductById(Number(id));
		},
		enabled: !!id,
	});
}

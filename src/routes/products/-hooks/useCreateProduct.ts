import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsService } from "@/services/products";
import type { CreateProductRequestDto } from "@/services/products/types";

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateProductRequestDto) =>
			productsService.createProduct(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

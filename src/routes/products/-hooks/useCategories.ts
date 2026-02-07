import { queryOptions, useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories";
import type { CategoryResponseDto } from "@/services/categories/types";

const categoriesQueryOptions = () =>
	queryOptions<CategoryResponseDto[]>({
		queryKey: ["categories", "tree"],
		queryFn: async () => {
			return categoriesService.getCategories({ include: "children" });
		},
	});

export function useCategories() {
	return useQuery(categoriesQueryOptions());
}

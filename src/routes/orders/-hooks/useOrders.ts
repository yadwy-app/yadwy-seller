import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { getDashboardStats } from "@/data/mock-orders";
import {
	type OrdersQueryParams,
	ordersService,
	type SellerOrder,
} from "@/services/orders";
import type { DashboardStats } from "@/types";

const PAGE_SIZE = 20;

export function useOrders(params?: Omit<OrdersQueryParams, "page">) {
	return useInfiniteQuery<SellerOrder[]>({
		queryKey: ["orders", params],
		queryFn: ({ pageParam }) =>
			ordersService.getOrders({
				...params,
				page: pageParam as number,
				size: PAGE_SIZE,
			}),
		initialPageParam: 0,
		getNextPageParam: (lastPage, _allPages, lastPageParam) => {
			// If we got fewer items than page size, we've reached the end
			if (lastPage.length < PAGE_SIZE) {
				return undefined;
			}
			return (lastPageParam as number) + 1;
		},
	});
}

export function useOrder(id: string) {
	return useQuery<SellerOrder>({
		queryKey: ["orders", id],
		queryFn: () => ordersService.getOrderById(id),
		enabled: !!id,
	});
}

export function useUpdateOrderStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
			ordersService.updateOrderStatus(orderId, status),
		onSuccess: (updatedOrder) => {
			// Update the specific order in cache
			queryClient.setQueryData(
				["orders", updatedOrder.id.toString()],
				updatedOrder,
			);

			// Invalidate orders list to refresh
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
}

export function useDashboardStats() {
	return useQuery<DashboardStats>({
		queryKey: ["dashboard-stats"],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 150));
			return getDashboardStats();
		},
	});
}

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/data/mock-orders";
import { type OrdersQueryParams, ordersService } from "@/services/orders";
import type { DashboardStats } from "@/types";

export function useOrders(params?: OrdersQueryParams) {
	return useQuery({
		queryKey: ["orders", params],
		queryFn: () => ordersService.getOrders(params),
	});
}

export function useOrder(id: string) {
	return useQuery({
		queryKey: ["orders", id],
		queryFn: () => ordersService.getOrderById(id),
		enabled: !!id,
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

import { useQuery } from "@tanstack/react-query";
import {
	getDashboardStats,
	getOrderById,
	mockOrders,
} from "@/data/mock-orders";
import type { DashboardStats, Order } from "@/types";

export function useOrders() {
	return useQuery<Order[]>({
		queryKey: ["orders"],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 200));
			return mockOrders;
		},
	});
}

export function useOrder(id: string) {
	return useQuery<Order | undefined>({
		queryKey: ["orders", id],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 100));
			return getOrderById(id);
		},
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/services/orders";
import type { PlaceOrderRequest } from "@/services/orders/types";

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: PlaceOrderRequest) => ordersService.createOrder(data),
		onSuccess: () => {
			// Invalidate orders list to refresh with new order
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			// Don't cache the seller order here - let the detail page fetch fresh data
		},
	});
}

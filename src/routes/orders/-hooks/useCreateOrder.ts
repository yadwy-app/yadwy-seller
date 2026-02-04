import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersService } from "@/services/orders";
import type { PlaceOrderRequest } from "@/services/orders/types";

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: PlaceOrderRequest) => ordersService.createOrder(data),
		onSuccess: (newOrder) => {
			// Invalidate orders list to refresh with new order
			queryClient.invalidateQueries({ queryKey: ["orders"] });

			// Add the new order to cache
			queryClient.setQueryData(["orders", newOrder.id.toString()], newOrder);
		},
	});
}

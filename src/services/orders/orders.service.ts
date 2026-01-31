import { httpClient } from "@/lib/http-client";
import type { Order, OrdersQueryParams, OrdersResponse } from "./types";

export const ordersService = {
	/**
	 * Get paginated orders for the current seller
	 */
	getOrders: async (
		params: OrdersQueryParams = {},
	): Promise<OrdersResponse> => {
		const { page = 0, size = 10, sort = "createdAt,desc" } = params;

		try {
			const response = await httpClient.get<OrdersResponse>(
				"/v1/sellers/orders",
				{
					params: {
						page,
						size,
						sort,
					},
				},
			);

			return response;
		} catch (error) {
			console.error("Failed to fetch orders:", error);
			throw error;
		}
	},

	/**
	 * Get a single order by ID
	 */
	getOrderById: async (orderId: string): Promise<Order> => {
		const response = await httpClient.get<Order>(
			`/v1/sellers/orders/${orderId}`,
		);

		return response;
	},
};

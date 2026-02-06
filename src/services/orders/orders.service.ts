import { httpClient } from "@/lib/http-client";
import type {
	OrderResponse,
	OrdersQueryParams,
	PlaceOrderRequest,
	SellerOrder,
} from "./types";

export const ordersService = {
	/**
	 * Get orders for the current seller
	 * Backend returns a flat array (not paginated wrapper)
	 */
	getOrders: async (params: OrdersQueryParams = {}): Promise<SellerOrder[]> => {
		const { page = 0, size = 10 } = params;

		try {
			const response = await httpClient.get<SellerOrder[]>(
				"/v1/sellers/orders",
				{
					params: {
						page,
						size,
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
	getOrderById: async (orderId: string): Promise<SellerOrder> => {
		const response = await httpClient.get<SellerOrder>(
			`/v1/sellers/orders/${orderId}`,
		);

		return response;
	},

	/**
	 * Update order status
	 */
	updateOrderStatus: async (
		orderId: string,
		status: string,
	): Promise<SellerOrder> => {
		const response = await httpClient.patch<SellerOrder>(
			`/v1/sellers/orders/${orderId}`,
			{
				status,
			},
		);

		return response;
	},

	/**
	 * Create a new order (place order)
	 */
	createOrder: async (data: PlaceOrderRequest): Promise<OrderResponse> => {
		const response = await httpClient.post<OrderResponse>("/v1/orders", data);

		return response;
	},
};

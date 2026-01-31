// Order-specific types following frontend architecture rules

// Status types specific to orders service
export type PaymentStatus =
	| "paid"
	| "pending"
	| "refunded"
	| "partially_refunded"
	| "failed";
export type FulfillmentStatus =
	| "fulfilled"
	| "unfulfilled"
	| "partially_fulfilled"
	| "on_hold"
	| "in_progress";
export type DeliveryStatus = "delivered" | "in_transit" | "pending" | "failed";

export interface OrderItem {
	id: string;
	productId: string;
	title: string;
	sku?: string;
	quantity: number;
	price: number;
	image?: string;
}

export interface OrderCustomer {
	id?: string;
	name: string;
	email: string;
	phone?: string;
	ordersCount: number;
}

export interface OrderAddress {
	name: string;
	address1: string;
	address2?: string;
	city: string;
	province?: string;
	zip: string;
	country: string;
}

export interface OrderTimelineEvent {
	id: string;
	date: string;
	time: string;
	description: string;
	type: "fulfillment" | "payment" | "note" | "email" | "system";
}

export interface Order {
	id: string;
	orderNumber: string;
	customerId: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	totalAmount: number;
	paymentStatus: PaymentStatus;
	fulfillmentStatus: FulfillmentStatus;
	createdAt: string;
	updatedAt: string;

	// Additional properties expected by components
	customer: OrderCustomer;
	items: OrderItem[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	channel: string;
	shippingAddress: OrderAddress;
	billingAddress?: OrderAddress;
	timeline: OrderTimelineEvent[];
	notes?: string;
	tags: string[];
	deliveryStatus?: DeliveryStatus;
}

export interface OrdersResponse {
	content: Order[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
	last: boolean;
	first: boolean;
}

export interface OrdersQueryParams {
	page?: number;
	size?: number;
	sort?: string;
}

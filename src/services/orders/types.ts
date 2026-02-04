// Order-specific types matching backend API response

// Localized text (ar/en)
export interface LocalizedText {
	ar: string;
	en: string;
}

// Order status from backend
export type SellerOrderStatus =
	| "RECEIVED"
	| "CONFIRMED"
	| "SHIPPED"
	| "DELIVERED"
	| "CANCELLED";

// Order line item from backend
export interface OrderLine {
	productId: number;
	productName: LocalizedText;
	unitPrice: number;
	quantity: number;
	subtotal: number;
}

// Seller order from backend API
export interface SellerOrder {
	id: number;
	orderId: number;
	sellerId: number;
	status: SellerOrderStatus;
	lines: OrderLine[];
	subtotal: number;
	shippingFee: number;
	total: number;
	createdAt: string;
	updatedAt: string;
	// Customer information
	customerName: string;
	customerPhone: string;
}

// Query params for fetching orders
export interface OrdersQueryParams {
	page?: number;
	size?: number;
	sort?: string;
}

// Legacy types kept for compatibility (can be removed later)
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

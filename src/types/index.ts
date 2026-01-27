// Product Types
export type ProductStatus = "active" | "draft" | "archived";

export interface ProductImage {
	id: string;
	url: string;
	alt: string;
}

export interface ProductVariant {
	id: string;
	title: string;
	price: number;
	compareAtPrice?: number;
	sku: string;
	inventory: number;
}

export interface Product {
	id: string;
	title: string;
	description: string;
	status: ProductStatus;
	images: ProductImage[];
	category: string;
	vendor: string;
	price: number;
	compareAtPrice?: number;
	costPerItem?: number;
	sku: string;
	barcode?: string;
	inventory: number;
	variants: ProductVariant[];
	createdAt: string;
	updatedAt: string;
}

// Order Types
export type PaymentStatus =
	| "paid"
	| "pending"
	| "refunded"
	| "partially_refunded";
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
	sku: string;
	quantity: number;
	price: number;
	image?: string;
}

export interface OrderCustomer {
	id: string;
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
	country: string;
	zip: string;
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
	customer: OrderCustomer;
	items: OrderItem[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	paymentStatus: PaymentStatus;
	fulfillmentStatus: FulfillmentStatus;
	deliveryStatus?: DeliveryStatus;
	channel: string;
	shippingAddress: OrderAddress;
	billingAddress?: OrderAddress;
	timeline: OrderTimelineEvent[];
	notes?: string;
	tags: string[];
	createdAt: string;
	updatedAt: string;
}

// Dashboard Types
export interface DashboardStats {
	totalOrders: number;
	totalRevenue: number;
	totalProducts: number;
	ordersToFulfill: number;
	pendingPayments: number;
}

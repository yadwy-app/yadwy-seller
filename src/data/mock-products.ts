import type { Product } from "@/types";

export const mockProducts: Product[] = [
	{
		id: "1",
		title: "Handmade Ceramic Mug",
		description:
			"A beautiful handcrafted ceramic mug with a unique glaze finish. Perfect for your morning coffee or tea. Each piece is one-of-a-kind due to the handmade nature.",
		status: "active",
		images: [
			{
				id: "img-1",
				url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
				alt: "Ceramic mug with brown glaze",
			},
		],
		category: "Kitchen & Dining",
		vendor: "Artisan Crafts",
		price: 35.0,
		compareAtPrice: 45.0,
		costPerItem: 12.0,
		sku: "MUG-CER-001",
		barcode: "1234567890123",
		inventory: 24,
		variants: [],
		createdAt: "2026-01-15T10:00:00Z",
		updatedAt: "2026-01-25T14:30:00Z",
	},
	{
		id: "2",
		title: "Woven Cotton Throw Blanket",
		description:
			"Soft and cozy hand-woven cotton throw blanket. Made with 100% organic cotton. Available in multiple colors.",
		status: "active",
		images: [
			{
				id: "img-2",
				url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
				alt: "Cream colored throw blanket",
			},
		],
		category: "Home Decor",
		vendor: "Handweave Co",
		price: 89.0,
		compareAtPrice: 120.0,
		costPerItem: 35.0,
		sku: "BLK-COT-002",
		inventory: 12,
		variants: [
			{
				id: "v1",
				title: "Cream",
				price: 89.0,
				sku: "BLK-COT-002-CR",
				inventory: 5,
			},
			{
				id: "v2",
				title: "Gray",
				price: 89.0,
				sku: "BLK-COT-002-GR",
				inventory: 4,
			},
			{
				id: "v3",
				title: "Navy",
				price: 89.0,
				sku: "BLK-COT-002-NV",
				inventory: 3,
			},
		],
		createdAt: "2026-01-10T09:00:00Z",
		updatedAt: "2026-01-24T11:00:00Z",
	},
	{
		id: "3",
		title: "Macrame Plant Hanger",
		description:
			"Elegant macrame plant hanger handmade with natural cotton rope. Fits pots up to 8 inches in diameter.",
		status: "active",
		images: [
			{
				id: "img-3",
				url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
				alt: "Macrame plant hanger with green plant",
			},
		],
		category: "Home Decor",
		vendor: "Knot Studio",
		price: 28.0,
		costPerItem: 8.0,
		sku: "MAC-PLT-003",
		inventory: 45,
		variants: [],
		createdAt: "2026-01-08T15:00:00Z",
		updatedAt: "2026-01-20T10:00:00Z",
	},
	{
		id: "4",
		title: "Handpainted Wooden Bowl",
		description:
			"Beautiful wooden bowl with hand-painted floral design. Made from sustainable mango wood.",
		status: "draft",
		images: [
			{
				id: "img-4",
				url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
				alt: "Wooden bowl with floral pattern",
			},
		],
		category: "Kitchen & Dining",
		vendor: "Wood & Art",
		price: 42.0,
		compareAtPrice: 55.0,
		costPerItem: 15.0,
		sku: "BWL-WOD-004",
		inventory: 8,
		variants: [],
		createdAt: "2026-01-05T12:00:00Z",
		updatedAt: "2026-01-18T09:00:00Z",
	},
	{
		id: "5",
		title: "Natural Beeswax Candles (Set of 3)",
		description:
			"Set of 3 hand-poured beeswax candles. Natural honey scent with cotton wicks. Burns clean and long-lasting.",
		status: "active",
		images: [
			{
				id: "img-5",
				url: "https://images.unsplash.com/photo-1602607388325-ab0f9fc7c8ea?w=400",
				alt: "Three beeswax candles",
			},
		],
		category: "Home Fragrance",
		vendor: "Bee Naturals",
		price: 24.0,
		costPerItem: 7.0,
		sku: "CND-BEE-005",
		inventory: 67,
		variants: [],
		createdAt: "2026-01-02T08:00:00Z",
		updatedAt: "2026-01-22T16:00:00Z",
	},
	{
		id: "6",
		title: "Leather Journal Notebook",
		description:
			"Handstitched leather journal with recycled paper pages. Perfect for sketching, journaling, or note-taking.",
		status: "active",
		images: [
			{
				id: "img-6",
				url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400",
				alt: "Brown leather journal",
			},
		],
		category: "Stationery",
		vendor: "Leather Works",
		price: 48.0,
		compareAtPrice: 60.0,
		costPerItem: 18.0,
		sku: "JRN-LTH-006",
		barcode: "1234567890456",
		inventory: 32,
		variants: [
			{
				id: "v4",
				title: "Brown",
				price: 48.0,
				sku: "JRN-LTH-006-BR",
				inventory: 20,
			},
			{
				id: "v5",
				title: "Black",
				price: 48.0,
				sku: "JRN-LTH-006-BK",
				inventory: 12,
			},
		],
		createdAt: "2025-12-28T11:00:00Z",
		updatedAt: "2026-01-21T13:00:00Z",
	},
];

export function getProductById(id: string): Product | undefined {
	return mockProducts.find((p) => p.id === id);
}

export function getProductsByStatus(status: Product["status"]): Product[] {
	return mockProducts.filter((p) => p.status === status);
}

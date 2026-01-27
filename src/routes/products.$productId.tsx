import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useProduct } from "@/hooks";

export const Route = createFileRoute("/products/$productId")({
	component: ProductDetailPage,
});

function ProductDetailPage() {
	const { productId } = Route.useParams();
	const { data: product, isLoading } = useProduct(productId);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-EG", {
			style: "currency",
			currency: "EGP",
			minimumFractionDigits: 2,
		}).format(amount);
	};

	if (isLoading) {
		return (
			<div className="pb-20">
				<div className="animate-pulse">
					<div className="h-8 bg-muted rounded w-48 mb-6" />
					<div className="h-64 bg-muted rounded" />
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="pb-20">
				<div className="flex items-center gap-4 mb-6">
					<Link
						to="/products"
						className="p-2 hover:bg-accent rounded-md transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
					</Link>
					<h1 className="text-xl font-semibold">Product not found</h1>
				</div>
				<p className="text-muted-foreground">
					The product you're looking for doesn't exist.
				</p>
			</div>
		);
	}

	// Calculate profit and margin if cost is available
	const profit = product.costPerItem ? product.price - product.costPerItem : null;
	const margin = profit && product.price > 0 ? (profit / product.price) * 100 : null;

	return (
		<div className="pb-20">
			{/* Header */}
			<div className="flex items-center gap-4 mb-6">
				<Link
					to="/products"
					className="p-2 hover:bg-accent rounded-md transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<div className="flex-1">
					<div className="flex items-center gap-3">
						<h1 className="text-xl font-semibold">{product.title}</h1>
						<StatusBadge status={product.status} type="product" />
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline">Duplicate</Button>
					<Button variant="outline">View</Button>
					<Button variant="outline" size="icon">
						<MoreHorizontal className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Main content - 2 columns */}
				<div className="lg:col-span-2 space-y-4">
					{/* Title & Description */}
					<Card>
						<CardContent className="pt-6">
							<div className="space-y-4">
								<div>
									<Label htmlFor="title">Title</Label>
									<Input
										id="title"
										defaultValue={product.title}
										className="mt-1.5"
									/>
								</div>
								<div>
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										defaultValue={product.description}
										className="mt-1.5 min-h-[150px]"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Media */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Media</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-4 gap-3">
								{product.images.map((image) => (
									<div key={image.id} className="relative group aspect-square">
										<img
											src={image.url}
											alt={image.alt}
											className="w-full h-full object-cover rounded-lg border border-border"
										/>
									</div>
								))}
								<div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
									<Plus className="w-5 h-5 text-muted-foreground" />
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Pricing */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Pricing</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="price">Price</Label>
									<div className="relative mt-1.5">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
											EGP
										</span>
										<Input
											id="price"
											type="number"
											defaultValue={product.price}
											className="pl-12"
										/>
									</div>
								</div>
								<div>
									<Label htmlFor="compareAt">Compare-at price</Label>
									<div className="relative mt-1.5">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
											EGP
										</span>
										<Input
											id="compareAt"
											type="number"
											defaultValue={product.compareAtPrice ?? ""}
											className="pl-12"
										/>
									</div>
								</div>
							</div>
							<div className="mt-4 pt-4 border-t">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<Label htmlFor="cost">Cost per item</Label>
										<div className="relative mt-1.5">
											<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
												EGP
											</span>
											<Input
												id="cost"
												type="number"
												defaultValue={product.costPerItem ?? ""}
												className="pl-12"
											/>
										</div>
									</div>
									<div className="flex items-end pb-2">
										<div className="flex gap-4 text-sm">
											<span className="text-muted-foreground">
												Profit:{" "}
												<span className={profit && profit > 0 ? "text-green-600 font-medium" : "text-muted-foreground"}>
													{profit !== null ? formatCurrency(profit) : "--"}
												</span>
											</span>
											<span className="text-muted-foreground">
												Margin:{" "}
												<span className={margin && margin > 0 ? "text-green-600 font-medium" : "text-muted-foreground"}>
													{margin !== null ? `${margin.toFixed(1)}%` : "--"}
												</span>
											</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Inventory */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-medium">Inventory</CardTitle>
								<div className="flex items-center gap-2">
									<Label htmlFor="track-inventory" className="text-sm font-normal text-muted-foreground">
										Track inventory
									</Label>
									<Switch id="track-inventory" defaultChecked />
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="sku">SKU</Label>
									<Input id="sku" defaultValue={product.sku} className="mt-1.5" />
								</div>
								<div>
									<Label htmlFor="barcode">Barcode</Label>
									<Input
										id="barcode"
										defaultValue={product.barcode ?? ""}
										className="mt-1.5"
									/>
								</div>
							</div>
							<div className="mt-4">
								<Label htmlFor="quantity">Available</Label>
								<Input
									id="quantity"
									type="number"
									defaultValue={product.inventory}
									className="mt-1.5 w-32"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Variants */}
					{product.variants.length > 0 && (
						<Card>
							<CardHeader className="pb-3">
								<CardTitle className="text-base font-medium">Variants</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									{product.variants.map((variant) => (
										<div
											key={variant.id}
											className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
										>
											<span className="font-medium">{variant.title}</span>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<span>{formatCurrency(variant.price)}</span>
												<span>{variant.inventory} in stock</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-4">
					{/* Status */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Status</CardTitle>
						</CardHeader>
						<CardContent>
							<Select defaultValue={product.status}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="draft">Draft</SelectItem>
									<SelectItem value="archived">Archived</SelectItem>
								</SelectContent>
							</Select>
						</CardContent>
					</Card>

					{/* Publishing */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Publishing</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-2">
								<div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm">
									<span className="w-2 h-2 bg-green-500 rounded-full" />
									Online Store
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Product organization */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Product organization</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<Label htmlFor="category">Category</Label>
									<Input
										id="category"
										defaultValue={product.category}
										className="mt-1.5"
									/>
								</div>
								<div>
									<Label htmlFor="vendor">Vendor</Label>
									<Input
										id="vendor"
										defaultValue={product.vendor}
										className="mt-1.5"
									/>
								</div>
								<div>
									<Label htmlFor="tags">Tags</Label>
									<Input
										id="tags"
										placeholder="Add tags..."
										className="mt-1.5"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Sticky bottom save bar */}
			<div className="sticky bottom-0 -mx-6 mt-6 bg-card border-t border-border p-4">
				<div className="flex justify-end gap-3">
					<Button variant="outline">Discard</Button>
					<Button>Save</Button>
				</div>
			</div>
		</div>
	);
}

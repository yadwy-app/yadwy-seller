import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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
			<div className="max-w-5xl">
				<div className="animate-pulse">
					<div className="h-8 bg-muted rounded w-48 mb-6" />
					<div className="h-64 bg-muted rounded" />
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="max-w-5xl">
				<PageHeader title="Product not found" />
				<p className="text-muted-foreground">
					The product you're looking for doesn't exist.
				</p>
				<Link
					to="/products"
					className="text-primary hover:underline mt-4 inline-block"
				>
					← Back to products
				</Link>
			</div>
		);
	}

	return (
		<div className="max-w-5xl">
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
					<Button variant="outline">Preview</Button>
					<Button variant="outline" size="icon">
						<MoreHorizontal className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main content - 2 columns */}
				<div className="lg:col-span-2 space-y-6">
					{/* Title & Description */}
					<Card className="p-5">
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
									className="mt-1.5 min-h-[120px]"
								/>
							</div>
						</div>
					</Card>

					{/* Media */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">Media</h3>
						<div className="flex gap-4">
							{product.images.map((image) => (
								<div key={image.id} className="relative group">
									<img
										src={image.url}
										alt={image.alt}
										className="w-24 h-24 object-cover rounded-lg border border-border"
									/>
								</div>
							))}
							<button
								type="button"
								className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
							>
								<span className="text-2xl">+</span>
							</button>
						</div>
					</Card>

					{/* Pricing */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">Pricing</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="price">Price</Label>
								<div className="relative mt-1.5">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
						<Separator className="my-4" />
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="cost">Cost per item</Label>
								<div className="relative mt-1.5">
									<span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
						</div>
					</Card>

					{/* Inventory */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">Inventory</h3>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
								<Input id="sku" defaultValue={product.sku} className="mt-1.5" />
							</div>
							<div>
								<Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
								<Input
									id="barcode"
									defaultValue={product.barcode ?? ""}
									className="mt-1.5"
								/>
							</div>
						</div>
						<div className="mt-4">
							<Label htmlFor="quantity">Quantity</Label>
							<Input
								id="quantity"
								type="number"
								defaultValue={product.inventory}
								className="mt-1.5 w-32"
							/>
						</div>
					</Card>

					{/* Variants */}
					{product.variants.length > 0 && (
						<Card className="p-5">
							<h3 className="font-medium mb-4">Variants</h3>
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
						</Card>
					)}
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-6">
					{/* Status */}
					<Card className="p-5">
						<h3 className="font-medium mb-3">Status</h3>
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
					</Card>

					{/* Product organization */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">Product organization</h3>
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
						</div>
					</Card>
				</div>
			</div>

			{/* Save bar */}
			<div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-card border-t border-border p-4">
				<div className="max-w-5xl mx-auto flex justify-end gap-3">
					<Button variant="outline">Discard</Button>
					<Button>Save</Button>
				</div>
			</div>
		</div>
	);
}

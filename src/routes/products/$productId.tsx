import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MoreHorizontal, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "./-components/CategorySelector";
import { StatusSelector } from "./-components/StatusSelector";
import { useProduct } from "./-hooks/useProducts";

export const Route = createFileRoute("/products/$productId")({
	component: ProductDetailPage,
});

function ProductDetailPage() {
	const { t } = useTranslation();
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
						<StatusBadge status={product.status} />
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
					{/* Title, Description & Media */}
					<Card>
						<CardContent className="pt-6 space-y-4">
							<div className="space-y-4">
								<div>
									<Label htmlFor="title">{t("products.new.name")}</Label>
									<Input
										id="title"
										defaultValue={product.title}
										className="mt-1.5 bg-muted/40 border-border/50 shadow-none focus:bg-background transition-colors"
									/>
								</div>
								<div>
									<Label htmlFor="description">
										{t("products.new.description")}
									</Label>
									<Textarea
										id="description"
										defaultValue={product.description}
										className="mt-1.5 min-h-[150px] bg-muted/40 border-border/50 shadow-none focus:bg-background transition-colors"
									/>
								</div>
							</div>

							<div className="pt-4 mt-4 border-t">
								<Label className="text-base font-medium mb-3 block">
									{t("products.new.media")}
								</Label>
								<div className="grid grid-cols-4 gap-3">
									{product.images.map((image) => (
										<div
											key={image.id}
											className="relative group aspect-square"
										>
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
							</div>

							<div className="pt-4 mt-4 border-t">
								<Label
									htmlFor="category"
									className="text-base font-medium mb-3 block"
								>
									{t("products.new.category")}
								</Label>
								<CategorySelector value={product.category} />
							</div>
						</CardContent>
					</Card>

					{/* Pricing */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">
								{t("products.new.pricing")}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="price">{t("products.new.price")}</Label>
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
									<Label htmlFor="compareAt">
										{t("products.new.compareAtPrice")}
									</Label>
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
						</CardContent>
					</Card>

					{/* Inventory */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-medium">
									{t("products.new.inventory")}
								</CardTitle>
								<div className="flex items-center gap-2">
									<Label
										htmlFor="track-inventory"
										className="text-sm font-normal text-muted-foreground"
									>
										{t("products.new.trackQuantity")}
									</Label>
									<Switch id="track-inventory" defaultChecked />
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="sku">{t("products.new.sku")}</Label>
									<Input
										id="sku"
										defaultValue={product.sku}
										className="mt-1.5"
									/>
								</div>
								<div>
									<Label htmlFor="barcode">{t("products.new.barcode")}</Label>
									<Input
										id="barcode"
										defaultValue={product.barcode ?? ""}
										className="mt-1.5"
									/>
								</div>
							</div>
							<div className="mt-4">
								<Label htmlFor="quantity">{t("products.new.quantity")}</Label>
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
								<CardTitle className="text-base font-medium">
									{t("products.detail.variants")}
								</CardTitle>
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
						<CardContent className="p-3">
							<Label className="text-sm font-medium mb-1.5 block">
								{t("products.new.status")}
							</Label>
							<StatusSelector value={product.status} />
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Sticky bottom save bar */}
			<div className="sticky bottom-0 -mx-6 mt-6 bg-card border-t border-border p-4">
				<div className="flex justify-end gap-3">
					<Button variant="outline">{t("common.cancel")}</Button>
					<Button>{t("common.save")}</Button>
				</div>
			</div>
		</div>
	);
}

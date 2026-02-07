import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Info, Plus, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CategorySelector } from "./-components/CategorySelector";
import { StatusSelector } from "./-components/StatusSelector";
import { useCategories } from "./-hooks/useCategories";

export const Route = createFileRoute("/products/new")({
	component: NewProductPage,
});

function NewProductPage() {
	const { t } = useTranslation();
	const { data: categories = [], isLoading: categoriesLoading } =
		useCategories();
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
				<h1 className="text-xl font-semibold">{t("products.new.title")}</h1>
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
										placeholder={t("products.new.namePlaceholder")}
										className="mt-1.5 bg-muted/40 border-border/50 shadow-none focus:bg-background transition-colors"
									/>
								</div>
								<div>
									<Label htmlFor="description">
										{t("products.new.description")}
									</Label>
									<Textarea
										id="description"
										placeholder={t("products.new.descriptionPlaceholder")}
										className="mt-1.5 min-h-[150px] bg-muted/40 border-border/50 shadow-none focus:bg-background transition-colors"
									/>
								</div>
							</div>

							<div className="pt-4 mt-4 border-t">
								<Label className="text-base font-medium mb-3 block">
									{t("products.new.media")}
								</Label>
								<div className="grid grid-cols-4 gap-3">
									{/* Placeholder image slots */}
									<div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted transition-colors">
										<div className="text-center p-2">
											<Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
											<span className="text-xs text-muted-foreground">
												{t("products.new.uploadImages")}
											</span>
										</div>
									</div>
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
								<CategorySelector
									categories={categories}
									isLoading={categoriesLoading}
								/>
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
											placeholder="0.00"
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
											placeholder="0.00"
											className="pl-12"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Shipping */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-medium">
									Shipping
								</CardTitle>
								<div className="flex items-center gap-2">
									<Label
										htmlFor="physical-product"
										className="text-sm font-normal text-muted-foreground"
									>
										Physical product
									</Label>
									<Switch id="physical-product" defaultChecked />
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<Label htmlFor="weight">Weight</Label>
									<div className="flex gap-2 mt-1.5">
										<Input
											id="weight"
											type="number"
											placeholder="0.0"
											className="flex-1"
										/>
										<Select defaultValue="kg">
											<SelectTrigger className="w-20">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="kg">kg</SelectItem>
												<SelectItem value="g">g</SelectItem>
												<SelectItem value="lb">lb</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Customization */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-medium">
									{t("products.new.customization")}
								</CardTitle>
								<div className="flex items-center gap-2">
									<Label
										htmlFor="allow-personalization"
										className="text-sm font-normal text-muted-foreground"
									>
										{t("products.new.allowPersonalization")}
									</Label>
									<Switch id="allow-personalization" />
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div>
								<Label htmlFor="customization-instructions">
									{t("products.new.customizationInstructions")}
								</Label>
								<Textarea
									id="customization-instructions"
									placeholder={t("products.new.customizationPlaceholder")}
									className="mt-1.5 min-h-[100px] bg-muted/40 border-border/50 shadow-none focus:bg-background transition-colors"
								/>
								<p className="text-sm text-muted-foreground mt-2">
									{t("products.new.customizationHint")}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-4">
					{/* Status */}
					<Card>
						<CardContent className="pt-4 pb-4">
							<Label className="text-sm font-medium mb-1.5 block">
								{t("products.new.status")}
							</Label>
							<StatusSelector />
						</CardContent>
					</Card>

					{/* Inventory */}
					<Card>
						<CardContent className="pt-4 space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Label
										htmlFor="track-inventory"
										className="text-sm font-medium"
									>
										{t("products.new.trackQuantity")}
									</Label>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info className="h-4 w-4 text-muted-foreground cursor-help" />
										</TooltipTrigger>
										<TooltipContent side="top" className="max-w-[250px]">
											{t("products.new.trackQuantityTooltip")}
										</TooltipContent>
									</Tooltip>
								</div>
								<Switch id="track-inventory" defaultChecked />
							</div>

							<div>
								<Label htmlFor="quantity">{t("products.new.quantity")}</Label>
								<Input
									id="quantity"
									type="number"
									placeholder="0"
									className="mt-1.5"
								/>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<Label htmlFor="sku">{t("products.new.sku")}</Label>
									<Input id="sku" placeholder="SKU-001" className="mt-1.5" />
								</div>
								<div>
									<Label htmlFor="barcode">{t("products.new.barcode")}</Label>
									<Input id="barcode" placeholder="" className="mt-1.5" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Sticky bottom save bar */}
			<div className="sticky bottom-0 -mx-6 mt-6 bg-card border-t border-border p-4">
				<div className="flex justify-end gap-3">
					<Link to="/products">
						<Button variant="outline">{t("common.cancel")}</Button>
					</Link>
					<Button>{t("products.new.saveProduct")}</Button>
				</div>
			</div>
		</div>
	);
}

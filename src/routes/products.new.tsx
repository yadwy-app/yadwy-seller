import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Upload, Plus, ImageIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/products/new")({
	component: NewProductPage,
});

function NewProductPage() {
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
				<h1 className="text-xl font-semibold">Add product</h1>
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
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
										placeholder="Short sleeve t-shirt"
										className="mt-1.5"
									/>
								</div>
								<div>
									<Label htmlFor="description">Description</Label>
									<Textarea
										id="description"
										placeholder="Add a detailed description of your product..."
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
								{/* Placeholder image slots */}
								<div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 flex items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted transition-colors">
									<div className="text-center p-2">
										<Upload className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
										<span className="text-xs text-muted-foreground">Add file</span>
									</div>
								</div>
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
											placeholder="0.00"
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
											placeholder="0.00"
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
												placeholder="0.00"
												className="pl-12"
											/>
										</div>
									</div>
									<div className="flex items-end pb-2">
										<div className="flex gap-4 text-sm">
											<span className="text-muted-foreground">Profit: <span className="text-green-600 font-medium">--</span></span>
											<span className="text-muted-foreground">Margin: <span className="text-green-600 font-medium">--</span></span>
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
									<Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
									<Input id="sku" placeholder="SKU-001" className="mt-1.5" />
								</div>
								<div>
									<Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN)</Label>
									<Input id="barcode" placeholder="" className="mt-1.5" />
								</div>
							</div>
							<div className="mt-4">
								<Label htmlFor="quantity">Quantity</Label>
								<Input
									id="quantity"
									type="number"
									placeholder="0"
									className="mt-1.5 w-32"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Shipping */}
					<Card>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base font-medium">Shipping</CardTitle>
								<div className="flex items-center gap-2">
									<Label htmlFor="physical-product" className="text-sm font-normal text-muted-foreground">
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
										<Input id="weight" type="number" placeholder="0.0" className="flex-1" />
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
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-4">
					{/* Status */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base font-medium">Status</CardTitle>
						</CardHeader>
						<CardContent>
							<Select defaultValue="draft">
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="draft">Draft</SelectItem>
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
										placeholder="Search or create category"
										className="mt-1.5"
									/>
								</div>
								<div>
									<Label htmlFor="vendor">Vendor</Label>
									<Input
										id="vendor"
										placeholder="e.g., Your Store Name"
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
				<div className="max-w-6xl flex justify-end gap-3">
					<Link to="/products">
						<Button variant="outline">Discard</Button>
					</Link>
					<Button>Save</Button>
				</div>
			</div>
		</div>
	);
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/products/new")({
	component: NewProductPage,
});

function NewProductPage() {
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
				<h1 className="text-xl font-semibold">Add product</h1>
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
									placeholder="Short sleeve t-shirt"
									className="mt-1.5"
								/>
							</div>
							<div>
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Add a detailed description of your product..."
									className="mt-1.5 min-h-[120px]"
								/>
							</div>
						</div>
					</Card>

					{/* Media */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">Media</h3>
						<div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
							<p className="text-muted-foreground mb-2">
								Drag and drop images here, or click to browse
							</p>
							<Button variant="outline" size="sm">
								Add images
							</Button>
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
										placeholder="0.00"
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
										placeholder="0.00"
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
										placeholder="0.00"
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
								<Input id="sku" placeholder="SKU-001" className="mt-1.5" />
							</div>
							<div>
								<Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
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
					</Card>

					{/* Variants */}
					<Card className="p-5">
						<h3 className="font-medium mb-2">Variants</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Add options like size or color
						</p>
						<Button variant="outline" size="sm">
							+ Add options like size or color
						</Button>
					</Card>
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-6">
					{/* Status */}
					<Card className="p-5">
						<h3 className="font-medium mb-3">Status</h3>
						<Select defaultValue="draft">
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
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
									placeholder="e.g., Kitchen & Dining"
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
						</div>
					</Card>
				</div>
			</div>

			{/* Save bar */}
			<div className="fixed bottom-0 left-0 right-0 lg:left-56 bg-card border-t border-border p-4">
				<div className="max-w-5xl mx-auto flex justify-end gap-3">
					<Link to="/products">
						<Button variant="outline">Discard</Button>
					</Link>
					<Button>Save product</Button>
				</div>
			</div>
		</div>
	);
}

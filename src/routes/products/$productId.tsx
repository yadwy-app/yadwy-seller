import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useProduct } from "./-hooks/useProducts";

export const Route = createFileRoute("/products/$productId")({
	component: ProductDetailPage,
});

function ProductDetailPage() {
	const { i18n } = useTranslation();
	const { productId } = Route.useParams();
	const { data: product, isLoading } = useProduct(productId);

	if (isLoading) {
		return (
			<div className="p-8">
				<div className="flex items-center gap-4 mb-6">
					<Link to="/products">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="w-4 h-4" />
						</Button>
					</Link>
					<h1 className="text-2xl font-semibold">Loading...</h1>
				</div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="p-8">
				<div className="flex items-center gap-4 mb-6">
					<Link to="/products">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="w-4 h-4" />
						</Button>
					</Link>
					<h1 className="text-2xl font-semibold">Product not found</h1>
				</div>
			</div>
		);
	}

	const productName =
		i18n.language === "ar" ? product.name.ar : product.name.en;
	const productDescription =
		i18n.language === "ar" ? product.description.ar : product.description.en;

	return (
		<div className="p-8">
			<div className="flex items-center gap-4 mb-6">
				<Link to="/products">
					<Button variant="ghost" size="icon">
						<ArrowLeft className="w-4 h-4" />
					</Button>
				</Link>
				<div className="flex-1">
					<h1 className="text-2xl font-semibold">{productName}</h1>
					<p className="text-muted-foreground mt-1">{productDescription}</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-6">
					<div className="bg-card rounded-lg border p-6">
						<h2 className="text-lg font-semibold mb-4">Product Information</h2>
						<div className="space-y-4">
							<div>
								<p className="text-sm text-muted-foreground">Name (English)</p>
								<p className="font-medium">{product.name.en}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Name (Arabic)</p>
								<p className="font-medium">{product.name.ar}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Price</p>
								<p className="font-medium">{product.price} EGP</p>
							</div>
							{product.compareAtPrice && (
								<div>
									<p className="text-sm text-muted-foreground">
										Compare at Price
									</p>
									<p className="font-medium">{product.compareAtPrice} EGP</p>
								</div>
							)}
							<div>
								<p className="text-sm text-muted-foreground">Stock</p>
								<p className="font-medium">{product.stock} units</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Status</p>
								<p className="font-medium">
									{product.visible ? "Active" : "Draft"}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					{product.images.length > 0 && (
						<div className="bg-card rounded-lg border p-6">
							<h2 className="text-lg font-semibold mb-4">Images</h2>
							<div className="grid grid-cols-2 gap-4">
								{product.images.map((image) => (
									<img
										key={image}
										src={image}
										alt={productName}
										className="w-full h-40 object-cover rounded-lg"
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="mt-6 p-4 bg-muted rounded-lg">
				<p className="text-sm text-muted-foreground text-center">
					Full product editing functionality coming soon
				</p>
			</div>
		</div>
	);
}

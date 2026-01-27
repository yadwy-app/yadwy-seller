import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { ProductTable } from "@/components/products";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks";

export const Route = createFileRoute("/products/")({
	component: ProductsPage,
});

function ProductsPage() {
	const { data: products, isLoading } = useProducts();

	return (
		<div className="max-w-5xl">
			<PageHeader
				title="Products"
				actions={
					<Link to="/products/new">
						<Button>
							<Plus className="w-4 h-4 mr-2" />
							Add product
						</Button>
					</Link>
				}
			/>

			<ProductTable products={products ?? []} isLoading={isLoading} />
		</div>
	)
}

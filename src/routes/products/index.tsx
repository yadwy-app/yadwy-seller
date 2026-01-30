import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ProductTable } from "./-components/ProductTable";
import { useProducts } from "./-hooks/useProducts";

export const Route = createFileRoute("/products/")({
	component: ProductsPage,
});

function ProductsPage() {
	const { t } = useTranslation();
	const { data: products, isLoading } = useProducts();

	return (
		<div>
			<PageHeader
				title={t("products.title")}
				actions={
					<Link to="/products/new">
						<Button>
							<Plus className="w-4 h-4 mr-2" />
							{t("products.addProduct")}
						</Button>
					</Link>
				}
			/>

			<ProductTable products={products ?? []} isLoading={isLoading} />
		</div>
	);
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DataTableWrapper } from "@/components/ui/DataTableWrapper";
import { ProductTable } from "./-components/ProductTable";
import { useProducts } from "./-hooks/useProducts";

export const Route = createFileRoute("/products/")({
	component: ProductsPage,
});

function ProductsPage() {
	const { t } = useTranslation();
	const { data: products, isLoading } = useProducts();
	const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

	// Placeholder Toolbar matching Orders page visual style
	const Toolbar = (
		<div className="flex items-center justify-between w-full h-12">
			<div className="flex items-center gap-6">
				<button
					type="button"
					className="text-sm font-medium border-b-2 border-primary h-12 px-1"
				>
					All
				</button>
				<button
					type="button"
					className="text-sm text-muted-foreground hover:text-foreground h-12 px-1"
				>
					Active
				</button>
				<button
					type="button"
					className="text-sm text-muted-foreground hover:text-foreground h-12 px-1"
				>
					Draft
				</button>
				<button
					type="button"
					className="text-sm text-muted-foreground hover:text-foreground h-12 px-1"
				>
					Archived
				</button>
			</div>
			<div className="flex items-center gap-1">
				<Button variant="ghost" size="icon" className="h-9 w-9">
					<Search className="w-4 h-4" />
				</Button>
				<Button variant="ghost" size="icon" className="h-9 w-9">
					<Filter className="w-4 h-4" />
				</Button>
				<Button variant="ghost" size="icon" className="h-9 w-9">
					<SlidersHorizontal className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);

	return (
		<div>
			<PageHeader
				title={t("products.title")}
				actions={
					<Link to="/products/new">
						<Button size="sm">
							<Plus className="w-4 h-4 mr-2" />
							{t("products.addProduct")}
						</Button>
					</Link>
				}
			/>

			<DataTableWrapper toolbar={Toolbar}>
				<ProductTable
					products={products ?? []}
					isLoading={isLoading}
					selectedProducts={selectedProducts}
					onSelectionChange={setSelectedProducts}
				/>
			</DataTableWrapper>
		</div>
	);
}

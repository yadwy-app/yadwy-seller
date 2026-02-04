import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ProductResponseDto } from "@/services/products/types";

interface ProductTableProps {
	products: ProductResponseDto[];
	isLoading?: boolean;
	selectedProducts?: number[];
	onSelectionChange?: (ids: number[]) => void;
}

export function ProductTable({
	products,
	isLoading,
	selectedProducts = [],
	onSelectionChange,
}: ProductTableProps) {
	const { i18n } = useTranslation();

	if (isLoading) {
		return (
			<div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
				Loading products...
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
				No products found. Create your first product to get started.
			</div>
		);
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-EG", {
			style: "currency",
			currency: "EGP",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const isAllSelected =
		products.length > 0 && selectedProducts.length === products.length;
	const isSomeSelected =
		selectedProducts.length > 0 && selectedProducts.length < products.length;

	const handleSelectAll = () => {
		if (onSelectionChange) {
			if (isAllSelected) {
				onSelectionChange([]);
			} else {
				onSelectionChange(products.map((p) => p.id));
			}
		}
	};

	const handleSelectProduct = (productId: number) => {
		if (onSelectionChange) {
			if (selectedProducts.includes(productId)) {
				onSelectionChange(selectedProducts.filter((id) => id !== productId));
			} else {
				onSelectionChange([...selectedProducts, productId]);
			}
		}
	};

	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-muted/50 bg-muted/50 border-b border-border h-9">
					<TableHead className="w-10 py-2">
						<Checkbox
							checked={isAllSelected}
							indeterminate={isSomeSelected}
							onCheckedChange={handleSelectAll}
							aria-label="Select all products"
						/>
					</TableHead>
					<TableHead className="w-12 py-2" />
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Product
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Status
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Inventory
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Category
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs text-right py-2">
						Price
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => {
					const productName =
						i18n.language === "ar" ? product.name.ar : product.name.en;
					return (
						<TableRow
							key={product.id}
							className="cursor-pointer hover:bg-muted/50"
							data-selected={selectedProducts.includes(product.id)}
						>
							<TableCell className="w-10">
								<Checkbox
									checked={selectedProducts.includes(product.id)}
									onCheckedChange={() => handleSelectProduct(product.id)}
									aria-label={`Select product ${productName}`}
									onClick={(e) => e.stopPropagation()}
								/>
							</TableCell>
							<TableCell className="w-12">
								{product.images[0] ? (
									<img
										src={product.images[0]}
										alt={productName}
										className="w-10 h-10 rounded object-cover"
									/>
								) : (
									<div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
										No img
									</div>
								)}
							</TableCell>
							<TableCell>
								<Link
									to="/products/$productId"
									params={{ productId: product.id.toString() }}
									className="font-medium text-foreground hover:underline"
									onClick={(e) => e.stopPropagation()}
								>
									{productName}
								</Link>
							</TableCell>
							<TableCell>
								<span
									className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
										product.visible
											? "bg-green-50 text-green-700"
											: "bg-gray-50 text-gray-700"
									}`}
								>
									{product.visible ? "Active" : "Draft"}
								</span>
							</TableCell>
							<TableCell>
								<span
									className={product.stock < 10 ? "text-status-warning" : ""}
								>
									{product.stock} in stock
								</span>
							</TableCell>
							<TableCell className="text-muted-foreground">
								Category {product.categoryId}
							</TableCell>
							<TableCell className="text-right font-medium">
								{formatCurrency(product.price)}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

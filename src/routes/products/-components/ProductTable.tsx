import { Link } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types";

interface ProductTableProps {
	products: Product[];
	isLoading?: boolean;
	selectedProducts?: string[];
	onSelectionChange?: (ids: string[]) => void;
}

export function ProductTable({
	products,
	isLoading,
	selectedProducts = [],
	onSelectionChange,
}: ProductTableProps) {
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

	const handleSelectProduct = (productId: string) => {
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
				{products.map((product) => (
					<TableRow
						key={product.id}
						className="cursor-pointer hover:bg-muted/50"
						data-selected={selectedProducts.includes(product.id)}
					>
						<TableCell className="w-10">
							<Checkbox
								checked={selectedProducts.includes(product.id)}
								onCheckedChange={() => handleSelectProduct(product.id)}
								aria-label={`Select product ${product.title}`}
								onClick={(e) => e.stopPropagation()}
							/>
						</TableCell>
						<TableCell className="w-12">
							{product.images[0] ? (
								<img
									src={product.images[0].url}
									alt={product.images[0].alt}
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
								params={{ productId: product.id }}
								className="font-medium text-foreground hover:underline"
								onClick={(e) => e.stopPropagation()}
							>
								{product.title}
							</Link>
						</TableCell>
						<TableCell>
							<StatusBadge status={product.status} />
						</TableCell>
						<TableCell>
							<span
								className={product.inventory < 10 ? "text-status-warning" : ""}
							>
								{product.inventory} in stock
							</span>
						</TableCell>
						<TableCell className="text-muted-foreground">
							{product.category}
						</TableCell>
						<TableCell className="text-right font-medium">
							{formatCurrency(product.price)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

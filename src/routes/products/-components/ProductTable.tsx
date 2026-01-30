import { Link } from "@tanstack/react-router";
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
}

export function ProductTable({ products, isLoading }: ProductTableProps) {
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

	return (
		<div className="bg-card rounded-lg border border-border overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead className="w-12" />
						<TableHead>Product</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Inventory</TableHead>
						<TableHead>Category</TableHead>
						<TableHead className="text-right">Price</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.id} className="cursor-pointer">
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
								>
									{product.title}
								</Link>
							</TableCell>
							<TableCell>
								<StatusBadge status={product.status} type="product" />
							</TableCell>
							<TableCell>
								<span
									className={
										product.inventory < 10 ? "text-status-warning" : ""
									}
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
		</div>
	);
}

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
import type { Order } from "@/types";

interface OrderTableProps {
	orders: Order[];
	isLoading?: boolean;
}

export function OrderTable({ orders, isLoading }: OrderTableProps) {
	if (isLoading) {
		return (
			<div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
				Loading orders...
			</div>
		);
	}

	if (orders.length === 0) {
		return (
			<div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
				No orders found.
			</div>
		);
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-EG", {
			style: "currency",
			currency: "EGP",
			minimumFractionDigits: 2,
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date
			.toLocaleDateString("en-US", {
				weekday: "long",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})
			.replace(",", " at");
	};

	return (
		<div className="bg-card rounded-lg border border-border overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead>Order</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Customer</TableHead>
						<TableHead>Channel</TableHead>
						<TableHead className="text-right">Total</TableHead>
						<TableHead>Payment status</TableHead>
						<TableHead>Fulfillment status</TableHead>
						<TableHead>Items</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id} className="cursor-pointer">
							<TableCell>
								<Link
									to="/orders/$orderId"
									params={{ orderId: order.id }}
									className="font-medium text-foreground hover:underline"
								>
									{order.orderNumber}
								</Link>
							</TableCell>
							<TableCell className="text-muted-foreground text-sm">
								{formatDate(order.createdAt)}
							</TableCell>
							<TableCell>{order.customer.name}</TableCell>
							<TableCell className="text-muted-foreground">
								{order.channel}
							</TableCell>
							<TableCell className="text-right font-medium">
								{formatCurrency(order.total)}
							</TableCell>
							<TableCell>
								<StatusBadge status={order.paymentStatus} type="payment" />
							</TableCell>
							<TableCell>
								<StatusBadge
									status={order.fulfillmentStatus}
									type="fulfillment"
								/>
							</TableCell>
							<TableCell className="text-muted-foreground">
								{order.items.reduce((sum, item) => sum + item.quantity, 0)} item
								{order.items.reduce((sum, item) => sum + item.quantity, 0) !== 1
									? "s"
									: ""}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

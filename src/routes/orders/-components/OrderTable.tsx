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
import type { Order } from "@/services/orders";

interface OrderTableProps {
	orders: Order[];
	isLoading?: boolean;
}

export function OrderTable({ orders, isLoading }: OrderTableProps) {
	if (isLoading || orders.length === 0) {
		return null;
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
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead>Order</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead className="text-right">Total</TableHead>
					<TableHead>Payment status</TableHead>
					<TableHead>Fulfillment status</TableHead>
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
						<TableCell>{order.customerName}</TableCell>
						<TableCell className="text-right font-medium">
							{formatCurrency(order.totalAmount)}
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
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

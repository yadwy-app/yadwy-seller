import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
import type { SellerOrder } from "@/services/orders";

interface OrderTableProps {
	orders: SellerOrder[];
	isLoading?: boolean;
	selectedOrders?: number[];
	onSelectionChange?: (ids: number[]) => void;
}

export function OrderTable({
	orders,
	isLoading,
	selectedOrders = [],
	onSelectionChange,
}: OrderTableProps) {
	const { i18n } = useTranslation();
	const navigate = useNavigate();

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
		const now = new Date();
		const isToday = date.toDateString() === now.toDateString();
		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		const isYesterday = date.toDateString() === yesterday.toDateString();

		if (isToday) {
			return `Today at ${date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})}`;
		}
		if (isYesterday) {
			return `Yesterday at ${date.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			})}`;
		}
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	// Get localized product name based on current language
	const getProductName = (order: SellerOrder): string => {
		const lang = i18n.language === "ar" ? "ar" : "en";
		if (order.lines.length === 0) return "-";
		if (order.lines.length === 1) {
			return order.lines[0].productName[lang];
		}
		return `${order.lines[0].productName[lang]} +${order.lines.length - 1}`;
	};

	// Map backend status to fulfillment status for badge
	const mapStatusToFulfillment = (status: SellerOrder["status"]) => {
		switch (status) {
			case "RECEIVED":
				return "unfulfilled";
			case "CONFIRMED":
				return "in_progress";
			case "SHIPPED":
				return "in_progress";
			case "DELIVERED":
				return "fulfilled";
			case "CANCELLED":
				return "on_hold";
			default:
				return "unfulfilled";
		}
	};

	const isAllSelected =
		orders.length > 0 && selectedOrders.length === orders.length;
	const isSomeSelected =
		selectedOrders.length > 0 && selectedOrders.length < orders.length;

	const handleSelectAll = () => {
		if (onSelectionChange) {
			if (isAllSelected) {
				onSelectionChange([]);
			} else {
				onSelectionChange(orders.map((o) => o.id));
			}
		}
	};

	const handleSelectOrder = (orderId: number) => {
		if (onSelectionChange) {
			if (selectedOrders.includes(orderId)) {
				onSelectionChange(selectedOrders.filter((id) => id !== orderId));
			} else {
				onSelectionChange([...selectedOrders, orderId]);
			}
		}
	};

	const handleRowClick = (orderId: number) => {
		navigate({ to: "/orders/$orderId", params: { orderId: String(orderId) } });
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
							aria-label="Select all orders"
						/>
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Order
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Date
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Items
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs py-2">
						Status
					</TableHead>
					<TableHead className="font-medium text-muted-foreground text-xs text-right py-2">
						Total
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow
						key={order.id}
						className="cursor-pointer hover:bg-muted/50"
						data-selected={selectedOrders.includes(order.id)}
						onClick={() => handleRowClick(order.id)}
					>
						<TableCell className="w-10">
							<Checkbox
								checked={selectedOrders.includes(order.id)}
								onCheckedChange={() => handleSelectOrder(order.id)}
								aria-label={`Select order ${order.orderId}`}
								onClick={(e) => e.stopPropagation()}
							/>
						</TableCell>
						<TableCell>
							<Link
								to="/orders/$orderId"
								params={{ orderId: String(order.id) }}
								className="font-medium text-primary hover:underline"
								onClick={(e) => e.stopPropagation()}
							>
								#{order.orderId}
							</Link>
						</TableCell>
						<TableCell className="text-muted-foreground text-sm">
							{formatDate(order.createdAt)}
						</TableCell>
						<TableCell>
							<div className="flex flex-col">
								<span className="text-sm">{getProductName(order)}</span>
								<span className="text-xs text-muted-foreground">
									{order.lines.reduce((sum, line) => sum + line.quantity, 0)}{" "}
									{order.lines.reduce((sum, line) => sum + line.quantity, 0) ===
									1
										? "item"
										: "items"}
								</span>
							</div>
						</TableCell>
						<TableCell>
							<StatusBadge
								status={mapStatusToFulfillment(order.status)}
								type="fulfillment"
							/>
						</TableCell>
						<TableCell className="text-right font-medium">
							{formatCurrency(order.total)}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

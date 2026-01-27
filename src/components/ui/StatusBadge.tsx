import { Badge } from "@/components/ui/badge";
import type { FulfillmentStatus, PaymentStatus, ProductStatus } from "@/types";

interface StatusBadgeProps {
	status: ProductStatus | PaymentStatus | FulfillmentStatus;
	type?: "product" | "payment" | "fulfillment";
}

const statusConfig: Record<
	string,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
		dotColor: string;
	}
> = {
	// Product statuses
	active: {
		label: "Active",
		variant: "default",
		dotColor: "bg-status-success",
	},
	draft: {
		label: "Draft",
		variant: "secondary",
		dotColor: "bg-muted-foreground",
	},
	archived: {
		label: "Archived",
		variant: "outline",
		dotColor: "bg-muted-foreground",
	},
	// Payment statuses
	paid: { label: "Paid", variant: "default", dotColor: "bg-status-success" },
	pending: {
		label: "Payment pending",
		variant: "outline",
		dotColor: "bg-status-warning",
	},
	refunded: {
		label: "Refunded",
		variant: "secondary",
		dotColor: "bg-muted-foreground",
	},
	partially_refunded: {
		label: "Partially refunded",
		variant: "secondary",
		dotColor: "bg-status-warning",
	},
	// Fulfillment statuses
	fulfilled: {
		label: "Fulfilled",
		variant: "default",
		dotColor: "bg-status-success",
	},
	unfulfilled: {
		label: "Unfulfilled",
		variant: "outline",
		dotColor: "bg-status-warning",
	},
	partially_fulfilled: {
		label: "Partially fulfilled",
		variant: "outline",
		dotColor: "bg-status-warning",
	},
	on_hold: {
		label: "On hold",
		variant: "outline",
		dotColor: "bg-status-warning",
	},
	in_progress: {
		label: "In progress",
		variant: "outline",
		dotColor: "bg-status-info",
	},
};

export function StatusBadge({ status }: StatusBadgeProps) {
	const config = statusConfig[status] || {
		label: status,
		variant: "outline" as const,
		dotColor: "bg-muted-foreground",
	};

	return (
		<Badge variant={config.variant} className="font-normal gap-1.5">
			<span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
			{config.label}
		</Badge>
	);
}

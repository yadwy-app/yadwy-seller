import { cva, type VariantProps } from "class-variance-authority";
import {
	AlertCircle,
	CheckCircle2,
	Circle,
	Clock,
	XCircle,
} from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";
import type { SellerOrderStatus } from "@/services/orders/types";
import type { FulfillmentStatus, PaymentStatus, ProductStatus } from "@/types";

// 1. Define the visual intents (Shopify-like standard system)
const statusBadgeVariants = cva(
	"inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border h-6 whitespace-nowrap gap-1.5",
	{
		variants: {
			intent: {
				success:
					"border-green-200 bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800",
				warning:
					"border-yellow-200 bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-800",
				critical:
					"border-red-200 bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800",
				info: "border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100/80 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-800",
				neutral:
					"border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-100/80 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700",
				outline:
					"text-foreground border-border hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-6 px-2.5",
				sm: "h-5 px-2 text-[10px]",
				lg: "h-7 px-3 text-sm",
			},
		},
		defaultVariants: {
			intent: "neutral",
			size: "default",
		},
	},
);

// 2. Define the prop interface
export interface StatusBadgeProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof statusBadgeVariants> {
	status:
		| ProductStatus
		| PaymentStatus
		| FulfillmentStatus
		| SellerOrderStatus
		| string; // Allow string for flexibility but prefer types
	showIcon?: boolean;
}

// 3. Configuration mapping status strings to intents and labels
interface StatusConfig {
	intent: VariantProps<typeof statusBadgeVariants>["intent"];
	label: string;
	icon?: React.ElementType;
}

const getStatusConfig = (status: string): StatusConfig => {
	// Normalize status to lowercase for matching
	const normalizedStatus = status.toLowerCase();

	const map: Record<string, StatusConfig> = {
		// Product Statuses
		active: { intent: "success", label: "Active", icon: CheckCircle2 },
		draft: { intent: "neutral", label: "Draft", icon: Circle },
		archived: { intent: "neutral", label: "Archived", icon: Circle },

		// Payment Statuses
		paid: { intent: "success", label: "Paid", icon: CheckCircle2 },
		pending: { intent: "warning", label: "Payment Pending", icon: Clock },
		refunded: { intent: "neutral", label: "Refunded", icon: ArrowLeftCircle },
		partially_refunded: {
			intent: "warning",
			label: "Partially Refunded",
			icon: AlertCircle,
		},
		failed: { intent: "critical", label: "Payment Failed", icon: XCircle },

		// Fulfillment Statuses
		fulfilled: { intent: "success", label: "Fulfilled", icon: CheckCircle2 },
		unfulfilled: { intent: "warning", label: "Unfulfilled", icon: Circle },
		partially_fulfilled: {
			intent: "warning",
			label: "Partially Fulfilled",
			icon: Clock,
		},
		on_hold: { intent: "critical", label: "On Hold", icon: AlertCircle },
		in_progress: { intent: "info", label: "In Progress", icon: Clock },
		in_transit: { intent: "info", label: "In Transit", icon: Clock },
		delivered: { intent: "success", label: "Delivered", icon: CheckCircle2 },

		// Seller Order Statuses (Backend)
		received: { intent: "warning", label: "Received", icon: Circle },
		confirmed: { intent: "info", label: "Confirmed", icon: CheckCircle2 },
		shipped: { intent: "info", label: "Shipped", icon: Clock },
		cancelled: { intent: "critical", label: "Cancelled", icon: XCircle },
	};

	// Default fallback
	return (
		map[normalizedStatus] || {
			intent: "neutral",
			label:
				status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " "),
			icon: Circle,
		}
	);
};

// Helper icon component for Refunded since it's not in the main import list above to keep it clean
const ArrowLeftCircle = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		role="img"
		aria-label="Arrow Left Circle"
		{...props}
	>
		<title>Arrow Left Circle</title>
		<circle cx="12" cy="12" r="10" />
		<path d="M16 12H8" />
		<path d="m12 8-4 4 4 4" />
	</svg>
);

export function StatusBadge({
	className,
	status,
	intent,
	showIcon = true,
	...props
}: StatusBadgeProps) {
	const config = getStatusConfig(status);
	const finalIntent = intent || config.intent;
	const Icon = config.icon || Circle;

	return (
		<span
			className={cn(statusBadgeVariants({ intent: finalIntent }), className)}
			{...props}
		>
			{showIcon && <Icon className="h-3 w-3" />}
			{config.label}
		</span>
	);
}

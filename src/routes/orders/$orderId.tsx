import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Package } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Separator } from "@/components/ui/separator";
import type { SellerOrder } from "@/services/orders";
import { useOrder } from "./-hooks/useOrders";

export const Route = createFileRoute("/orders/$orderId")({
	component: OrderDetailPage,
});

function OrderDetailPage() {
	const { t, i18n } = useTranslation();
	const { orderId } = Route.useParams();
	const { data: order, isLoading } = useOrder(orderId);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-EG", {
			style: "currency",
			currency: "EGP",
			minimumFractionDigits: 2,
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	// Get localized product name based on current language
	const getLocalizedName = (name: { ar: string; en: string }): string => {
		return i18n.language === "ar" ? name.ar : name.en;
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

	// Get status display text
	const getStatusText = (status: SellerOrder["status"]) => {
		switch (status) {
			case "RECEIVED":
				return "Received";
			case "CONFIRMED":
				return "Confirmed";
			case "SHIPPED":
				return "Shipped";
			case "DELIVERED":
				return "Delivered";
			case "CANCELLED":
				return "Cancelled";
			default:
				return status;
		}
	};

	if (isLoading) {
		return (
			<div>
				<div className="animate-pulse">
					<div className="h-8 bg-muted rounded w-48 mb-6" />
					<div className="h-64 bg-muted rounded" />
				</div>
			</div>
		);
	}

	if (!order) {
		return (
			<div>
				<h1 className="text-xl font-semibold mb-4">{t("orders.noOrders")}</h1>
				<p className="text-muted-foreground">
					{t("orders.noOrdersDescription")}
				</p>
				<Link
					to="/orders"
					className="text-primary hover:underline mt-4 inline-block"
				>
					← {t("orders.detail.backToOrders")}
				</Link>
			</div>
		);
	}

	const totalItems = order.lines.reduce((sum, line) => sum + line.quantity, 0);

	return (
		<div>
			{/* Header */}
			<div className="flex items-center gap-4 mb-6">
				<Link
					to="/orders"
					className="p-2 hover:bg-accent rounded-md transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<div className="flex-1">
					<div className="flex items-center gap-3">
						<h1 className="text-xl font-semibold">Order #{order.orderId}</h1>
						<StatusBadge
							status={mapStatusToFulfillment(order.status)}
							type="fulfillment"
						/>
					</div>
					<p className="text-sm text-muted-foreground mt-1">
						{formatDate(order.createdAt)}
					</p>
				</div>
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main content - 2 columns */}
				<div className="lg:col-span-2 space-y-6">
					{/* Order Status Card */}
					<Card className="p-5">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<Package className="w-5 h-5 text-primary" />
								<span className="font-medium">
									{getStatusText(order.status)}
								</span>
							</div>
							<span className="text-sm text-muted-foreground">
								Seller Order #{order.id}
							</span>
						</div>

						{/* Order Items */}
						<div className="space-y-3">
							{order.lines.map((line) => (
								<div key={line.productId} className="flex items-center gap-4">
									<div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
										<Package className="w-6 h-6" />
									</div>
									<div className="flex-1">
										<p className="font-medium text-sm">
											{getLocalizedName(line.productName)}
										</p>
										<p className="text-xs text-muted-foreground">
											Product ID: {line.productId}
										</p>
									</div>
									<div className="text-right text-sm">
										<p>
											{formatCurrency(line.unitPrice)} × {line.quantity}
										</p>
										<p className="font-medium">
											{formatCurrency(line.subtotal)}
										</p>
									</div>
								</div>
							))}
						</div>

						{order.status === "RECEIVED" && (
							<div className="mt-4 flex gap-2">
								<Button>Confirm Order</Button>
								<Button variant="outline">Cancel Order</Button>
							</div>
						)}

						{order.status === "CONFIRMED" && (
							<div className="mt-4">
								<Button>Mark as Shipped</Button>
							</div>
						)}

						{order.status === "SHIPPED" && (
							<div className="mt-4">
								<Button>Mark as Delivered</Button>
							</div>
						)}
					</Card>

					{/* Payment Summary Card */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">{t("orders.detail.summary")}</h3>

						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("orders.detail.subtotal")} ({totalItems} item
									{totalItems !== 1 ? "s" : ""})
								</span>
								<span>{formatCurrency(order.subtotal)}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("orders.detail.shipping")}
								</span>
								<span>{formatCurrency(order.shippingFee)}</span>
							</div>
							<Separator className="my-2" />
							<div className="flex justify-between font-semibold">
								<span>{t("orders.detail.total")}</span>
								<span>{formatCurrency(order.total)}</span>
							</div>
						</div>
					</Card>
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-6">
					{/* Order Info */}
					<Card className="p-5">
						<h3 className="font-medium mb-3">Order Information</h3>
						<div className="space-y-3 text-sm">
							<div>
								<span className="text-muted-foreground">Order ID:</span>
								<span className="ml-2 font-medium">#{order.orderId}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Seller Order ID:</span>
								<span className="ml-2 font-medium">#{order.id}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Created:</span>
								<span className="ml-2">{formatDate(order.createdAt)}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Last Updated:</span>
								<span className="ml-2">{formatDate(order.updatedAt)}</span>
							</div>
						</div>
					</Card>

					{/* Status History */}
					<Card className="p-5">
						<h3 className="font-medium mb-3">Status</h3>
						<div className="flex items-center gap-2">
							<StatusBadge
								status={mapStatusToFulfillment(order.status)}
								type="fulfillment"
							/>
							<span className="text-sm text-muted-foreground">
								{getStatusText(order.status)}
							</span>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}

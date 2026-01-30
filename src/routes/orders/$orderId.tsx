import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	Mail,
	MapPin,
	MoreHorizontal,
	Package,
	Phone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { OrderTimeline } from "./-components/OrderTimeline";
import { useOrder } from "./-hooks/useOrders";

export const Route = createFileRoute("/orders/$orderId")({
	component: OrderDetailPage,
});

function OrderDetailPage() {
	const { t } = useTranslation();
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
						<h1 className="text-xl font-semibold">{order.orderNumber}</h1>
						<StatusBadge status={order.paymentStatus} type="payment" />
						<StatusBadge status={order.fulfillmentStatus} type="fulfillment" />
					</div>
					<p className="text-sm text-muted-foreground mt-1">
						{formatDate(order.createdAt)} from {order.channel}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline">Restock</Button>
					<Button variant="outline">Return</Button>
					<Button variant="outline">{t("common.edit")}</Button>
					<Button variant="outline">Print</Button>
					<Button variant="outline">
						{t("orders.detail.moreActions")}
						<MoreHorizontal className="w-4 h-4 ml-2" />
					</Button>
				</div>
			</div>

			{/* Two-column layout */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main content - 2 columns */}
				<div className="lg:col-span-2 space-y-6">
					{/* Fulfillment Card */}
					<Card className="p-5">
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center gap-2">
								<Package className="w-5 h-5 text-status-success" />
								<span className="font-medium">
									{order.fulfillmentStatus === "fulfilled"
										? t("orders.status.fulfilled")
										: t("orders.status.unfulfilled")}
								</span>
							</div>
							<span className="text-sm text-muted-foreground">
								#{order.orderNumber.replace("#", "")}-F1
							</span>
						</div>

						{order.fulfillmentStatus === "fulfilled" && (
							<p className="text-sm text-muted-foreground mb-4">
								📦 {formatDate(order.updatedAt).split(" at")[0]}
							</p>
						)}

						{/* Order Items */}
						<div className="space-y-3">
							{order.items.map((item) => (
								<div key={item.id} className="flex items-center gap-4">
									{item.image ? (
										<img
											src={item.image}
											alt={item.title}
											className="w-12 h-12 rounded object-cover border border-border"
										/>
									) : (
										<div className="w-12 h-12 rounded bg-muted flex items-center justify-center text-muted-foreground text-xs">
											No img
										</div>
									)}
									<div className="flex-1">
										<p className="font-medium text-sm">{item.title}</p>
										<p className="text-xs text-muted-foreground">{item.sku}</p>
									</div>
									<div className="text-right text-sm">
										<p>
											{formatCurrency(item.price)} × {item.quantity}
										</p>
										<p className="font-medium">
											{formatCurrency(item.price * item.quantity)}
										</p>
									</div>
								</div>
							))}
						</div>

						{order.fulfillmentStatus !== "fulfilled" && (
							<div className="mt-4">
								<Button className="bg-primary">+ Add tracking</Button>
							</div>
						)}
					</Card>

					{/* Payment Card */}
					<Card className="p-5">
						<div className="flex items-center gap-2 mb-4">
							<StatusBadge status={order.paymentStatus} type="payment" />
						</div>

						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("orders.detail.subtotal")}
								</span>
								<span>
									{order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
									item
									{order.items.reduce((sum, item) => sum + item.quantity, 0) !==
									1
										? "s"
										: ""}
								</span>
								<span>{formatCurrency(order.subtotal)}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("orders.detail.shipping")}
								</span>
								<span className="text-muted-foreground">Standard</span>
								<span>{formatCurrency(order.shipping)}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Taxes</span>
								<span className="text-muted-foreground">GST 14%</span>
								<span>{formatCurrency(order.tax)}</span>
							</div>
							<Separator className="my-2" />
							<div className="flex justify-between font-semibold">
								<span>{t("orders.detail.total")}</span>
								<span></span>
								<span>{formatCurrency(order.total)}</span>
							</div>
						</div>

						<Separator className="my-4" />

						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">
									{t("orders.status.paid")}
								</span>
								<span>
									{formatCurrency(
										order.paymentStatus === "paid" ? order.total : 0,
									)}
								</span>
							</div>
							<div className="flex justify-between font-semibold">
								<span>Balance</span>
								<span>
									{formatCurrency(
										order.paymentStatus === "paid" ? 0 : order.total,
									)}
								</span>
							</div>
						</div>

						{order.paymentStatus === "pending" && (
							<div className="flex gap-2 mt-4 justify-end">
								<Button variant="outline">Send invoice</Button>
								<Button>Mark as paid</Button>
							</div>
						)}
					</Card>

					{/* Timeline */}
					<Card className="p-5">
						<h3 className="font-medium mb-4">{t("orders.detail.timeline")}</h3>

						{/* Comment input */}
						<div className="flex gap-3 mb-6 p-3 bg-muted/50 rounded-lg">
							<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
								{order.customer.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</div>
							<input
								type="text"
								placeholder="Leave a comment..."
								className="flex-1 bg-transparent text-sm outline-none"
							/>
						</div>

						<OrderTimeline events={order.timeline} />
					</Card>
				</div>

				{/* Sidebar - 1 column */}
				<div className="space-y-6">
					{/* Notes */}
					<Card className="p-5">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-medium">Notes</h3>
							<Button variant="ghost" size="icon" className="h-6 w-6">
								<span className="text-muted-foreground">✏️</span>
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">
							{order.notes || "No notes from customer"}
						</p>
					</Card>

					{/* Customer */}
					<Card className="p-5">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-medium">{t("orders.detail.customer")}</h3>
							<span className="text-xs text-muted-foreground">×</span>
						</div>
						<div className="space-y-3">
							<div>
								<button
									type="button"
									className="text-sm text-primary hover:underline"
								>
									{order.customer.name}
								</button>
								<p className="text-xs text-muted-foreground">
									{order.customer.ordersCount} order
									{order.customer.ordersCount !== 1 ? "s" : ""}
								</p>
							</div>

							<div>
								<h4 className="text-xs font-medium text-muted-foreground mb-1">
									{t("orders.detail.contactInfo")}
								</h4>
								<div className="space-y-1">
									<a
										href={`mailto:${order.customer.email}`}
										className="flex items-center gap-2 text-sm text-primary hover:underline"
									>
										<Mail className="w-3 h-3" />
										{order.customer.email}
									</a>
									{order.customer.phone && (
										<p className="flex items-center gap-2 text-sm text-muted-foreground">
											<Phone className="w-3 h-3" />
											{order.customer.phone}
										</p>
									)}
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between mb-1">
									<h4 className="text-xs font-medium text-muted-foreground">
										{t("orders.detail.shippingAddress")}
									</h4>
									<Button variant="ghost" size="icon" className="h-5 w-5">
										<span className="text-xs text-muted-foreground">✏️</span>
									</Button>
								</div>
								<div className="text-sm space-y-0.5">
									<p>{order.shippingAddress.name}</p>
									<p className="text-muted-foreground">
										{order.shippingAddress.address1}
									</p>
									{order.shippingAddress.address2 && (
										<p className="text-muted-foreground">
											{order.shippingAddress.address2}
										</p>
									)}
									<p className="text-muted-foreground">
										{order.shippingAddress.city}
									</p>
									<p className="text-muted-foreground">
										{order.shippingAddress.zip}
									</p>
									<p className="text-muted-foreground">
										{order.shippingAddress.country}
									</p>
									<a
										href={`https://maps.google.com/?q=${encodeURIComponent(
											`${order.shippingAddress.address1}, ${order.shippingAddress.city}`,
										)}`}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary text-xs hover:underline flex items-center gap-1"
									>
										<MapPin className="w-3 h-3" />
										View map
									</a>
								</div>
							</div>

							<div>
								<h4 className="text-xs font-medium text-muted-foreground mb-1">
									Billing address
								</h4>
								<p className="text-sm text-muted-foreground">
									{order.billingAddress
										? order.billingAddress.address1
										: "Same as shipping address"}
								</p>
							</div>
						</div>
					</Card>

					{/* Tags */}
					<Card className="p-5">
						<div className="flex items-center justify-between mb-3">
							<h3 className="font-medium">Tags</h3>
							<Button variant="ghost" size="icon" className="h-6 w-6">
								<span className="text-muted-foreground">✏️</span>
							</Button>
						</div>
						{order.tags.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{order.tags.map((tag) => (
									<span
										key={tag}
										className="px-2 py-1 bg-muted rounded text-xs font-medium"
									>
										{tag}
									</span>
								))}
							</div>
						) : (
							<p className="text-sm text-muted-foreground">No tags</p>
						)}
					</Card>
				</div>
			</div>
		</div>
	);
}

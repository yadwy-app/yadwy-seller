import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { OrderTable } from "@/components/orders";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOrders } from "@/hooks";

export const Route = createFileRoute("/orders/")({
	component: OrdersPage,
});

type FilterTab = "all" | "unfulfilled" | "unpaid" | "open" | "archived";

function OrdersPage() {
	const { data: orders, isLoading } = useOrders();
	const [activeTab, setActiveTab] = useState<FilterTab>("all");

	const filteredOrders = orders?.filter((order) => {
		switch (activeTab) {
			case "unfulfilled":
				return (
					order.fulfillmentStatus === "unfulfilled" ||
					order.fulfillmentStatus === "in_progress"
				)
			case "unpaid":
				return order.paymentStatus === "pending";
			case "open":
				return (
					order.fulfillmentStatus !== "fulfilled" ||
					order.paymentStatus !== "paid"
				)
			case "archived":
				return false; // No archived orders in mock data
			default:
				return true
		}
	})

	return (
		<div className="max-w-6xl">
			<PageHeader
				title="Orders"
				actions={
					<div className="flex items-center gap-2">
						<Button variant="outline">
							<Download className="w-4 h-4 mr-2" />
							Export
						</Button>
						<Button variant="outline">
							More actions
							<MoreHorizontal className="w-4 h-4 ml-2" />
						</Button>
						<Button>
							<Plus className="w-4 h-4 mr-2" />
							Create order
						</Button>
					</div>
				}
			/>

			{/* Filter Tabs */}
			<div className="mb-4">
				<Tabs
					value={activeTab}
					onValueChange={(value) => setActiveTab(value as FilterTab)}
				>
					<TabsList className="bg-transparent p-0 h-auto gap-1">
						<TabsTrigger
							value="all"
							className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
						>
							All
						</TabsTrigger>
						<TabsTrigger
							value="unfulfilled"
							className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
						>
							Unfulfilled
						</TabsTrigger>
						<TabsTrigger
							value="unpaid"
							className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
						>
							Unpaid
						</TabsTrigger>
						<TabsTrigger
							value="open"
							className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
						>
							Open
						</TabsTrigger>
						<TabsTrigger
							value="archived"
							className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
						>
							Archived
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>

			<OrderTable orders={filteredOrders ?? []} isLoading={isLoading} />

			{/* Help link */}
			<div className="mt-6 text-center">
				<a
					href="#"
					className="text-sm text-muted-foreground hover:text-foreground"
				>
					Learn more about orders
				</a>
			</div>
		</div>
	)
}

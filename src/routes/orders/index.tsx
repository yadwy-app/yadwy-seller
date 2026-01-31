import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/LoadingSpinner";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrdersEmptyState } from "./-components/OrdersEmptyState";
import { OrderTable } from "./-components/OrderTable";
import { useOrders } from "./-hooks/useOrders";

export const Route = createFileRoute("/orders/")({
	component: OrdersPage,
});

type FilterTab = "all" | "unfulfilled" | "unpaid" | "open" | "archived";

function OrdersPage() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<FilterTab>("all");
	const [page, setPage] = useState(0);
	const [size] = useState(10);

	const { data, isLoading, error } = useOrders({
		page,
		size,
		sort: "createdAt,desc",
	});

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	// Simple logic: if we have orders, show them. Otherwise show empty state.
	const orders = data?.content || [];
	const hasOrders = orders.length > 0;

	return (
		<div>
			<PageHeader
				title={t("orders.title")}
				actions={
					hasOrders && (
						<Button variant="outline">
							<Download className="w-4 h-4 mr-2" />
							{t("common.export")}
						</Button>
					)
				}
			/>

			{/* Loading State */}
			{isLoading && <LoadingState text={t("common.loading")} />}

			{/* Error State */}
			{!isLoading && error && (
				<div className="bg-card rounded-lg border border-destructive/50 p-12 text-center">
					<div className="flex flex-col items-center gap-3">
						<div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
							<span className="text-3xl">⚠️</span>
						</div>
						<h3 className="text-lg font-semibold">Failed to load orders</h3>
						<p className="text-muted-foreground text-sm">
							{error instanceof Error ? error.message : "An error occurred"}
						</p>
					</div>
				</div>
			)}

			{/* Empty State */}
			{!isLoading && !error && !hasOrders && <OrdersEmptyState />}

			{/* Orders with data */}
			{!isLoading && !error && hasOrders && (
				<>
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
									{t("orders.tabs.all")}
								</TabsTrigger>
								<TabsTrigger
									value="unfulfilled"
									className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
								>
									{t("orders.tabs.unfulfilled")}
								</TabsTrigger>
								<TabsTrigger
									value="unpaid"
									className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
								>
									{t("orders.tabs.unpaid")}
								</TabsTrigger>
								<TabsTrigger
									value="open"
									className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
								>
									{t("orders.tabs.open")}
								</TabsTrigger>
								<TabsTrigger
									value="archived"
									className="data-[state=active]:bg-accent data-[state=active]:shadow-none rounded-md px-3 py-1.5 text-sm"
								>
									{t("orders.tabs.archived")}
								</TabsTrigger>
							</TabsList>
						</Tabs>
					</div>

					{/* Orders Table with Pagination */}
					<div className="bg-card rounded-lg border border-border overflow-hidden">
						<OrderTable orders={orders} isLoading={false} />
						{data && (
							<Pagination
								currentPage={data.page}
								totalPages={data.totalPages}
								onPageChange={handlePageChange}
								isFirst={data.first}
								isLast={data.last}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

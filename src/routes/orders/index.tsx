import { createFileRoute } from "@tanstack/react-router";
import {
	Download,
	Filter,
	Loader2,
	Plus,
	Search,
	SlidersHorizontal,
	X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/LoadingSpinner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrdersEmptyState } from "./-components/OrdersEmptyState";
import { OrderTable } from "./-components/OrderTable";
import { useOrders } from "./-hooks/useOrders";

export const Route = createFileRoute("/orders/")({
	component: OrdersPage,
});

type FilterTab = "all" | "received" | "confirmed" | "shipped" | "delivered";

function OrdersPage() {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<FilterTab>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useOrders();

	// Auto-load more when scrolling near bottom
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1, rootMargin: "100px" },
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Focus search input when opened
	useEffect(() => {
		if (isSearchOpen && searchInputRef.current) {
			searchInputRef.current.focus();
		}
	}, [isSearchOpen]);

	// Flatten all pages into a single array
	const orders = useMemo(() => {
		return data?.pages.flat() ?? [];
	}, [data]);

	// Filter orders based on active tab and search
	const filteredOrders = useMemo(() => {
		return orders.filter((order) => {
			// Filter by tab
			if (activeTab !== "all" && order.status.toLowerCase() !== activeTab) {
				return false;
			}
			// Filter by search (customer name or phone number)
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				const customerName = (order.customerName || "").toLowerCase();
				const customerPhone = (order.customerPhone || "").toLowerCase();
				return customerName.includes(query) || customerPhone.includes(query);
			}
			return true;
		});
	}, [orders, activeTab, searchQuery]);

	const hasOrders = orders.length > 0;

	const handleSearchToggle = () => {
		if (isSearchOpen) {
			setSearchQuery("");
			setIsSearchOpen(false);
		} else {
			setIsSearchOpen(true);
		}
	};

	return (
		<div>
			<PageHeader
				title={t("orders.title")}
				actions={
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm">
							<Download className="w-4 h-4 mr-2" />
							{t("common.export")}
						</Button>
						<Button size="sm">
							<Plus className="w-4 h-4 mr-2" />
							Create order
						</Button>
					</div>
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
				<div className="bg-card rounded-lg border border-border overflow-hidden">
					{/* Single row: Tabs on left, action icons on right */}
					<div className="flex items-center justify-between border-b border-border min-h-12">
						<Tabs
							value={activeTab}
							onValueChange={(value) => setActiveTab(value as FilterTab)}
						>
							<TabsList variant="line" className="px-4 gap-0 h-12">
								<TabsTrigger
									value="all"
									className="px-3 py-3 text-sm data-[state=active]:font-medium"
								>
									All
								</TabsTrigger>
								<TabsTrigger
									value="received"
									className="px-3 py-3 text-sm data-[state=active]:font-medium"
								>
									Received
								</TabsTrigger>
								<TabsTrigger
									value="confirmed"
									className="px-3 py-3 text-sm data-[state=active]:font-medium"
								>
									Confirmed
								</TabsTrigger>
								<TabsTrigger
									value="shipped"
									className="px-3 py-3 text-sm data-[state=active]:font-medium"
								>
									Shipped
								</TabsTrigger>
								<TabsTrigger
									value="delivered"
									className="px-3 py-3 text-sm data-[state=active]:font-medium"
								>
									Delivered
								</TabsTrigger>
							</TabsList>
						</Tabs>

						{/* Action icons on the right */}
						<div className="flex items-center gap-1 px-3">
							{isSearchOpen ? (
								<div className="flex items-center gap-1">
									<Input
										ref={searchInputRef}
										placeholder="Search by customer name or phone..."
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="h-8 w-64"
									/>
									<Button
										variant="ghost"
										size="icon"
										className="h-9 w-9"
										onClick={handleSearchToggle}
									>
										<X className="w-4 h-4" />
									</Button>
								</div>
							) : (
								<Button
									variant="ghost"
									size="icon"
									className="h-9 w-9"
									onClick={handleSearchToggle}
								>
									<Search className="w-4 h-4" />
								</Button>
							)}
							<Button variant="ghost" size="icon" className="h-9 w-9">
								<Filter className="w-4 h-4" />
							</Button>
							<Button variant="ghost" size="icon" className="h-9 w-9">
								<SlidersHorizontal className="w-4 h-4" />
							</Button>
						</div>
					</div>

					{/* Orders Table */}
					<OrderTable
						orders={filteredOrders}
						isLoading={false}
						selectedOrders={selectedOrders}
						onSelectionChange={setSelectedOrders}
					/>

					{filteredOrders.length === 0 && (
						<div className="p-8 text-center text-muted-foreground">
							{searchQuery
								? `No orders found for "${searchQuery}"`
								: "No orders with this status"}
						</div>
					)}

					{/* Infinite scroll trigger */}
					{activeTab === "all" && !searchQuery && (
						<div ref={loadMoreRef} className="p-4 border-t border-border">
							{isFetchingNextPage && (
								<div className="flex items-center justify-center gap-2 text-muted-foreground">
									<Loader2 className="w-4 h-4 animate-spin" />
									<span className="text-sm">Loading more orders...</span>
								</div>
							)}
							{!hasNextPage && orders.length > 0 && (
								<p className="text-center text-sm text-muted-foreground">
									Showing all {orders.length} orders
								</p>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	Clock,
	Package,
	ShoppingCart,
	TrendingUp,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStats } from "./orders/-hooks/useOrders";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const { t } = useTranslation();
	const { data: stats, isLoading } = useDashboardStats();

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-EG", {
			style: "currency",
			currency: "EGP",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">
					{t("dashboard.title")}
				</h1>
				<p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("dashboard.totalOrders")}
						</CardTitle>
						<ShoppingCart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : (stats?.totalOrders ?? 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							{t("dashboard.fromLastMonth", { percent: 12 })}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("dashboard.totalRevenue")}
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : formatCurrency(stats?.totalRevenue ?? 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							{t("dashboard.fromLastMonth", { percent: 8 })}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("dashboard.products")}
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : (stats?.totalProducts ?? 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							{t("dashboard.activeListings")}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							{t("dashboard.pending")}
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : (stats?.pendingPayments ?? 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							{t("dashboard.awaitingPayment")}
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Action Cards */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">
							{t("dashboard.ordersToFulfill")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<p className="text-3xl font-bold">
								{stats?.ordersToFulfill ?? 0}
							</p>
							<Link to="/orders">
								<Button variant="outline" size="sm">
									{t("dashboard.viewOrders")}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">
							{t("dashboard.paymentsToCapture")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<p className="text-3xl font-bold">
								{stats?.pendingPayments ?? 0}
							</p>
							<Link to="/orders">
								<Button variant="outline" size="sm">
									{t("dashboard.viewPayments")}
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>{t("dashboard.quickActions")}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						<Link to="/products/new">
							<Button variant="outline">
								<Package className="mr-2 h-4 w-4" />
								{t("dashboard.addProduct")}
							</Button>
						</Link>
						<Link to="/orders">
							<Button variant="outline">
								<ShoppingCart className="mr-2 h-4 w-4" />
								{t("dashboard.viewOrders")}
							</Button>
						</Link>
						<Link to="/products">
							<Button variant="outline">
								<Package className="mr-2 h-4 w-4" />
								{t("dashboard.manageProducts")}
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

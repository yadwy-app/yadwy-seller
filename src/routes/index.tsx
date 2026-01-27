import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ShoppingCart, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { useDashboardStats } from "@/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
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
				<h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome back! Here's what's happening with your store.
				</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Orders</CardTitle>
						<ShoppingCart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : stats?.totalOrders ?? 0}
						</div>
						<p className="text-xs text-muted-foreground">
							+12% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : formatCurrency(stats?.totalRevenue ?? 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							+8% from last month
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Products</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : stats?.totalProducts ?? 0}
						</div>
						<p className="text-xs text-muted-foreground">
							Active listings
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Pending</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{isLoading ? "—" : stats?.pendingPayments ?? 0}
						</div>
						<p className="text-xs text-muted-foreground">
							Awaiting payment
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Action Cards */}
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Orders to fulfill</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<p className="text-3xl font-bold">{stats?.ordersToFulfill ?? 0}</p>
							<Link to="/orders">
								<Button variant="outline" size="sm">
									View orders
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Payments to capture</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<p className="text-3xl font-bold">{stats?.pendingPayments ?? 0}</p>
							<Link to="/orders">
								<Button variant="outline" size="sm">
									View payments
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
					<CardTitle>Quick actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						<Link to="/products/new">
							<Button variant="outline">
								<Package className="mr-2 h-4 w-4" />
								Add product
							</Button>
						</Link>
						<Link to="/orders">
							<Button variant="outline">
								<ShoppingCart className="mr-2 h-4 w-4" />
								View orders
							</Button>
						</Link>
						<Link to="/products">
							<Button variant="outline">
								<Package className="mr-2 h-4 w-4" />
								Manage products
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

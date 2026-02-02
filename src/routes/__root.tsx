import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Navigate,
	Outlet,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { DashboardLayout } from "@/components/layout";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { AuthProvider, useAuth } from "@/contexts";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import appCss from "@/styles.css?url";
import "@/i18n";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Yadwy Seller Dashboard",
			},
			{
				name: "description",
				content: "Manage your products, orders, and store on Yadwy",
			},
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/yadwy-logo.svg",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootComponent,
});

// Routes that don't need the dashboard layout or authentication
const publicRoutes = ["/login", "/signup"];

function RootComponent() {
	const matches = useMatches();
	const currentPath = matches[matches.length - 1]?.pathname || "/";
	const isPublicRoute = publicRoutes.includes(currentPath);

	return (
		<RootDocument>
			<AuthProvider>
				{isPublicRoute ? (
					<Outlet />
				) : (
					<AuthGuard>
						<AuthenticatedLayout>
							<Outlet />
						</AuthenticatedLayout>
					</AuthGuard>
				)}
			</AuthProvider>
		</RootDocument>
	);
}

function AuthGuard({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading } = useAuth();

	// Show spinner while checking auth status
	if (isLoading) {
		return (
			<div className="flex min-h-svh items-center justify-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	// Redirect to login if not authenticated
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
	return <DashboardLayout>{children}</DashboardLayout>;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

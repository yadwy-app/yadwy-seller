import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { DashboardLayout } from "@/components/layout";
import { AuthProvider } from "@/contexts";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import appCss from "@/styles.css?url";

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
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: RootComponent,
});

// Routes that don't need the dashboard layout
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
					<AuthenticatedLayout>
						<Outlet />
					</AuthenticatedLayout>
				)}
			</AuthProvider>
		</RootDocument>
	);
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

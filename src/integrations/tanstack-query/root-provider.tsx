import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Stale time of 5 minutes
				staleTime: 5 * 60 * 1000,
				// Cache time of 10 minutes
				gcTime: 10 * 60 * 1000,
				// Retry failed requests 3 times
				retry: 3,
				// Refetch on window focus only if data is stale
				refetchOnWindowFocus: "always",
			},
			mutations: {
				// Retry failed mutations once
				retry: 1,
			},
		},
	});
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

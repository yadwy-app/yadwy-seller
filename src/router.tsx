import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { createQueryClient } from "./integrations/tanstack-query/root-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create QueryClient once at module level
const queryClient = createQueryClient();

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {
			queryClient,
		},
		defaultPreload: "intent",
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
};

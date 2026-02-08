import { serve } from "srvx/node";
import app from "./dist/server/server.js";

serve({
	fetch: app.fetch,
	port: process.env.PORT || 3001,
	host: "0.0.0.0",
});

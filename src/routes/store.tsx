import { createFileRoute } from "@tanstack/react-router";
import { Globe, Palette, Settings, Store as StoreIcon } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/store")({
	component: StorePage,
});

function StorePage() {
	return (
		<div className="max-w-5xl">
			<PageHeader
				title="Store"
				subtitle="Manage your store settings and appearance"
			/>

			<div className="bg-card rounded-lg border border-border p-8 text-center">
				<StoreIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
				<h2 className="text-lg font-semibold mb-2">
					Store settings coming soon
				</h2>
				<p className="text-muted-foreground max-w-md mx-auto">
					This section will allow you to customize your store appearance, manage
					settings, and configure your storefront.
				</p>
			</div>

			{/* Placeholder cards for future features */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
				<Card className="p-5 opacity-50">
					<div className="flex items-center gap-3 mb-3">
						<Settings className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-medium">General Settings</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Store name, contact info, and business details
					</p>
				</Card>

				<Card className="p-5 opacity-50">
					<div className="flex items-center gap-3 mb-3">
						<Palette className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-medium">Appearance</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Customize your store's look and feel
					</p>
				</Card>

				<Card className="p-5 opacity-50">
					<div className="flex items-center gap-3 mb-3">
						<Globe className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-medium">Domains</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						Manage custom domains and URLs
					</p>
				</Card>
			</div>
		</div>
	);
}

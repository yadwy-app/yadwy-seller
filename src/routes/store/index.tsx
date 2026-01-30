import { createFileRoute } from "@tanstack/react-router";
import { Globe, Palette, Settings, Store as StoreIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@/components/layout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/store/")({
	component: StorePage,
});

function StorePage() {
	const { t } = useTranslation();

	return (
		<div>
			<PageHeader title={t("store.title")} subtitle={t("store.subtitle")} />

			<div className="bg-card rounded-lg border border-border p-8 text-center">
				<StoreIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
				<h2 className="text-lg font-semibold mb-2">{t("store.comingSoon")}</h2>
				<p className="text-muted-foreground max-w-md mx-auto">
					{t("store.comingSoonDescription")}
				</p>
			</div>

			{/* Placeholder cards for future features */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
				<Card className="p-5 opacity-50">
					<div className="flex items-center gap-3 mb-3">
						<Settings className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-medium">{t("store.generalSettings")}</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						{t("store.generalSettingsDescription")}
					</p>
				</Card>

				<Card className="p-5 opacity-50">
					<div className="flex items-center gap-3 mb-3">
						<Palette className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-medium">{t("store.appearance")}</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						{t("store.appearanceDescription")}
					</p>
				</Card>

				<Card className="p-5 opacity-50">
					<div className="flex items-center gap-3 mb-3">
						<Globe className="w-5 h-5 text-muted-foreground" />
						<h3 className="font-medium">{t("store.domains")}</h3>
					</div>
					<p className="text-sm text-muted-foreground">
						{t("store.domainsDescription")}
					</p>
				</Card>
			</div>
		</div>
	);
}

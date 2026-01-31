import { Package } from "lucide-react";
import { useTranslation } from "react-i18next";

export function OrdersEmptyState() {
	const { t } = useTranslation();

	return (
		<div className="bg-card rounded-lg border border-border p-16">
			<div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
				{/* Icon with gradient background */}
				<div className="relative mb-8">
					<div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
						<div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
							<Package className="w-10 h-10 text-primary" strokeWidth={1.5} />
						</div>
					</div>
				</div>

				{/* Title */}
				<h3 className="text-2xl font-semibold mb-3">
					{t("orders.empty.title")}
				</h3>

				{/* Description */}
				<p className="text-muted-foreground text-base mb-8 leading-relaxed">
					{t("orders.empty.description")}
				</p>

				{/* Info Card */}
				<div className="w-full bg-muted/30 rounded-lg p-6 text-left border border-border/50">
					<p className="font-semibold mb-4 text-base flex items-center gap-2">
						<span className="w-1.5 h-1.5 rounded-full bg-primary" />
						{t("orders.empty.infoTitle")}
					</p>
					<ul className="space-y-3 text-muted-foreground">
						<li className="flex items-start gap-3">
							<span className="text-primary mt-1">✓</span>
							<span>{t("orders.empty.info1")}</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-primary mt-1">✓</span>
							<span>{t("orders.empty.info2")}</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="text-primary mt-1">✓</span>
							<span>{t("orders.empty.info3")}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

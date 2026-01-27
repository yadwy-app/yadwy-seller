import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
	label: string;
	value: string | number;
	icon?: ReactNode;
	trend?: {
		value: number;
		isPositive: boolean;
	};
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
	return (
		<Card className="p-5">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm text-muted-foreground mb-1">{label}</p>
					<p className="text-2xl font-semibold text-foreground">{value}</p>
					{trend && (
						<p
							className={`text-xs mt-1 ${
								trend.isPositive ? "text-status-success" : "text-status-error"
							}`}
						>
							{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
						</p>
					)}
				</div>
				{icon && <div className="text-muted-foreground">{icon}</div>}
			</div>
		</Card>
	);
}

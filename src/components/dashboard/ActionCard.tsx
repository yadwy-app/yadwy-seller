import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ActionCardProps {
	icon: ReactNode;
	label: string;
	count?: number;
	to: string;
}

export function ActionCard({ icon, label, count, to }: ActionCardProps) {
	return (
		<Link to={to}>
			<Card className="p-4 hover:bg-accent transition-colors cursor-pointer">
				<div className="flex items-center gap-3">
					<div className="text-muted-foreground">{icon}</div>
					<span className="text-sm font-medium text-foreground">
						{count !== undefined ? `${count} ${label}` : label}
					</span>
				</div>
			</Card>
		</Link>
	);
}

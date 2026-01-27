import type { ReactNode } from "react";

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	actions?: ReactNode;
	backLink?: {
		to: string;
		label: string;
	};
}

export function PageHeader({
	title,
	subtitle,
	actions,
	backLink,
}: PageHeaderProps) {
	return (
		<div className="mb-6">
			{backLink && (
				<a
					href={backLink.to}
					className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2"
				>
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					{backLink.label}
				</a>
			)}
			<div className="flex items-center justify-between gap-4">
				<div>
					<h1 className="text-xl font-semibold text-foreground">{title}</h1>
					{subtitle && (
						<p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
					)}
				</div>
				{actions && <div className="flex items-center gap-2">{actions}</div>}
			</div>
		</div>
	);
}

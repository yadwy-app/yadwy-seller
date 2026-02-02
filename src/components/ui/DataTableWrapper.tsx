import type { ReactNode } from "react";

interface DataTableWrapperProps {
	children: ReactNode;
	toolbar?: ReactNode;
}

export function DataTableWrapper({ children, toolbar }: DataTableWrapperProps) {
	return (
		<div className="bg-card rounded-lg border border-border overflow-hidden">
			{toolbar && (
				<div className="flex items-center justify-between border-b border-border min-h-12 px-4">
					{toolbar}
				</div>
			)}
			{children}
		</div>
	);
}

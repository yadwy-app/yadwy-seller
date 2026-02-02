import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isFirst: boolean;
	isLast: boolean;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	isFirst,
	isLast,
}: PaginationProps) {
	return (
		<div className="flex items-center justify-between px-4 py-3 border-t border-border">
			<div className="text-sm text-muted-foreground">
				Page {currentPage + 1} of {totalPages}
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={isFirst}
				>
					<ChevronLeft className="w-4 h-4" />
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={isLast}
				>
					Next
					<ChevronRight className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
}

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
	text?: string;
}

const sizeClasses = {
	sm: "w-4 h-4 border-2",
	md: "w-8 h-8 border-4",
	lg: "w-12 h-12 border-4",
};

export function LoadingSpinner({
	size = "md",
	className,
	text,
}: LoadingSpinnerProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center gap-3",
				className,
			)}
		>
			<div
				className={cn(
					"border-primary border-t-transparent rounded-full animate-spin",
					sizeClasses[size],
				)}
			/>
			{text && <p className="text-muted-foreground text-sm">{text}</p>}
		</div>
	);
}

interface LoadingStateProps {
	text?: string;
	className?: string;
}

export function LoadingState({ text, className }: LoadingStateProps) {
	return (
		<div
			className={cn(
				"bg-card rounded-lg border border-border p-12 text-center",
				className,
			)}
		>
			<LoadingSpinner size="md" text={text} />
		</div>
	);
}

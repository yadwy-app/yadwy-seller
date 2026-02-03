import { Check, ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const statuses = [
	{
		value: "active",
		label: "Active",
		description: "Sell via selected sales channels and markets",
	},
	{
		value: "draft",
		label: "Draft",
		description: "Not visible on selected sales channels or markets",
	},
];

interface StatusSelectorProps {
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export function StatusSelector({
	value,
	onChange,
	className,
}: StatusSelectorProps) {
	const [open, setOpen] = React.useState(false);
	const [currentValue, setCurrentValue] = React.useState(value || "active");
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

	React.useEffect(() => {
		if (triggerRef.current) {
			setTriggerWidth(triggerRef.current.offsetWidth);
		}
	}, []);

	React.useEffect(() => {
		const handleResize = () => {
			if (triggerRef.current) {
				setTriggerWidth(triggerRef.current.offsetWidth);
			}
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const selectedStatus =
		statuses.find((s) => s.value === currentValue) || statuses[0];

	const handleSelect = (val: string) => {
		setCurrentValue(val);
		onChange?.(val);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					ref={triggerRef}
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-full justify-between bg-background border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9",
						className,
					)}
				>
					{selectedStatus.label}
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="p-0"
				align="start"
				style={{ width: triggerWidth > 0 ? triggerWidth : "auto" }}
			>
				<Command>
					<CommandList>
						<CommandGroup>
							{statuses.map((status) => (
								<CommandItem
									key={status.value}
									value={status.value}
									onSelect={() => handleSelect(status.value)}
									className="flex items-start gap-2 py-2.5 px-3 cursor-pointer"
								>
									<div className="flex flex-col flex-1 gap-0.5 min-w-0">
										<span className="font-medium text-sm leading-none">
											{status.label}
										</span>
										<span className="text-xs text-muted-foreground leading-tight line-clamp-2">
											{status.description}
										</span>
									</div>
									{currentValue === status.value && (
										<Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
									)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

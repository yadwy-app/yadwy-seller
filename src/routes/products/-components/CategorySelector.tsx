import { useSize } from "@radix-ui/react-use-size";
import { ArrowLeft, ChevronDown, ChevronRight, X } from "lucide-react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { CategoryResponseDto } from "@/services/categories/types";

interface CategorySelectorProps {
	value?: string;
	categories?: CategoryResponseDto[];
	isLoading?: boolean;
	onChange?: (categoryId: string, categoryPath: string) => void;
	className?: string;
}

interface CategoryPath {
	id: string;
	name: string;
}

export function CategorySelector({
	value,
	categories = [],
	isLoading = false,
	onChange,
	className,
}: CategorySelectorProps) {
	const { i18n, t } = useTranslation();
	const [open, setOpen] = React.useState(false);
	const [navStack, setNavStack] = React.useState<CategoryResponseDto[]>([]);
	const [selectedCategory, setSelectedCategory] =
		React.useState<CategoryPath | null>(value ? { id: "", name: value } : null);
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	const triggerSize = useSize(triggerRef.current);

	const getLocalizedName = React.useCallback(
		(category: CategoryResponseDto) => {
			return i18n.language === "ar"
				? category.name.ar
				: category.name.en || category.name.ar;
		},
		[i18n.language],
	);

	const findCategoryPath = React.useCallback(
		(
			nodes: CategoryResponseDto[],
			targetId: string,
			path: CategoryResponseDto[] = [],
		): CategoryResponseDto[] | null => {
			for (const node of nodes) {
				const nextPath = [...path, node];
				if (node.id.toString() === targetId) {
					return nextPath;
				}
				if (node.children?.length) {
					const found = findCategoryPath(node.children, targetId, nextPath);
					if (found) return found;
				}
			}
			return null;
		},
		[],
	);

	React.useEffect(() => {
		if (!value) {
			setSelectedCategory(null);
			return;
		}
		const path = findCategoryPath(categories, value);
		if (path && path.length > 0) {
			const leaf = path[path.length - 1];
			setSelectedCategory({
				id: leaf.id.toString(),
				name: getLocalizedName(leaf),
			});
		}
	}, [categories, findCategoryPath, getLocalizedName, value]);

	// Get current categories to display
	const currentCategories =
		navStack.length > 0
			? navStack[navStack.length - 1].children || []
			: categories;

	// Get the current parent name for the back button
	const currentParent =
		navStack.length > 0 ? navStack[navStack.length - 1] : null;

	const handleCategoryClick = (category: CategoryResponseDto) => {
		if (category.children && category.children.length > 0) {
			// Has children - navigate into it
			setNavStack([...navStack, category]);
		} else {
			// Leaf node - select it
			const fullPath = [
				...navStack.map((c) => getLocalizedName(c)),
				getLocalizedName(category),
			].join(" > ");
			setSelectedCategory({
				id: category.id.toString(),
				name: getLocalizedName(category),
			});
			onChange?.(category.id.toString(), fullPath);
			setOpen(false);
			setNavStack([]);
		}
	};

	const handleBack = () => {
		setNavStack(navStack.slice(0, -1));
	};

	const handleClear = () => {
		setSelectedCategory(null);
		onChange?.("", "");
	};

	const resetNavigation = () => {
		setNavStack([]);
	};

	// Build the display path for selected category
	const getDisplayValue = () => {
		if (selectedCategory) {
			return selectedCategory.name;
		}
		if (isLoading) {
			return t("common.loading");
		}
		return t("products.new.selectCategory");
	};

	return (
		<Popover
			open={open}
			onOpenChange={(isOpen) => {
				setOpen(isOpen);
				if (!isOpen) resetNavigation();
			}}
		>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					ref={triggerRef}
					className={cn(
						"w-full justify-between bg-muted/40 font-normal border-border/50 shadow-none hover:bg-accent hover:text-accent-foreground h-9",
						!selectedCategory && "text-muted-foreground",
						className,
					)}
				>
					<span className="truncate">{getDisplayValue()}</span>
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="p-0 min-w-[320px]"
				align="start"
				style={{ width: triggerSize?.width }}
			>
				<div className="flex flex-col">
					{/* Back button header when navigated into subcategories */}
					{navStack.length > 0 && (
						<button
							type="button"
							onClick={handleBack}
							className="flex items-center gap-2 px-3 py-2.5 border-b text-sm font-medium hover:bg-accent transition-colors text-left"
						>
							<ArrowLeft className="h-4 w-4" />
							<span>
								{currentParent ? getLocalizedName(currentParent) : ""}
							</span>
						</button>
					)}

					{/* Category list */}
					<div className="max-h-[280px] overflow-y-auto">
						{currentCategories.map((category) => (
							<button
								key={category.id}
								type="button"
								onClick={() => handleCategoryClick(category)}
								className={cn(
									"flex items-center justify-between w-full px-3 py-2.5 text-sm text-left hover:bg-accent transition-colors",
									selectedCategory?.id === category.id.toString() &&
										"bg-accent",
								)}
							>
								<span>{getLocalizedName(category)}</span>
								{category.children && category.children.length > 0 && (
									<ChevronRight className="h-4 w-4 opacity-50" />
								)}
							</button>
						))}
					</div>

					{/* Selected category display at bottom */}
					{selectedCategory && (
						<div className="border-t">
							<div className="flex items-center justify-between px-3 py-2 bg-muted/30">
								<span className="text-sm font-medium border border-primary/30 rounded-full px-3 py-1">
									{selectedCategory.name}
								</span>
								<button
									type="button"
									onClick={handleClear}
									className="p-1 hover:bg-accent rounded-full transition-colors"
								>
									<X className="h-4 w-4 text-muted-foreground" />
								</button>
							</div>
							<p className="px-3 py-2 text-xs text-muted-foreground border-t">
								Determines tax rates and adds metafields to improve search,
								filters, and cross-channel sales
							</p>
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

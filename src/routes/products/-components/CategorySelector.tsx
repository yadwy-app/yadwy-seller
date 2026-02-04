import { ArrowLeft, ChevronDown, ChevronRight, X } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Category {
	id: string;
	name: string;
	children?: Category[];
}

// Mock data - nested up to 3 levels like Shopify
const CATEGORIES: Category[] = [
	{
		id: "animals",
		name: "Animals & Pet Supplies",
		children: [
			{ id: "pet-food", name: "Pet Food" },
			{ id: "pet-toys", name: "Pet Toys" },
			{ id: "pet-accessories", name: "Pet Accessories" },
		],
	},
	{
		id: "apparel",
		name: "Apparel & Accessories",
		children: [
			{
				id: "clothing",
				name: "Clothing",
				children: [
					{ id: "shirts", name: "Shirts" },
					{ id: "pants", name: "Pants" },
					{ id: "dresses", name: "Dresses" },
					{ id: "outerwear", name: "Outerwear" },
				],
			},
			{
				id: "clothing-accessories",
				name: "Clothing Accessories",
				children: [
					{ id: "belts", name: "Belts" },
					{ id: "hats", name: "Hats" },
					{ id: "scarves", name: "Scarves" },
				],
			},
			{ id: "costumes", name: "Costumes & Accessories" },
			{ id: "handbags", name: "Handbag & Wallet Accessories" },
			{ id: "handbags-wallets", name: "Handbags, Wallets & Cases" },
			{
				id: "jewelry",
				name: "Jewelry",
				children: [
					{ id: "necklaces", name: "Necklaces" },
					{ id: "rings", name: "Rings" },
					{ id: "bracelets", name: "Bracelets" },
					{ id: "earrings", name: "Earrings" },
				],
			},
			{ id: "shoe-accessories", name: "Shoe Accessories" },
			{
				id: "shoes",
				name: "Shoes",
				children: [
					{ id: "sneakers", name: "Sneakers" },
					{ id: "boots", name: "Boots" },
					{ id: "sandals", name: "Sandals" },
					{ id: "heels", name: "Heels" },
				],
			},
		],
	},
	{
		id: "arts",
		name: "Arts & Entertainment",
		children: [
			{ id: "art-supplies", name: "Art Supplies" },
			{ id: "music", name: "Music" },
			{ id: "crafts", name: "Crafts & Hobbies" },
		],
	},
	{
		id: "baby",
		name: "Baby & Toddler",
		children: [
			{ id: "baby-clothing", name: "Baby Clothing" },
			{ id: "baby-toys", name: "Baby Toys" },
			{ id: "nursery", name: "Nursery" },
		],
	},
	{
		id: "business",
		name: "Business & Industrial",
		children: [
			{ id: "office-supplies", name: "Office Supplies" },
			{ id: "industrial-equipment", name: "Industrial Equipment" },
		],
	},
	{
		id: "cameras",
		name: "Cameras & Optics",
		children: [
			{ id: "cameras-photo", name: "Cameras" },
			{ id: "lenses", name: "Lenses" },
			{ id: "binoculars", name: "Binoculars" },
		],
	},
	{
		id: "electronics",
		name: "Electronics",
		children: [
			{
				id: "computers",
				name: "Computers",
				children: [
					{ id: "laptops", name: "Laptops" },
					{ id: "desktops", name: "Desktops" },
					{ id: "tablets", name: "Tablets" },
				],
			},
			{ id: "phones", name: "Mobile Phones" },
			{ id: "audio", name: "Audio Equipment" },
		],
	},
	{
		id: "food",
		name: "Food, Beverages & Tobacco",
		children: [
			{ id: "food-items", name: "Food Items" },
			{ id: "beverages", name: "Beverages" },
		],
	},
];

interface CategorySelectorProps {
	value?: string;
	onChange?: (categoryId: string, categoryPath: string) => void;
	className?: string;
}

interface CategoryPath {
	id: string;
	name: string;
}

export function CategorySelector({
	value,
	onChange,
	className,
}: CategorySelectorProps) {
	const [open, setOpen] = React.useState(false);
	const [navStack, setNavStack] = React.useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] =
		React.useState<CategoryPath | null>(value ? { id: "", name: value } : null);
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

	// Get current categories to display
	const currentCategories =
		navStack.length > 0
			? navStack[navStack.length - 1].children || []
			: CATEGORIES;

	// Get the current parent name for the back button
	const currentParent =
		navStack.length > 0 ? navStack[navStack.length - 1] : null;

	const handleCategoryClick = (category: Category) => {
		if (category.children && category.children.length > 0) {
			// Has children - navigate into it
			setNavStack([...navStack, category]);
		} else {
			// Leaf node - select it
			const fullPath = [...navStack.map((c) => c.name), category.name].join(
				" > ",
			);
			setSelectedCategory({ id: category.id, name: category.name });
			onChange?.(category.id, fullPath);
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
		return "Select category";
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
					ref={triggerRef}
					variant="outline"
					role="combobox"
					aria-expanded={open}
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
				className="p-0"
				align="start"
				style={{ width: Math.max(triggerWidth, 320) }}
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
							<span>{currentParent?.name}</span>
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
									selectedCategory?.id === category.id && "bg-accent",
								)}
							>
								<span>{category.name}</span>
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

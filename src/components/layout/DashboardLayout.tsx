"use client";

import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import {
	Home,
	ShoppingCart,
	Package,
	Store,
	Settings,
	Search,
	Bell,
	ChevronsLeft,
	ChevronsRight,
	LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarInset,
	useSidebar,
} from "@/components/ui/sidebar";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";


const navItems = [
	{ to: "/", icon: Home, label: "Home" },
	{ to: "/orders", icon: ShoppingCart, label: "Orders" },
	{ to: "/products", icon: Package, label: "Products" },
	{ to: "/store", icon: Store, label: "Store" },
];


function CommandSearch() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const navigate = (to: string) => {
		router.navigate({ to });
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="outline"
				className="relative h-9 w-full justify-start rounded-md bg-muted/50 px-4 text-sm text-muted-foreground sm:w-64 lg:w-80"
				onClick={() => setOpen(true)}
			>
				<Search className="mr-2 h-4 w-4" />
				<span className="hidden lg:inline-flex">Search products, orders...</span>
				<span className="inline-flex lg:hidden">Search...</span>
				<kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Navigation">
						{navItems.map((item) => (
							<CommandItem key={item.to} onSelect={() => navigate(item.to)}>
								<item.icon className="mr-2 h-4 w-4" />
								<span>{item.label}</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandGroup heading="Quick Actions">
						<CommandItem onSelect={() => navigate("/products/new")}>
							<Package className="mr-2 h-4 w-4" />
							<span>Create product</span>
						</CommandItem>
						<CommandItem onSelect={() => navigate("/orders")}>
							<ShoppingCart className="mr-2 h-4 w-4" />
							<span>View orders</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}

function UserMenu() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate({ to: "/login" });
	};

	const initials = user?.name
		? user.name
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		: "YS";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user?.avatar} alt={user?.name || "User"} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user?.name || "Seller"}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email || "seller@yadwy.com"}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Settings className="mr-2 h-4 w-4" />
					<span>Settings</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function CollapseButton() {
	const { state, toggleSidebar } = useSidebar();
	const isCollapsed = state === "collapsed";

	return (
		<SidebarMenuButton onClick={toggleSidebar} tooltip={isCollapsed ? "Expand (⌘B)" : "Collapse (⌘B)"}>
			{isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
			<span className="flex-1">{isCollapsed ? "Expand" : "Collapse"}</span>
			{!isCollapsed && (
				<kbd className="ml-auto pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 flex">
					<span className="text-xs">⌘</span>B
				</kbd>
			)}
		</SidebarMenuButton>
	);
}

function AppSidebar() {
	const router = useRouter();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<span className="font-bold text-sm">Y</span>
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Yadwy</span>
									<span className="truncate text-xs text-muted-foreground">
										Seller Dashboard
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map((item) => {
								const isActive =
									router.state.location.pathname === item.to ||
									(item.to !== "/" &&
										router.state.location.pathname.startsWith(item.to));

								return (
									<SidebarMenuItem key={item.to}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											tooltip={item.label}
										>
											<Link to={item.to}>
												<item.icon />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Settings">
							<Link to="/store">
								<Settings />
								<span>Settings</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<CollapseButton />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}

function DashboardHeader() {
	return (
		<header className="flex h-14 shrink-0 items-center justify-end gap-4 border-b px-6">
			{/* Search */}
			<CommandSearch />

			{/* Notifications */}
			<Button variant="ghost" size="icon" className="h-8 w-8">
				<Bell className="h-4 w-4" />
				<span className="sr-only">Notifications</span>
			</Button>

			{/* User Menu */}
			<UserMenu />
		</header>
	);
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<DashboardHeader />
				<main className="flex-1 p-6 mx-auto w-full max-w-7xl">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

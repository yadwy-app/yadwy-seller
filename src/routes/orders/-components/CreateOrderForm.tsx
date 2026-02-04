import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { FormInput } from "@/components/shared/FormInput";
import { FormPhoneInput } from "@/components/shared/FormPhoneInput";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useProvinces } from "@/hooks/useProvinces";
import { useProducts } from "@/routes/products/-hooks/useProducts";
import type { PlaceOrderRequest } from "@/services/orders/types";

const createOrderSchema = z.object({
	customerName: z.string().min(2, "Customer name is required"),
	customerPhone: z.string().min(10, "Valid phone number is required"),
	shippingAddress: z.object({
		address: z.string().min(5, "Address is required"),
		province: z.string().min(1, "Province is required"),
		notes: z.string().optional(),
	}),
	items: z
		.array(
			z.object({
				productId: z.number().min(1, "Product is required"),
				quantity: z.number().min(1, "Quantity must be at least 1"),
			}),
		)
		.min(1, "At least one item is required"),
});

type CreateOrderFormData = z.infer<typeof createOrderSchema>;

interface CreateOrderFormProps {
	onSubmit: (data: PlaceOrderRequest) => void;
	isLoading?: boolean;
}

export function CreateOrderForm({ onSubmit, isLoading }: CreateOrderFormProps) {
	const { t, i18n } = useTranslation();
	const { data: products = [], isLoading: productsLoading } = useProducts();
	const { data: provinces = [], isLoading: provincesLoading } = useProvinces();

	const form = useForm<CreateOrderFormData>({
		resolver: zodResolver(createOrderSchema),
		defaultValues: {
			customerName: "",
			customerPhone: "",
			shippingAddress: {
				address: "",
				province: "",
				notes: "",
			},
			items: [
				{
					productId: undefined as unknown as number,
					quantity: 1,
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "items",
	});

	const handleProductSelect = (index: number, productId: string) => {
		const product = products.find((p) => p.id === Number(productId));
		if (product) {
			form.setValue(`items.${index}.productId`, Number(productId));
		}
	};

	const addItem = () => {
		append({
			productId: 0,
			quantity: 1,
		});
	};

	const removeItem = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	const handleFormSubmit = (data: CreateOrderFormData) => {
		// Transform form data to PlaceOrderRequest format
		const placeOrderRequest: PlaceOrderRequest = {
			source: "DIRECT",
			items: data.items,
			shippingAddress: {
				customerName: data.customerName,
				address: data.shippingAddress.address,
				province: data.shippingAddress.province,
				phone: data.customerPhone,
				notes: data.shippingAddress.notes,
			},
			paymentMethod: "COD",
		};
		onSubmit(placeOrderRequest);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleFormSubmit)}
				className="space-y-6"
			>
				{/* Customer Information */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">
						{t("orders.new.customerInfo")}
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormInput
							control={form.control}
							name="customerName"
							label={t("orders.new.customerName")}
							placeholder={t("orders.new.customerNamePlaceholder")}
						/>
						<FormPhoneInput
							control={form.control}
							name="customerPhone"
							label={t("orders.new.customerPhone")}
						/>
					</div>
				</div>

				<Separator />

				{/* Shipping Address */}
				<div className="space-y-4">
					<h3 className="text-lg font-medium">
						{t("orders.new.shippingAddress")}
					</h3>
					<div className="grid grid-cols-1 gap-4">
						<FormInput
							control={form.control}
							name="shippingAddress.address"
							label={t("orders.new.address")}
							placeholder={t("orders.new.addressPlaceholder")}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="shippingAddress.province"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("orders.new.governorate")}</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
											disabled={provincesLoading}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														placeholder={
															provincesLoading
																? t("common.loading")
																: t("orders.new.governoratePlaceholder")
														}
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{provinces.map((province) => (
													<SelectItem
														key={province.id}
														value={
															i18n.language === "ar"
																? province.name.ar
																: province.name.en
														}
													>
														{i18n.language === "ar"
															? province.name.ar
															: province.name.en}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormInput
								control={form.control}
								name="shippingAddress.notes"
								label={t("orders.new.notes")}
								placeholder={t("orders.new.notesPlaceholder")}
							/>
						</div>
					</div>
				</div>

				<Separator />

				{/* Order Items */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium">
							{t("orders.new.orderItems")}
						</h3>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={addItem}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							{t("orders.new.addItem")}
						</Button>
					</div>

					<div className="space-y-4">
						{fields.map((field, index) => (
							<div key={field.id} className="border rounded-lg p-4 space-y-4">
								<div className="flex items-center justify-between">
									<h4 className="font-medium">
										{t("orders.new.item")} {index + 1}
									</h4>
									{fields.length > 1 && (
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeItem(index)}
											className="text-destructive hover:text-destructive"
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									)}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>{t("orders.new.product")}</Label>
										<Select
											value={
												form.watch(`items.${index}.productId`)
													? form.watch(`items.${index}.productId`).toString()
													: ""
											}
											onValueChange={(value) =>
												handleProductSelect(index, value)
											}
											disabled={productsLoading}
										>
											<SelectTrigger className="h-10">
												<SelectValue
													placeholder={
														productsLoading
															? t("common.loading")
															: products.length === 0
																? "No products available"
																: t("orders.new.selectProduct")
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{productsLoading && (
													<div className="p-2 text-center text-sm text-muted-foreground">
														{t("common.loading")}
													</div>
												)}
												{!productsLoading && products.length === 0 && (
													<div className="p-2 text-center text-sm text-muted-foreground">
														No products available
													</div>
												)}
												{!productsLoading &&
													products.map((product) => {
														const displayName =
															i18n.language === "ar"
																? product.name.ar
																: product.name.en;
														return (
															<SelectItem
																key={product.id}
																value={product.id.toString()}
															>
																{displayName}
															</SelectItem>
														);
													})}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label>{t("orders.new.quantity")}</Label>
										<div className="flex items-center gap-2">
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => {
													const currentQty = form.getValues(
														`items.${index}.quantity`,
													);
													if (currentQty > 1) {
														form.setValue(
															`items.${index}.quantity`,
															currentQty - 1,
														);
													}
												}}
											>
												<Minus className="w-4 h-4" />
											</Button>
											<Input
												type="number"
												min="1"
												className="text-center"
												{...form.register(`items.${index}.quantity`, {
													valueAsNumber: true,
												})}
											/>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => {
													const currentQty = form.getValues(
														`items.${index}.quantity`,
													);
													form.setValue(
														`items.${index}.quantity`,
														currentQty + 1,
													);
												}}
											>
												<Plus className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end gap-4 pt-4">
					<Button type="button" variant="outline" asChild>
						<Link to="/orders">{t("common.cancel")}</Link>
					</Button>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? t("common.loading") : t("orders.new.createOrder")}
					</Button>
				</div>
			</form>
		</Form>
	);
}

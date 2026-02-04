import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlaceOrderRequest } from "@/services/orders/types";
import { CreateOrderForm } from "./-components/CreateOrderForm";
import { useCreateOrder } from "./-hooks/useCreateOrder";

export const Route = createFileRoute("/orders/new")({
	component: NewOrderPage,
});

function NewOrderPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const createOrder = useCreateOrder();

	const handleSubmit = async (data: PlaceOrderRequest) => {
		try {
			const newOrder = await createOrder.mutateAsync(data);
			toast.success(t("orders.new.success"));
			navigate({ to: `/orders/${newOrder.id}` });
		} catch (error) {
			console.error("Failed to create order:", error);
			toast.error(
				error instanceof Error ? error.message : t("orders.new.error"),
			);
		}
	};

	return (
		<div className="pb-20">
			{/* Header */}
			<div className="flex items-center gap-4 mb-6">
				<Link
					to="/orders"
					className="p-2 hover:bg-accent rounded-md transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<h1 className="text-xl font-semibold">{t("orders.new.title")}</h1>
			</div>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Plus className="w-5 h-5" />
							{t("orders.new.createOrder")}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<CreateOrderForm
							onSubmit={handleSubmit}
							isLoading={createOrder.isPending}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

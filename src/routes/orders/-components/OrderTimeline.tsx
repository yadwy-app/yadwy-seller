import type { OrderTimelineEvent } from "@/types";

interface OrderTimelineProps {
	events: OrderTimelineEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
	if (events.length === 0) {
		return (
			<div className="text-sm text-muted-foreground">
				No timeline events yet.
			</div>
		);
	}

	// Group events by date
	const groupedEvents = events.reduce<Record<string, OrderTimelineEvent[]>>(
		(acc, event) => {
			if (!acc[event.date]) {
				acc[event.date] = [];
			}
			acc[event.date].push(event);
			return acc;
		},
		{},
	);

	const getEventIcon = (type: OrderTimelineEvent["type"]) => {
		switch (type) {
			case "fulfillment":
				return "📦";
			case "payment":
				return "💳";
			case "email":
				return "✉️";
			case "note":
				return "📝";
			default:
				return "•";
		}
	};

	return (
		<div className="space-y-6">
			{Object.entries(groupedEvents).map(([date, dateEvents]) => (
				<div key={date}>
					<h4 className="text-sm font-medium text-muted-foreground mb-3">
						{date}
					</h4>
					<div className="space-y-3">
						{dateEvents.map((event) => (
							<div key={event.id} className="flex gap-3">
								<span className="text-lg">{getEventIcon(event.type)}</span>
								<div className="flex-1">
									<p className="text-sm text-foreground">{event.description}</p>
								</div>
								<span className="text-xs text-muted-foreground">
									{event.time}
								</span>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

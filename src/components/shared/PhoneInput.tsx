import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
	({ placeholder = "1012345678", value, onChange, ...props }, ref) => {
		const displayValue =
			typeof value === "string" && value.startsWith("+20")
				? value.slice(3)
				: value || "";

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let input = e.target.value.replace(/\D/g, "");

			if (input.startsWith("20")) {
				input = input.slice(2);
			}

			if (input.startsWith("0")) {
				input = input.slice(1);
			}

			const formattedValue = input ? `+20${input}` : "";

			const syntheticEvent = {
				...e,
				target: {
					...e.target,
					value: formattedValue,
				},
			} as React.ChangeEvent<HTMLInputElement>;

			onChange?.(syntheticEvent);
		};

		return (
			<div className="flex">
				<div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
					<span className="text-sm text-muted-foreground">+20</span>
				</div>
				<Input
					type="tel"
					placeholder={placeholder}
					className="rounded-l-none"
					ref={ref}
					value={displayValue}
					onChange={handleChange}
					{...props}
				/>
			</div>
		);
	},
);

PhoneInput.displayName = "PhoneInput";

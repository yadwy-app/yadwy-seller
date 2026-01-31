import { forwardRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	value?: string;
	onChange?: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
	({ value = "", onChange, className, ...props }, ref) => {
		const [displayValue, setDisplayValue] = useState(() => {
			// If value starts with +20, remove it for display
			if (value.startsWith("+20")) {
				return value.slice(3);
			}
			return value;
		});

		// Sync with external value changes
		useEffect(() => {
			if (value.startsWith("+20")) {
				setDisplayValue(value.slice(3));
			} else if (value === "") {
				setDisplayValue("");
			}
		}, [value]);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			let input = e.target.value;

			// Remove any non-digit characters
			input = input.replace(/\D/g, "");

			// Limit to 11 digits (Egyptian phone with leading 0)
			if (input.length > 11) {
				input = input.slice(0, 11);
			}

			// Update display value
			setDisplayValue(input);

			// Send full phone number with +20 prefix to parent
			if (onChange) {
				if (input === "") {
					onChange("");
				} else {
					// If starts with 0, keep it; otherwise add 0
					const normalizedInput = input.startsWith("0") ? input : `0${input}`;
					onChange(`+20${normalizedInput}`);
				}
			}
		};

		return (
			<div className="relative">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none select-none">
					+20
				</div>
				<Input
					{...props}
					ref={ref}
					type="tel"
					value={displayValue}
					onChange={handleChange}
					className={cn("pl-12", className)}
					placeholder="01012345678"
					maxLength={11}
				/>
			</div>
		);
	},
);

PhoneInput.displayName = "PhoneInput";

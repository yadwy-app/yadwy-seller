import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	placeholder?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
	({ placeholder = "01xxxxxxxxx", className, ...props }, ref) => {
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
					{...props}
				/>
			</div>
		);
	},
);

PhoneInput.displayName = "PhoneInput";

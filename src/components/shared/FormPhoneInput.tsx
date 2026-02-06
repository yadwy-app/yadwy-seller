import type { Control, FieldValues, Path } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "./PhoneInput";

interface FormPhoneInputProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	description?: string;
	disabled?: boolean;
}

export function FormPhoneInput<T extends FieldValues>({
	control,
	name,
	label,
	placeholder = "01xxxxxxxxx",
	description,
	disabled,
}: FormPhoneInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<PhoneInput
							placeholder={placeholder}
							disabled={disabled}
							{...field}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

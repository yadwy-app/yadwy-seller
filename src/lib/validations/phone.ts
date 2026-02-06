import { z } from "zod";

/**
 * Egyptian phone number validation
 * Format: +20 followed by 10 digits starting with 1
 * Examples: +201012345678, +201512345678, +201091321356
 * Egyptian mobile format: 01X XXXX XXXX (11 digits) → +20 1X XXXX XXXX (10 digits after +20)
 * Supported prefixes: 010, 011, 012, 015, 016, 017, 019
 */
export const egyptianPhoneSchema = z
	.string()
	.min(1, "Phone number is required")
	.regex(/^\+20/, "Phone number must start with +20")
	.regex(/^\+201[0-9]\d{8}$/, "Invalid Egyptian phone number format");

/**
 * Helper function to format phone number for display
 * Converts +201234567890 to 01234567890
 */
export function formatPhoneForDisplay(phone: string): string {
	if (phone.startsWith("+20")) {
		return phone.slice(3);
	}
	return phone;
}

/**
 * Helper function to format phone number for backend
 * Ensures phone starts with +20
 */
export function formatPhoneForBackend(phone: string): string {
	// Remove any spaces or dashes
	const cleaned = phone.replace(/[\s-]/g, "");

	// If already has +20, return as is
	if (cleaned.startsWith("+20")) {
		return cleaned;
	}

	// If starts with 20, add +
	if (cleaned.startsWith("20")) {
		return `+${cleaned}`;
	}

	// If starts with 0, add +20
	if (cleaned.startsWith("0")) {
		return `+20${cleaned.slice(1)}`;
	}

	// Otherwise add +20
	return `+20${cleaned}`;
}

/**
 * Validate Egyptian phone number
 */
export function isValidEgyptianPhone(phone: string): boolean {
	try {
		egyptianPhoneSchema.parse(phone);
		return true;
	} catch {
		return false;
	}
}

import { httpClient } from "@/lib/http-client";
import type { Province } from "./types";

export const provincesService = {
	/**
	 * Get all provinces
	 */
	getProvinces: async (): Promise<Province[]> => {
		try {
			const response = await httpClient.get<Province[]>("/v1/provinces");
			return response;
		} catch (error) {
			console.error("Failed to fetch provinces:", error);
			throw error;
		}
	},
};

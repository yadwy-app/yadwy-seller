import { httpClient } from "@/lib/http-client";
import type {
	JwtPayload,
	LoginRequestDto,
	LoginResponseDto,
	RefreshTokenResponseDto,
	RegisterSellerRequestDto,
	RegisterSellerResponseDto,
	User,
} from "./types";

export const authService = {
	login: async (data: LoginRequestDto): Promise<LoginResponseDto> => {
		const response = await httpClient.post<LoginResponseDto>(
			"/v1/auth/login",
			data,
		);

		// Store tokens in localStorage
		localStorage.setItem("accessToken", response.accessToken);
		localStorage.setItem("refreshToken", response.refreshToken);

		return response;
	},

	registerSeller: async (
		data: RegisterSellerRequestDto,
	): Promise<RegisterSellerResponseDto> => {
		const response = await httpClient.post<RegisterSellerResponseDto>(
			"/v1/auth/register/seller",
			data,
		);

		// Store tokens in localStorage
		localStorage.setItem("accessToken", response.accessToken);
		localStorage.setItem("refreshToken", response.refreshToken);

		return response;
	},

	refreshToken: async (): Promise<RefreshTokenResponseDto> => {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			throw new Error("No refresh token available");
		}

		const response = await httpClient.post<RefreshTokenResponseDto>(
			"/v1/auth/refresh",
			{
				refreshToken,
			},
		);

		// Update access token
		localStorage.setItem("accessToken", response.accessToken);

		return response;
	},

	logout: async (): Promise<void> => {
		// Clear tokens from localStorage
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");

		// Note: Backend doesn't have a logout endpoint, just clear local tokens
	},

	getCurrentUser: async (): Promise<User | null> => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			return null;
		}

		try {
			// Decode JWT to get user info
			const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));

			return {
				id: payload.id,
				name: "", // JWT doesn't contain name, might need to fetch from seller profile
				phoneNumber: payload.sub, // subject is phone number
				roles: payload.roles || [],
			};
		} catch (error) {
			console.error("Failed to decode token:", error);
			return null;
		}
	},

	isAuthenticated: (): boolean => {
		const token = localStorage.getItem("accessToken");
		if (!token) return false;

		try {
			const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
			const now = Date.now() / 1000;
			return payload.exp > now && payload.type === "access";
		} catch {
			return false;
		}
	},

	hasRole: (role: string): boolean => {
		const token = localStorage.getItem("accessToken");
		if (!token) return false;

		try {
			const payload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
			return payload.roles?.includes(role) || false;
		} catch {
			return false;
		}
	},

	isSeller: (): boolean => {
		return authService.hasRole("SELLER");
	},
};

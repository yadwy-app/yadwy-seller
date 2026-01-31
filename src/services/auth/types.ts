// Authentication-related types - colocated with auth service

export interface LoginRequestDto {
	phoneNumber: string;
	password: string;
}

export interface LoginResponseDto {
	accessToken: string;
	refreshToken: string;
}

export interface RegisterSellerRequestDto {
	name: string;
	phoneNumber: string;
	password: string;
}

export interface RegisterSellerResponseDto {
	accountId: number;
	accessToken: string;
	refreshToken: string;
}

export interface RefreshTokenRequestDto {
	refreshToken: string;
}

export interface RefreshTokenResponseDto {
	accessToken: string;
}

// JWT Payload structure (based on backend JwtTokenProvider)
export interface JwtPayload {
	iss: string; // issuer: "yadwy-service"
	iat: number; // issued at
	exp: number; // expires at
	sub: string; // subject: phone number
	id: number; // account ID
	roles: string[]; // user roles
	type: "access" | "refresh"; // token type
}

// User Types for Frontend
export interface User {
	id: number;
	name: string;
	phoneNumber: string;
	roles: string[];
	avatar?: string; // Optional avatar for UI
}

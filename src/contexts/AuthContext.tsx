"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext } from "react";
import {
	useLoginMutation,
	useLogoutMutation,
	useRegisterSellerMutation,
} from "@/hooks/useAuthMutations";
import type { User } from "@/services/auth/types";
import { authService } from "@/services/auth.service";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (phoneNumber: string, password: string) => Promise<void>;
	registerSeller: (
		name: string,
		phoneNumber: string,
		password: string,
	) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const { mutateAsync: loginMutation } = useLoginMutation();
	const { mutateAsync: registerSellerMutation } = useRegisterSellerMutation();
	const { mutate: logout } = useLogoutMutation();

	const { data: user, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: authService.getCurrentUser,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const login = async (phoneNumber: string, password: string) => {
		await loginMutation({ phoneNumber, password });
	};

	const registerSeller = async (
		name: string,
		phoneNumber: string,
		password: string,
	) => {
		await registerSellerMutation({ name, phoneNumber, password });
	};

	return (
		<AuthContext.Provider
			value={{
				user: user || null,
				isLoading,
				isAuthenticated: !!user,
				login,
				registerSeller,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

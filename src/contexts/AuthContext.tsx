"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode, useContext } from "react";
import {
	useGoogleLoginMutation,
	useLoginMutation,
	useLogoutMutation,
	useSignupMutation,
} from "@/hooks/useAuthMutations";
import { authService } from "@/services/auth.service";

export interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	loginWithGoogle: () => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	signupWithGoogle: () => Promise<void>;
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

	const { mutateAsync: signupMutation } = useSignupMutation();

	const { mutateAsync: loginWithGoogle } = useGoogleLoginMutation();

	const { mutateAsync: signupWithGoogle } = useGoogleLoginMutation();

	const { mutate: logout } = useLogoutMutation();

	const { data: user, isLoading } = useQuery({
		queryKey: ["currentUser"],
		queryFn: authService.getCurrentUser,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});

	const login = async (email: string, password: string) => {
		await loginMutation({ email, password });
	};

	const signup = async (name: string, email: string, password: string) => {
		await signupMutation({ name, email, password });
	};

	const loginWithGoogleWrapper = async () => {
		await loginWithGoogle();
	};

	const signupWithGoogleWrapper = async () => {
		await signupWithGoogle();
	};

	return (
		<AuthContext.Provider
			value={{
				user: user || null,
				isLoading,
				isAuthenticated: !!user,
				login,
				loginWithGoogle: loginWithGoogleWrapper,
				signup,
				signupWithGoogle: signupWithGoogleWrapper,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

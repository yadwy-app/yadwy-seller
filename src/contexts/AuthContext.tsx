"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

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
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check for existing session on mount
	useEffect(() => {
		const storedUser = localStorage.getItem("yadwy_user");
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch {
				localStorage.removeItem("yadwy_user");
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Mock validation - in production, this would call your API
		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		const mockUser: User = {
			id: "1",
			name: email.split("@")[0],
			email,
		};

		setUser(mockUser);
		localStorage.setItem("yadwy_user", JSON.stringify(mockUser));
	};

	const loginWithGoogle = async () => {
		// Simulate Google OAuth
		await new Promise((resolve) => setTimeout(resolve, 1500));

		const mockUser: User = {
			id: "google-1",
			name: "Yadwy Seller",
			email: "seller@yadwy.com",
			avatar: "https://ui-avatars.com/api/?name=Yadwy+Seller&background=random",
		};

		setUser(mockUser);
		localStorage.setItem("yadwy_user", JSON.stringify(mockUser));
	};

	const signup = async (name: string, email: string, password: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (!name || !email || !password) {
			throw new Error("All fields are required");
		}

		if (password.length < 8) {
			throw new Error("Password must be at least 8 characters");
		}

		const mockUser: User = {
			id: "2",
			name,
			email,
		};

		setUser(mockUser);
		localStorage.setItem("yadwy_user", JSON.stringify(mockUser));
	};

	const signupWithGoogle = async () => {
		// Same as loginWithGoogle for OAuth
		await loginWithGoogle();
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("yadwy_user");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated: !!user,
				login,
				loginWithGoogle,
				signup,
				signupWithGoogle,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

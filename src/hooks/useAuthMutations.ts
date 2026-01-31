import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	authService,
	type LoginDTO,
	type SignupDTO,
} from "@/services/auth.service";

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: LoginDTO) => authService.login(data),
		onSuccess: (user) => {
			queryClient.setQueryData(["currentUser"], user);
		},
	});
};

export const useSignupMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: SignupDTO) => authService.signup(data),
		onSuccess: (user) => {
			queryClient.setQueryData(["currentUser"], user);
		},
	});
};

export const useGoogleLoginMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => authService.loginWithGoogle(),
		onSuccess: (user) => {
			queryClient.setQueryData(["currentUser"], user);
		},
	});
};

export const useLogoutMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.setQueryData(["currentUser"], null);
			queryClient.clear();
		},
	});
};

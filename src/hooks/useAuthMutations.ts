import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	LoginRequestDto,
	RegisterSellerRequestDto,
} from "@/services/auth/types";
import { authService } from "@/services/auth.service";

export const useLoginMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: LoginRequestDto) => authService.login(data),
		onSuccess: () => {
			// Store tokens are already handled in the service
			// Invalidate current user query to refetch user data
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
		},
	});
};

export const useRegisterSellerMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: RegisterSellerRequestDto) =>
			authService.registerSeller(data),
		onSuccess: () => {
			// Store tokens are already handled in the service
			// Invalidate current user query to refetch user data
			queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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

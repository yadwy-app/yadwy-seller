import { useQuery } from "@tanstack/react-query";
import { type Province, provincesService } from "@/services/provinces";

export function useProvinces() {
	return useQuery<Province[]>({
		queryKey: ["provinces"],
		queryFn: () => provincesService.getProvinces(),
		staleTime: 1000 * 60 * 60, // 1 hour - provinces don't change often
		gcTime: 1000 * 60 * 60 * 24, // 24 hours
	});
}

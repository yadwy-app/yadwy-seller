import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignupForm } from "@/components/auth";

export const Route = createFileRoute("/signup")({
	beforeLoad: () => {
		// Check if user is already logged in (SSR-safe)
		if (typeof window !== "undefined") {
			const storedUser = localStorage.getItem("yadwy_user");
			if (storedUser) {
				throw redirect({ to: "/" });
			}
		}
	},
	component: SignupPage,
});

function SignupPage() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-4xl">
				<SignupForm />
			</div>
		</div>
	);
}

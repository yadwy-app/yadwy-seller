"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { FormInput } from "@/components/shared/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" {...props}>
			<title>Google</title>
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</svg>
	);
}

export function LoginForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { login, loginWithGoogle } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const [globalError, setGlobalError] = useState("");

	const formSchema = z.object({
		email: z.email({ message: t("auth.errors.invalidEmail") }),
		password: z.string().min(1, { message: t("auth.errors.passwordRequired") }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setGlobalError("");
		setIsLoading(true);

		try {
			await login(values.email, values.password);
			navigate({ to: "/" });
		} catch (err) {
			setGlobalError(
				err instanceof Error ? err.message : t("auth.errors.loginFailed"),
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setGlobalError("");
		setIsGoogleLoading(true);

		try {
			await loginWithGoogle();
			navigate({ to: "/" });
		} catch (err) {
			setGlobalError(
				err instanceof Error ? err.message : t("auth.errors.googleLoginFailed"),
			);
		} finally {
			setIsGoogleLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Card className="overflow-hidden p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<Form {...form}>
						<form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<div className="flex flex-col items-center gap-2 text-center">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground mb-2">
										<span className="font-bold text-lg">Y</span>
									</div>
									<h1 className="text-2xl font-bold">
										{t("auth.login.title")}
									</h1>
									<p className="text-muted-foreground text-balance text-sm">
										{t("auth.login.subtitle")}
									</p>
								</div>

								{globalError && (
									<div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
										{globalError}
									</div>
								)}

								<div className="grid gap-4">
									<FormInput
										control={form.control}
										name="email"
										label={t("auth.login.email")}
										type="email"
										placeholder={t("auth.login.emailPlaceholder")}
										disabled={isLoading || isGoogleLoading}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-center">
													<FormLabel>{t("auth.login.password")}</FormLabel>
													<button
														type="button"
														className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground"
													>
														{t("auth.login.forgotPassword")}
													</button>
												</div>
												<FormControl>
													<Input
														type="password"
														disabled={isLoading || isGoogleLoading}
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										className="w-full"
										disabled={isLoading || isGoogleLoading}
									>
										{isLoading && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										{t("auth.login.loginButton")}
									</Button>
								</div>

								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<span className="w-full border-t" />
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-card px-2 text-muted-foreground">
											{t("auth.login.orContinueWith")}
										</span>
									</div>
								</div>

								<Button
									variant="outline"
									type="button"
									className="w-full"
									onClick={handleGoogleLogin}
									disabled={isLoading || isGoogleLoading}
								>
									{isGoogleLoading ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<GoogleIcon className="mr-2 h-4 w-4" />
									)}
									{t("auth.login.continueWithGoogle")}
								</Button>

								<p className="text-center text-sm text-muted-foreground">
									{t("auth.login.noAccount")}{" "}
									<Link
										to="/signup"
										className="underline underline-offset-4 hover:text-primary"
									>
										{t("auth.login.signUp")}
									</Link>
								</p>
							</div>
						</form>
					</Form>
					<div className="relative hidden bg-muted md:block">
						<div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/10 to-primary/5">
							<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-6">
								<span className="font-bold text-3xl">Y</span>
							</div>
							<h2 className="text-2xl font-bold text-center mb-2">
								{t("auth.sidebar.yadwySeller")}
							</h2>
							<p className="text-muted-foreground text-center text-sm max-w-xs">
								{t("auth.sidebar.sellerDashboardDescription")}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
			<p className="px-6 text-center text-xs text-muted-foreground">
				{t("auth.login.termsNotice")}{" "}
				<button
					type="button"
					className="underline underline-offset-4 hover:text-primary"
				>
					{t("auth.login.termsOfService")}
				</button>{" "}
				{t("auth.login.and")}{" "}
				<button
					type="button"
					className="underline underline-offset-4 hover:text-primary"
				>
					{t("auth.login.privacyPolicy")}
				</button>
				.
			</p>
		</div>
	);
}

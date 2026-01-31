"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { FormInput } from "@/components/shared/FormInput";
import { PhoneInput } from "@/components/shared/PhoneInput";
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
import { useAuth } from "@/contexts";
import { egyptianPhoneSchema } from "@/lib/validations/phone";

export function SignupForm() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { registerSeller } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [globalError, setGlobalError] = useState("");

	const formSchema = z.object({
		name: z.string().min(1, { message: t("auth.errors.nameRequired") }),
		phoneNumber: egyptianPhoneSchema,
		password: z.string().min(8, { message: t("auth.errors.passwordLength") }),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phoneNumber: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setGlobalError("");
		setIsLoading(true);

		try {
			await registerSeller(values.name, values.phoneNumber, values.password);
			navigate({ to: "/" });
		} catch (err) {
			setGlobalError(
				err instanceof Error ? err.message : t("auth.errors.signupFailed"),
			);
		} finally {
			setIsLoading(false);
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
										{t("auth.signup.title")}
									</h1>
									<p className="text-muted-foreground text-balance text-sm">
										{t("auth.signup.subtitle")}
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
										name="name"
										label={t("auth.signup.fullName")}
										type="text"
										placeholder={t("auth.signup.fullNamePlaceholder")}
										disabled={isLoading}
									/>
									<FormField
										control={form.control}
										name="phoneNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>{t("auth.signup.phoneNumber")}</FormLabel>
												<FormControl>
													<PhoneInput
														{...field}
														disabled={isLoading}
														placeholder="1012345678"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormInput
										control={form.control}
										name="password"
										label={t("auth.signup.password")}
										type="password"
										placeholder={t("auth.signup.passwordPlaceholder")}
										disabled={isLoading}
									/>
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										{t("auth.signup.createAccountButton")}
									</Button>
								</div>

								<p className="text-center text-sm text-muted-foreground">
									{t("auth.signup.hasAccount")}{" "}
									<Link
										to="/login"
										className="underline underline-offset-4 hover:text-primary"
									>
										{t("auth.signup.login")}
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
								{t("auth.sidebar.joinYadwy")}
							</h2>
							<p className="text-muted-foreground text-center text-sm max-w-xs">
								{t("auth.sidebar.joinDescription")}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
			<p className="px-6 text-center text-xs text-muted-foreground">
				{t("auth.signup.termsNotice")}{" "}
				<button
					type="button"
					className="underline underline-offset-4 hover:text-primary"
				>
					{t("auth.signup.termsOfService")}
				</button>{" "}
				{t("auth.signup.and")}{" "}
				<button
					type="button"
					className="underline underline-offset-4 hover:text-primary"
				>
					{t("auth.signup.privacyPolicy")}
				</button>
				.
			</p>
		</div>
	);
}

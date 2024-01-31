"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/app/lib/firebase";
import { TokenContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type fieldProps = {
	field: {};
};

type valueProps = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const initialValues = {
		email: "",
		password: "",
	};
	const validationSchema = Yup.object({
		email: Yup.string().required("Provide an Email address"),
		password: Yup.string().required("Provide a password"),
	});
	const auth = getAuth(app);
	const { setToken } = TokenContext();
	const { replace } = useRouter();
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				replace("/home");
			}
		});
	}, []);

	const onSubmit = async (values: valueProps) => {
		const { email, password } = values;
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCred) => {
				const user = userCred.user;
				// Get the token session from the user
				const tokenSession = user.getIdToken();

				tokenSession.then((token) => {
					setToken(token);
					replace("/home");
					setIsLoading(false);
				});
			})
			.catch((error) => {
				setIsLoading(false);
				setMessage("Wrong Email or Password");
			});
	};
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Card className="w-[480px]">
				<CardHeader>
					<CardTitle>Admin Login</CardTitle>
					<CardDescription className="text-red-500">{message}</CardDescription>
				</CardHeader>

				<CardContent>
					<Formik
						onSubmit={onSubmit}
						validationSchema={validationSchema}
						initialValues={initialValues}>
						<Form className="flex flex-col gap-3">
							<Field name="email">
								{(props: fieldProps) => {
									const { field } = props;
									return (
										<>
											<Label htmlFor="email">Email</Label>
											<Input
												type="email"
												placeholder="john@gmail.com"
												{...field}
											/>
										</>
									);
								}}
							</Field>
							<Field name="password">
								{(props: fieldProps) => {
									const { field } = props;
									return (
										<>
											<Label htmlFor="password">Password</Label>
											<Input
												type="password"
												placeholder="***************"
												{...field}
											/>
										</>
									);
								}}
							</Field>
							<Button type="submit" variant={"outline"}>
								{isLoading ? (
									<div className="flex gap-2 items-center">
										Authenticating...
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									</div>
								) : (
									"Login"
								)}
							</Button>
						</Form>
					</Formik>
				</CardContent>
			</Card>
		</main>
	);
}

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

type fieldProps = {
	field: {};
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
	const onSubmit = async () => {};
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Card className="w-[480px]">
				<CardHeader>
					<CardTitle>Admin Login</CardTitle>
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
								{/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
								Login
							</Button>
						</Form>
					</Formik>
				</CardContent>
			</Card>
		</main>
	);
}

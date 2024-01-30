import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { email, password } = await request.json();
	try {
	} catch (error) {
		const response = {
			message: "An Error Occured",
		};

		return NextResponse.json(response);
	}
}

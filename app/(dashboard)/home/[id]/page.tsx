"use client";
import { app, db } from "@/app/lib/firebase";
import { Button } from "@/components/ui/button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LucideArrowBigLeft } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type paramsProps = {
	id: string;
};

type ReportProps = {
	videoUrl: string;
	imageUrl: string;
	location: string;
	description: string;
	case: string;
	incidentDate: string;
};
export default function CaseDetails() {
	const { id }: paramsProps = useParams();
	const [report, setReport] = useState<ReportProps | null | undefined | any>();
	const { replace } = useRouter();
	const getDocData = async () => {
		try {
			const docRef = doc(db, "reports", id);
			const documentSnapshot = await getDoc(docRef);
			if (documentSnapshot.exists()) {
				// Document found, return the data

				setReport(documentSnapshot.data());
				return documentSnapshot.data();
			} else {
				// Document doesn't exist
				console.log("Document does not exist");
				return null;
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDocData();
	}, []);
	const [authenticated, setAuthenticated] = useState(false);

	const auth = getAuth(app);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				replace("/");
				setAuthenticated(false);
			} else {
				setAuthenticated(true);
			}
		});
	}, []);
	if (authenticated) {
		return (
			<div className="w-full p-4 h-screen flex flex-col  space-y-4">
				<Button onClick={() => replace("/home")}>
					<LucideArrowBigLeft />
					Back
				</Button>
				<h1 className="text-2xl font-bold">Case Type: {report?.case}</h1>
				<p className="text-lg">Case Description: {report?.description}</p>
				<h1 className="text-lg">Incident Date: {report?.incidentDate}</h1>
				<h1 className="text-lg">Location: {report?.location}</h1>
				<div className="flex gap-10">
					{report?.imageUrl && (
						<Image
							className="h-[300px] w-[300px]"
							src={report?.imageUrl}
							width={300}
							height={300}
							quality={100}
							loading="lazy"
							alt="case"
						/>
					)}
					{report?.videoUrl && (
						<video
							src={report?.videoUrl}
							controls
							className="h-[300px] w-[300px]"
						/>
					)}
				</div>
			</div>
		);
	}
}

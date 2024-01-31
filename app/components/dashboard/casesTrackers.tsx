import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberCounter from "../counter";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Table,
	TableHeader,
	TableCaption,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
} from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
	DocumentData,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Link from "next/link";
export default function CasesTrackers() {
	const [reportData, setReportData] = useState<
		{ id: string; data: DocumentData }[]
	>([]);
	const cases = [
		{
			id: 1,
			status: "Total Cases",
			count: 17,
		},
		{
			id: 2,
			status: "In Progress",
			count: 50,
		},
		{
			id: 3,
			status: "Closed",
			count: 10,
		},
	];
	const colRef = collection(db, "reports");

	const fetchData = async () => {
		const q = query(colRef, orderBy("incidentDate", "desc"));
		onSnapshot(q, (snapshot): any => {
			const data: { id: string; data: DocumentData }[] = [];
			snapshot.docs.forEach((doc) => {
				data.push({ id: doc.id, data: doc.data() });
			});
			setReportData(data);
		});
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div className=" gap-10 justify-center py-10 w-full ">
			<div className="flex gap-10 justify-center py-3 w-full ">
				{cases.map(({ id, status, count }) => {
					return (
						<Card className="h-[150px] w-[200px]" key={id}>
							<CardHeader>
								<CardTitle className={`text-center `}>{status}</CardTitle>
							</CardHeader>
							<CardContent>
								<h1 className="text-center text-[30px]">
									<NumberCounter endNumber={count} />
								</h1>
							</CardContent>
						</Card>
					);
				})}
			</div>
			<div className="px-10 overflow-y-scroll scroll-bar h-[65vh]">
				<Table>
					<TableCaption>End of Cases.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Case Name</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Report Date</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reportData.map((data) => (
							<TableRow key={data.id}>
								<TableCell>{data.data.case}</TableCell>
								<TableCell>Active</TableCell>
								<TableCell className="text-right">
									{data.data.incidentDate}
								</TableCell>
								<TableCell className="flex gap-2 items-center">
									<Popover>
										<PopoverTrigger asChild>
											<Button>
												<EyeIcon size={18} />
												View
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<Link href={`/home/${data.id}`}>View Details</Link>
											<h1 className="text-center text-[18px] text-gray-800">
												{data.data.case}
											</h1>
											<p className="text-[15px] text-gray-400">
												{data.data.description}
											</p>
										</PopoverContent>
									</Popover>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

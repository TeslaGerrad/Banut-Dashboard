import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NumberCounter from "../counter";

export default function CasesTrackers() {
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
	return (
		<div className="flex gap-10 justify-center items-center w-full ">
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
	);
}

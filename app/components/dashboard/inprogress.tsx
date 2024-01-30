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

export default function Inprogress() {
	return (
		<div className="flex flex-col gap-3 w-full px-5 py-5">
			<h1 className="text-[18px]">In Progress</h1>
			<Table>
				<TableCaption>End of Cases.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">No.</TableHead>
						<TableHead>Case Name</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Report Date</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">001</TableCell>
						<TableCell>Robbery</TableCell>
						<TableCell>Active</TableCell>
						<TableCell className="text-right">29/01/2024</TableCell>
						<TableCell className="flex gap-2 items-center">
							<Popover>
								<PopoverTrigger asChild>
									<Button>
										<EyeIcon size={18} />
										View
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<h1 className="text-center text-[18px] text-gray-800">
										Robbery Case
									</h1>
									<p className="text-[15px] text-gray-400">
										This is a case of John Who stole the chickens
									</p>
								</PopoverContent>
							</Popover>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}

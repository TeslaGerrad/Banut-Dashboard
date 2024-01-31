import { Loader, Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex justify-center items-center h-screen w-full">
			<Loader2 className="mr-2 h-4 w-4 animate-spin" size={10} />
		</div>
	);
}

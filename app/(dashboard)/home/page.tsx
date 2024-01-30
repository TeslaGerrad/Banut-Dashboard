"use client";
import CasesTrackers from "@/app/components/dashboard/casesTrackers";
import Closed from "@/app/components/dashboard/closed";
import Inprogress from "@/app/components/dashboard/inprogress";
import { useRootContext } from "@/app/provider";

export default function DashBoard() {
	const { tabs, activeTab } = useRootContext();
	return (
		<>
			{activeTab.name == tabs[0].name ? (
				<CasesTrackers />
			) : activeTab.name == tabs[1].name ? (
				<Inprogress />
			) : (
				<Closed />
			)}
		</>
	);
}

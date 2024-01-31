"use client";
import CasesTrackers from "@/app/components/dashboard/casesTrackers";
import Closed from "@/app/components/dashboard/closed";
import Inprogress from "@/app/components/dashboard/inprogress";
import { app } from "@/app/lib/firebase";
import { TokenContext, useRootContext } from "@/app/provider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashBoard() {
	const { tabs, activeTab } = useRootContext();
	const [authenticated, setAuthenticated] = useState(false);

	const { replace } = useRouter();

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
}

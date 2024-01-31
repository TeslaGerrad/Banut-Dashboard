"use client";
import { app } from "@/app/lib/firebase";
import { useRootContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {};
export default function SideBar(props: Props) {
	const { activeTab, tabs, setActiveTab } = useRootContext();
	const [authenticated, setAuthenticated] = useState(false);
	const auth = getAuth(app);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				setAuthenticated(false);
			} else {
				setAuthenticated(true);
			}
		});
	}, []);
	if (authenticated) {
		return (
			<Card className="h-screen w-[320px]">
				<CardContent>
					<CardHeader>
						<CardTitle>Ichalo Bantu</CardTitle>
					</CardHeader>
					<ul className="flex flex-col gap-5">
						<Button
							className={`p-2 ${
								activeTab.name == tabs[0].name
									? "bg-blue-400 text-white"
									: "text-black"
							}  justify-start text-[16px] `}
							variant={"link"}
							onClick={() => setActiveTab(tabs[0])}>
							All Cases
						</Button>
						<Button
							className={`p-2 ${
								activeTab.name == tabs[1].name
									? "bg-blue-400 text-white"
									: "text-black"
							}  justify-start text-[16px] `}
							variant={"link"}
							onClick={() => setActiveTab(tabs[1])}>
							In Progress
						</Button>
						<Button
							className={`p-2 ${
								activeTab.name == tabs[2].name
									? "bg-blue-400 text-white"
									: "text-black"
							}  justify-start text-[16px] `}
							variant={"link"}
							onClick={() => setActiveTab(tabs[2])}>
							Closed
						</Button>

						<Button onClick={() => signOut(auth)}>
							<LogOut />
							Logout
						</Button>
					</ul>
				</CardContent>
			</Card>
		);
	}
}

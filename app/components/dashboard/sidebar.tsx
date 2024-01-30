"use client";
import { useRootContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {};
export default function SideBar(props: Props) {
	const { activeTab, tabs, setActiveTab } = useRootContext();
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
				</ul>
			</CardContent>
		</Card>
	);
}

"use client";
import React, { useState, useEffect, createContext, useContext } from "react";

type Props = {
	children: React.ReactNode;
};

type Tab = {
	name: string;
};

type ContextProps = {
	tabs: Tab[];
	activeTab: Tab;
	setActiveTab: (tab: any) => void;
};

const RootContext = createContext<ContextProps>({
	tabs: [],
	activeTab: { name: "" },
	setActiveTab: () => {},
});

export const RootProvider = ({ children }: Props) => {
	const tabs = [
		{ name: "All Cases" },
		{ name: "In progress" },
		{ name: "Closed" },
	];
	const [activeTab, setActiveTab] = useState(tabs[0]);

	useEffect(() => {
		console.log(activeTab);
	}, [activeTab]);
	return (
		<RootContext.Provider
			value={{
				tabs,
				activeTab,
				setActiveTab,
			}}>
			{children}
		</RootContext.Provider>
	);
};
export const useRootContext = () => useContext(RootContext);

// Create the context with the TokenState type
const useTokenContext = createContext<any>(null);

// Annotate the props of the provider component with the TokenProviderProps type
export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState(undefined);

	return (
		<useTokenContext.Provider value={{ token, setToken }}>
			{children}
		</useTokenContext.Provider>
	);
};

// Annotate the return value of the custom hook with the TokenState type
export const TokenContext = () => {
	// Use a type assertion to avoid null or undefined values
	return useContext(useTokenContext);
};

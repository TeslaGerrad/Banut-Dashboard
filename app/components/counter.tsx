import React, { useState, useEffect } from "react";

const NumberCounter = ({ endNumber }: { endNumber: number }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prevCount) => {
				if (prevCount === endNumber) {
					clearInterval(interval);
					return prevCount;
				}
				return prevCount + 1;
			});
		}, 10);

		return () => clearInterval(interval);
	}, [endNumber]);

	return <div>{count}</div>;
};

export default NumberCounter;

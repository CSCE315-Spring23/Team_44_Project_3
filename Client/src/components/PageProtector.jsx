import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

/**
 * A component that protects pages from unauthorized access by checking if the user is authenticated
 * @param {Object} children - The components to be rendered within the PageProtector component
 * @returns {Object} The protected component or a page loading message
 */
function PageProtector({children}) {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	/**
	 * Check if user is authenticated and update isLoading state accordingly
	 */
	useEffect(() => {
		if (localStorage.getItem("employeeId") != null) {
			setIsLoading(false);
		}
		else {
			console.log("pageprotector nav to login");
			navigate("/");
			setIsLoading(true);
		}
	}, []);

	/**
	 * Render the protected component or a page loading message
	 */
	if (isLoading) {
		return (
			<p>Page Loading Or No Authorization</p>
		);
	}

	return children;
}

export default PageProtector;

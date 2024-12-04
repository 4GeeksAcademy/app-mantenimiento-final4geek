import React from "react";

import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<Link to="/homeClient">
			<button type="button" className="btn btn-primary">Home app</button>
			</Link>
		</div>
	);
};

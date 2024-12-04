import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuHome from "./MenuHome";

export const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false)
	const closeMenu = () => {
		setShowMenu(false)
	}
	return (
		<header className="row text-light  navHome">
			<div className="col-2 d-flex align-items-center justify-content-center menuHome">
				<button className="btn botonMenu"
					onClick={() => setShowMenu(true)}>
					<i className="fas fa-bars"></i>
				</button>
				{showMenu && <MenuHome closeMenu={closeMenu} />}
			</div>
			<div className="col-10 d-flex align-items-center justify-content-center">
				<h1 className="h5 m-0">Bienvenido &lt;NomUsuario&gt;</h1>
			</div>
		</header>

	);
};

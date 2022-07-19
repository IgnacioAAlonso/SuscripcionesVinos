import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
} from "./NavbarElements";
import Logo from "../../images/logo-transparente.png";
import Carrito from "../Carrito/Carrito";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars></Bars>
                <NavMenu>
                    <NavLink to="/YokaiColeccionables/" activeStyle>
                        Inicio
                    </NavLink>
                    <NavLink to="/colecciones" activeStyle>
                        Colecciones
                    </NavLink>
                    <NavLink to="/contacto" activeStyle>
                        Contacto
                    </NavLink>
                    <NavLink to="/nosotros" activeStyle>
                        Nosotros
                    </NavLink>
                </NavMenu>

                <NavLink to="/YokaiColeccionables/">
                    <img class="imagen_logo" src={Logo} alt="Logo" />
                </NavLink>

                <NavBtn>
                    <Carrito />
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;

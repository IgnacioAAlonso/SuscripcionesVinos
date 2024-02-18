import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
} from "./NavbarElements";
import Logo from "../../images/republica.png";
import Carrito from "../Carrito/carrito";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars></Bars>
                <NavMenu>
                    <NavLink to="/SuscripcionesVinos/" activeStyle>
                        INICIO
                    </NavLink>
                    <NavLink to="/colecciones" activeStyle>
                        COLECCIONES
                    </NavLink>
                    {/*<NavLink to="/contacto" activeStyle>
                        Contacto
                    </NavLink>
                    <NavLink to="/nosotros" activeStyle>
                        Nosotros
                    </NavLink>*/}
                </NavMenu>

                {/*<NavLink to="/SuscripcionesVinos/">
                    <img class="imagen_logo" src={Logo} alt="Logo" />
                </NavLink>*/}
            </Nav>
        </>
    );
};

export default Navbar;

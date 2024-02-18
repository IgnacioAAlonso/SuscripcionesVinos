import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export const Nav = styled.nav`
    background: #d4c7b4d2;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    z-index: 10;

    @media screen and (max-width: 768px){
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
`;

export const NavLink = styled(Link)`
    color: #394720;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    
    &:hover {
        color: #688535; /* Color que deseas cuando se pasa el mouse por encima */
    }

    &.active{
        color: #688535;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #394720;
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -10px;
    width: 100vw;
    white-space: nowrap;

    @media screen and (max-width: 768px){
        display: flex;
        flex-direction: column;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 15px;

    justify-content: flex-end;
    width: 100vw;
`;
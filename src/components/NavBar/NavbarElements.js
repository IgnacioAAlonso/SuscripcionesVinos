import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export const Nav = styled.nav`
    background: #000;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    z-index: 10;

    @media screen and (max-width: 768px){
        display: flex;
        justify-content: center;
        flex-direction: column-reverse;
        margin-top: 55px;
    }
`;

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active{
        color: #064663;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;
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
        margin-top: 5px;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 15px;

    justify-content: flex-end;
    width: 100vw;
`;
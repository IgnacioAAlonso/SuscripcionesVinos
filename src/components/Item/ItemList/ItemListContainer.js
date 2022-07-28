import React, { useState, useContext, useEffect } from 'react'
import { NavLink as Link } from 'react-router-dom';
import ItemList from './ItemList';
import CartContext from "../../Carrito/context/CartContext";

const ItemListContainer = () => {
    const user = useContext(CartContext).orderId;
    return (
        <>
            {(user) ?
                <div>
                    <div className="cotenedor__categorias">
                        <Link to="/category/Tinto"><button>Tinto</button></Link>
                        <Link to="/category/Blanco"><button>Blanco</button></Link>
                        <Link to="/category/Rosado"><button>Rosado</button></Link>
                        <Link to="/category/Espumantes"><button>Espumantes</button></Link>
                        <Link to="/colecciones"><button>Todos</button></Link>
                    </div>
                    <div class="container">
                        <div class="row" style={{ display: 'flex', justifyContent: 'center' }}>
                            <ItemList />
                        </div>
                    </div >
                </div>
                :
                <div>
                    No hay usuario logeado
                </div>
            }
        </>
    )
}

export default ItemListContainer;
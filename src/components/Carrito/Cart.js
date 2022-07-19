import React, { useState, useContext, useEffect } from "react";
import { NavLink as Link, withRouter } from 'react-router-dom';
import ItemDetail from "../Item/ItemDetail/ItemDetail";
import CartContext from "./context/CartContext";
import { addDoc, collection, getFirestore } from 'firebase/firestore';


function useAddCarrito(eventType, handler) {
    useEffect(() => {

        window.addEventListener(eventType, handler);
        return () => {
            window.removeEventListener(eventType, handler);
        }
    }, [handler])
}


const Cart = () => {

    const productos = useContext(CartContext).carrito;
    const clear = useContext(CartContext).clear;
    const getPrecio = useContext(CartContext).getPrecioTotal;
    const setOrder = useContext(CartContext).addOrder;
    let [state, setState] = useState(getPrecio());
    let [comprador, setComprador] = useState();
    let [usuario, setUsuario] = useState(false);
    const db = getFirestore();

    const clearAll = () => {
        clear();
        setState(0);
    }

    useAddCarrito(window.addEventListener("MyEventType", () => {
        setState(getPrecio())
    }))

    const handleSubmit = (e) => {
        e.preventDefault()
        const newItem = { nombre: e.target[0].value, apellido: e.target[1].value, telefono: e.target[2].value, mail: e.target[3].value }
        if (e.target[0].value.length > 0
            && e.target[1].value.length > 0
            && e.target[2].value.length > 0
            && e.target[3].value.length > 0) {
            setComprador(newItem)
            setUsuario(true);
            document.getElementById("miForm").reset();
            document.getElementById("miFormAlert").classList.remove('hidenClass');
            document.getElementById("miFormAlert").classList.add('showClass');
            document.getElementById("miNotFormAlert").classList.remove('showClass');
            document.getElementById("miNotFormAlert").classList.add('hidenClass');
        }
        else {
            setUsuario(false);
            document.getElementById("miNotFormAlert").classList.remove('hidenClass');
            document.getElementById("miNotFormAlert").classList.add('showClass');
            document.getElementById("miFormAlert").classList.remove('showClass');
            document.getElementById("miFormAlert").classList.add('hidenClass');
        }
    }

    return (
        <div>
            <div> <h3 class="cart-title">Carrito de Compras</h3></div>
            {(productos.length === 0) ?
                (<h4> El carrito está vacio </h4>)
                :
                (productos.map((producto) => (
                    <ItemDetail item={producto} type="cart" />
                )))
            }

            {
                (productos.length > 0) ?
                    (
                        <div class="cart-form">
                            <h5>Datos del comprador:</h5>
                            <form id="miForm" onSubmit={handleSubmit}>
                                <div class="row g-3 align-items-center">
                                    <div class="col-6">
                                        <label for="exampleInputPassword1" class="form-label">Nombre</label>
                                        <input type="text" class="form-control"></input>
                                    </div>

                                    <div class="col-6">
                                        <label for="exampleInputPassword1" class="form-label">Apellido</label>
                                        <input type="text" class="form-control"></input>
                                    </div>

                                    <div class="col-6">
                                        <label for="exampleInputPassword1" class="form-label">Teléfono</label>
                                        <input type="number" class="form-control"></input>
                                    </div>

                                    <div class="col-6">
                                        <label for="exampleInputEmail1" class="form-label">Email</label>
                                        <input type="email" class="form-control" aria-describedby="emailHelp"></input>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary mt-3">Enviar</button>
                                <div id="miFormAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                                    Usuario cargado con éxito
                                </div>
                                <div id="miNotFormAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                                    Faltan datos por cargar
                                </div>
                            </form>
                        </div>
                    )
                    :
                    (<></>)
            }

            <div class="cart-checkOut">
                <div class="cart-checkOutTotal"> Total: ${state} </div>
                {(usuario) ?
                    (<Link to={{
                        pathname: `/orders`
                    }} onClick={() => {
                        let order = {
                            buyer: comprador,
                            items: productos,
                            total: state
                        }
                        const data = collection(db, "orders")
                        addDoc(data, order).then((res) => {
                            console.log("Estoy haciendo esto")
                            setOrder(res.id);
                        })
                    }}>
                        <button class="cart-checkOutTotalButton" data-bs-dismiss="offcanvas"> Finalizar Compra </button>
                    </Link>)
                    :
                    (<button class="cart-checkOutTotalButton inhabilitado" data-bs-dismiss="offcanvas"> Finalizar Compra </button>)
                }

                {(productos.length === 0) ?
                    (<Link to={{ pathname: `/colecciones` }}>
                        <button class="cart-checkOutTotalButton" data-bs-dismiss="offcanvas" > Seguir Comprando </button>
                    </Link>)
                    :
                    (<button class="cart-checkOutTotalButton" data-bs-dismiss="offcanvas" onClick={() => { clearAll(); }}> Borrar todo </button>)
                }
            </div>
        </div>
    )
}

export default Cart

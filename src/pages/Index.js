import React, { useState, useContext, useEffect } from "react";
import { NavLink as Link, withRouter } from 'react-router-dom';
import CartContext from "../components/Carrito/context/CartContext";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import '../App.css'

function useAddCarrito(eventType, handler) {
    useEffect(() => {

        window.addEventListener(eventType, handler);
        return () => {
            window.removeEventListener(eventType, handler);
        }
    }, [handler])
}

const Home = () => {

    const setOrder = useContext(CartContext).addOrder;
    let [usuario, setUsuario] = useState(false);
    let [comprador, setComprador] = useState();
    const db = getFirestore();

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
        <div class="contenedorAll">
        <div class="cart-form">
        <h5>Datos del comprador:</h5>
        <form id="miForm" onSubmit={handleSubmit}>
        <div class="row g-3 align-items-center">
        <div class="col-6">
            <label for="exampleInputPassword1" class="form-label">Nombre</label>
            <select type="text" class="form-control">
                <option value=""></option>
                <option value="tinto">Tinto</option>
                <option value="blanco">Blanco</option>
                <option value="rosado">Rosado</option>
                <option value="espumante">Espumante</option>
            </select>
        </div>

                                    <div class="col-6">
                                        <label for="exampleInputPassword1" class="form-label">Uva</label>
                                        <select type="text" class="form-control">
                <option value=""></option>
                <option value="malbec">Malbec</option>
                <option value="blanco">Frank</option>
                <option value="rosado">Pinot Noir</option>
            </select>
                                    </div>

                                    <div class="col-6">
                                        <label for="exampleInputPassword1" class="form-label">Imagen</label>
                                        <input type="text" class="form-control"></input>
                                    </div>

                                    <div class="col-6">
                                        <label for="exampleInputEmail1" class="form-label">Comentarios</label>
                                        <input type="text" class="form-control"></input>
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

            <div class="cart-checkOut">
                {(usuario) ?
                    (<Link to={{
                        pathname: `/orders`
                    }} onClick={() => {
                        let order = {
                            buyer: comprador
                        }
                        const data = collection(db, "orders")
                        addDoc(data, order).then((res) => {
                            setOrder(res.id);
                        })
                    }}>
                        <button class="cart-checkOutTotalButton" data-bs-dismiss="offcanvas"> Finalizar Compra </button>
                    </Link>)
                    :
                    (<button class="cart-checkOutTotalButton inhabilitado" data-bs-dismiss="offcanvas"> Finalizar Compra </button>)
                }
            </div>
        </div>

        
    )
}

export default Home

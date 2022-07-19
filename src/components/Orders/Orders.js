import React, { useContext, useState, useEffect } from 'react'
import CartContext from "../Carrito/context/CartContext";
import { updateDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import './Orders.css';

const Orders = () => {
    const orderId = useContext(CartContext).orderId;
    const clear = useContext(CartContext).clear;
    const [buyer, setBuyer] = useState();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState();
    const db = getFirestore();

    useEffect(() => {
        if (orderId !== undefined) {
            const data = doc(db, "orders", orderId)
            getDoc(data).then((snapshot) => {
                setBuyer(snapshot.data().buyer)
                setItems(snapshot.data().items)
                setTotal(snapshot.data().total)
            })
        }
        clear();

    }, [orderId])

    useEffect(() => {

        if (orderId !== undefined) {
            for (let i = 0; i < items.length; i++) {
                const dataI = doc(db, "items", items[i].id);
                let stk = (items[i].stock - items[i].cantidad);
                updateDoc(dataI, { stock: stk });
            }
        }
    }, [items])

    return (
        (items.length === 0) ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', color: '#fff', gap: '10px', fontSize: '28px' }}> <i class="fas fa-spinner"></i> Cargando...</div>
            :
            (<div class="orderContainer">
                <div class="orderContainer__id">
                    <p>Su pedido es el: {orderId}</p>
                </div>

                <div class="orderContainer__info">
                    <div>
                        <p class="orderContainer__infoTitulo">Datos del comprador: </p>
                        <p> <b>Nombre:</b> {buyer.nombre}</p>
                        <p> <b>Apellido:</b> {buyer.apellido}</p>
                        <p> <b>Email:</b> {buyer.mail}</p>
                    </div>

                    <div>
                        <p class="orderContainer__infoTitulo">Detalle del pedido: </p>
                        {items.map((item) => (
                            (<div class="orderContainer__infoPro">

                                <p>
                                    <b>Producto:</b> {item.title}
                                </p>
                                <p>
                                    <b>Cantidad:</b> {item.cantidad}
                                </p>
                                <p>
                                    <b>Precio:</b> {(item.price * item.cantidad)}
                                </p>
                            </div>
                            )
                        ))}
                    </div>
                </div>
                <div>
                    <p class="orderContainer__infoTitulo orderContainer__infoTotal mt-3">Total: {total}</p>
                </div>
            </div>)
    )
}

export default Orders

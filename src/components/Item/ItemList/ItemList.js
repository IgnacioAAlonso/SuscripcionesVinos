import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import Item from './Item'
import CartContext from "../../Carrito/context/CartContext";
import { collection, getDoc, getDocs, getFirestore, where, query, doc } from "firebase/firestore"

const ItemList = ({ }) => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const user = useContext(CartContext).orderId;
    const newItem = []
    const db = getFirestore();

    useEffect(() => {
        console.log(user)
        const data = doc(db, 'usuarios', user);
        console.log(getDoc(data))

        getDoc(data).then((snapshot) => {
            setCategory(snapshot.data().vinos.map((element) => {
                if (id === undefined) {
                    return element;
                } else {
                    return element.category === id;
                }
            }))
        })

    }, [])

    useEffect(() => {

        setCategory(newItem)
        if (id === undefined) {
            const data = doc(db, 'usuarios', user);
            getDoc(data).then((snapshot) => {
                setCategory(snapshot.data().vinos.map((element) => {
                    return element;
                }))
            })
        } else {
            const data = collection(db, "usuarios");
            getDocs(data).then((snapshot) => {
                snapshot.docs.map((element) => {
                    if (user === element.id) {
                        setCategory(element.data().vinos.map((vino) => {
                            if (id === vino.tipoDeVino) {
                                return vino
                            }
                        }))
                    }
                })
            })
        }


    }, [id])

    return (
        <>
            {(category[0] !== undefined) ?

                category.map((producto) => (
                    <Item producto={producto} />
                ))
                :
                <div class='categoriaVacia'>
                    No hay vinos para esta categoria
                </div>
            }
        </>
    )

}

export default ItemList

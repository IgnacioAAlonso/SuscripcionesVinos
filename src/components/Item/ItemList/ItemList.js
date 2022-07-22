import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import Item from './Item'
import CartContext from "../../Carrito/context/CartContext";
import { collection, getDoc, getDocs, getFirestore, where, query, doc } from "firebase/firestore"

const ItemList = ({ }) => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const user = useContext(CartContext).orderId;

    useEffect(() => {
        const db = getFirestore();
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
        const db = getFirestore();
        if (id === undefined) {
            const data = doc(db, 'usuarios', user);
            getDoc(data).then((snapshot) => {
                setCategory(snapshot.data().vinos.map((element) => {
                    return element;
                }))
            })
        } else {
            const q = query(collection(db, "items"), where('category', '==', id));
            getDocs(q).then((res) => {
                setCategory(res.docs.map((doc) => ({ ...doc.data() })));
            })
        }
    }, [id])

    return (
        <>
            {category.map((producto) => (
                <Item producto={producto} />
            ))}
        </>
    )

}

export default ItemList

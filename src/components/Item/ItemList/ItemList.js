import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Item from './Item'
import { collection, getDocs, getFirestore, where, query } from "firebase/firestore"

const ItemList = ({ }) => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const db = getFirestore();

        const data = collection(db, "items");
        getDocs(data).then((snapshot) => {
            setCategory(snapshot.docs.map((element) => {
                if (id === undefined) {
                    return element.data();
                } else {
                    return element.category === id;
                }
            }))
        })

    }, [])

    useEffect(() => {
        const db = getFirestore();
        if (id === undefined) {
            const data = collection(db, "items");
            getDocs(data).then((snapshot) => {
                setCategory(snapshot.docs.map((element) => {
                    return element.data();
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

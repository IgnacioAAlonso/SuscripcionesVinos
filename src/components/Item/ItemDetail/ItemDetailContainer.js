import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ItemDetail from './ItemDetail'

const ItemDetailContainer = () => {

    const [producto, setProducto] = useState([]);
    const location = useLocation();
    const prod = location.state;

    useEffect(() => {
        getItem.then((res) => { setProducto(res) })
    }, [])

    const getItem = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(prod.producto)
        }, 2000)
    })

    return (
        <div>
            <ItemDetail item={producto} />
        </div>
    )
}

export default ItemDetailContainer

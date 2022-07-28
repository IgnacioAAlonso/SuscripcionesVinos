import React, { useState } from 'react'
import { NavLink as Link } from 'react-router-dom';
import ItemCount from '../ItemCount'


/* function useEventLi(eventType, handler) {
    
    useEffect(() => {
        window.addEventListener(eventType, handler);
        return () => {
            window.removeEventListener(eventType, handler);
        }
    }, [])
} */

const Item = ({ producto }) => {
    const { nombreDelVino,
        productor,
        region,
        tipoDeVino,
        variedadDeUva,
        alcohol,
        cosecha,
        precio,
        profundidadDelColor,
        tonalidadDelColor,
        limpidez,
        intensidadDelAroma,
        aromas,
        secoDulce,
        cuerpo,
        acidez,
        taninosNivel,
        taninosTipo,
        intensidadDelSabor,
        sabores,
        final,
        conclusiones,
        calificacion,
        imagen,
        id } = producto;

    return (
        <>
            <div class="card card_item" style={{ width: '18rem' }}>
                <Link to={{
                    pathname: `/item/${id}`
                }}
                    state={{ producto }}
                >
                    <img src={imagen} class="card-img-top imagen_item" alt="Catalogo" />
                </Link>
                <div class="card-body card__bodyItem">
                    <h5 class="card-title">{nombreDelVino}</h5>
                    <p class="card-text">{tipoDeVino}</p>
                </div>
            </div >
        </>
    )
}

export default Item

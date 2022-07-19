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
    const { id, title, description, price, stock, pictureUrl } = producto;
    let [state, setState] = useState(1);
    let [stk, setStock] = useState(stock);
    return (
        <>
            {(stk > 0) ?
                (<div class="card card_item" style={{ width: '18rem' }}>
                    <Link to={{
                        pathname: `/item/${id}`
                    }}
                        state={{ producto }}
                    >
                        <img src={pictureUrl} class="card-img-top imagen_item" alt="Catalogo" />
                    </Link>
                    <div class="card-body card__bodyItem">
                        <h5 class="card-title">{title}</h5>
                        <p class="card-text">{description}</p>
                        <ItemCount stock={stock} type="card" producto={producto} state={state} setState={setState} />
                    </div>
                </div >)
                :
                (<div class="card card_item--inhabilitado" style={{ width: '18rem' }}>
                    <img src={pictureUrl} class="card-img-top imagen_item" alt="Catalogo" />
                    <div class="card-body card__bodyItem">
                        <h5 class="card-title">{title}</h5>
                        <p class="card-text">{description}</p>
                        <ItemCount stock={stock} type="card" producto={producto} state={0} setState={setState} />
                    </div>
                </div >)
            }
        </>
    )
}

export default Item

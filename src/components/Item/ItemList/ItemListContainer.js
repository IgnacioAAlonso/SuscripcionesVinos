import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {

    return (
        <>
            <div className="cotenedor__categorias">
                <Link to="/category/batman"><button>Batman</button></Link>
                <Link to="/category/spiderman"><button>Spider-Man</button></Link>
                <Link to="/category/xmen"><button>X-Men</button></Link>
                <Link to="/colecciones"><button>Todas</button></Link>
            </div>
            <div class="container">
                <div class="row" style={{ display: 'flex', justifyContent: 'center' }}>
                    <ItemList />
                </div>
            </div >
        </>
    )
}

export default ItemListContainer;
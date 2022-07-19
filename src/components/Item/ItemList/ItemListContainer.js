import React from 'react'
import { NavLink as Link } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {

    /*  const [producto, setProductos] = useState([]);
 
     useEffect(() => {
         const db = getFirestore();
 
         const data = collection(db, "items");
         getDocs(data).then((snapshot) => {
             console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
         })
     }, [])
 
     const productos = [
         {
             id: 1,
             title: "Figura Batman – Dawn of Justice: Batman",
             description: "Figura de Batman: El Amanecer de la Justicia.",
             price: 100,
             stock: 10,
             cantidad: 1,
             pictureUrl: "https://i0.wp.com/www.coheto.com/wp-content/uploads/2019/07/figura-batman-v-superman-batman.jpg?fit=800%2C800&ssl=1",
             category: "batman"
         },
         {
             id: 2,
             title: "Figura DC Movie Gallery Batman 1989",
             description: "Estatua de PVC de la línea 'DC Gallery'",
             price: 150,
             stock: 8,
             cantidad: 1,
             pictureUrl: "https://www.eltemplodelguerrero.com/images/large/d/Batman-1989-Figura-Batman-DC-Movie-Gallery-Diamond-Select_LRG.jpg",
             category: "batman"
         },
         {
             id: 3,
             title: "Figura Batman Decades Through The Ages",
             description: "Batman en su primera aparición en el número 27 de Detective Comics.",
             price: 200,
             stock: 30,
             cantidad: 1,
             pictureUrl: "https://comicsbarcelona.com/80427-large_default/figura-batman-primera-aparicion-anos-40-eaglemoss-comprar.jpg",
             category: "batman"
         },
         {
             id: 4,
             title: "Figura Batman – The Dark Knight",
             description: "Figura de la segunda película, El Caballero Oscuro.",
             price: 670,
             stock: 20,
             cantidad: 1,
             pictureUrl: "https://collectoys.es/8947/figura-batman-sh-figuarts-the-dark-knight-bandai.jpg",
             category: "batman"
         },
         {
             id: 5,
             title: "Figura Armadura Batman vs Superman",
             description: "Figura de Batman de la Película Batman V Superman.",
             price: 500,
             stock: 3,
             cantidad: 1,
             pictureUrl: "https://dejadepensar.com/wp-content/uploads/2018/01/disfraz-armadura-batman-vs-superman.jpg",
             category: "batman"
         },
         {
             id: 6,
             title: "Marvel's Spider-Man",
             description: "Figura basada en el juego de PS4",
             price: 500,
             stock: 3,
             cantidad: 1,
             pictureUrl: "https://media.vandal.net/i/853x853/10-2019/201910211024434_1.jpg",
             category: "spiderman"
         },
         {
             id: 7,
             title: "Figura Spider-Man Diamond Marvel",
             description: "Marvel y Avengers: tal y como aparece en Spider-Man Homecoming.",
             price: 500,
             stock: 3,
             cantidad: 1,
             pictureUrl: "https://lafrikileria.com/40630-large_default/figura-spider-man-diamond-marvel-gallery-25-cm.jpg",
             category: "spiderman"
         },
         {
             id: 8,
             title: "Marvel Comics Ciclope",
             description: "Kotobukiya nos presenta una nueva figura de línea 'Marvel Comics'",
             price: 500,
             stock: 3,
             cantidad: 1,
             pictureUrl: "https://toystnt.com/pictures/4ac37319573efdb0b73fb379c123c85d.jpg",
             category: "xmen"
         }
     ]; */

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
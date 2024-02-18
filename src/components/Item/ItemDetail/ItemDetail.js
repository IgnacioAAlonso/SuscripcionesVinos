import React, { useState, useContext } from 'react'
import "../Item.css"
import ItemCount from '../ItemCount'
import CartContext from '../../Carrito/context/CartContext';
import { addDoc, collection, getFirestore, getDocs, doc, where, query, updateDoc } from 'firebase/firestore';

const ItemDetail = ({ item, type }) => {

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
        bodega,
        id } = item;
    let arrayVinos = [];
    const carrito = useContext(CartContext).carrito;
    const db = getFirestore();
    const user = useContext(CartContext).orderId;
    let [tipoVino, setTipoVino] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        const newItem = {
            nombreDelVino: e.target[0].value !== '' ? e.target[0].value : nombreDelVino,
            bodega: e.target[4].value !== '' ? e.target[4].value : bodega,
            productor: '',
            region: '',
            tipoDeVino: e.target[1].value !== '' ? e.target[1].value : tipoDeVino,
            variedadDeUva: e.target[2].value !== '' ? e.target[2].value : variedadDeUva,
            alcohol: '',
            cosecha: '',
            precio: e.target[3].value !== '' ? e.target[3].value : precio,
            profundidadDelColor: '',
            tonalidadDelColor: '',
            limpidez: '',
            intensidadDelAroma: '',
            aromas: '',
            secoDulce: '',
            cuerpo: '',
            acidez: '',
            taninosNivel: '',
            taninosTipo: '',
            intensidadDelSabor: '',
            sabores: '',
            final: '',
            conclusiones: e.target[5].value !== '' ? e.target[5].value : conclusiones,
            calificacion: e.target[6].value !== '' ? e.target[6].value : calificacion,
            imagen: e.target[7].value !== '' ? e.target[7].value : imagen,
            id: id
        }

        document.getElementById("miForm").reset();

        const data = collection(db, "usuarios");
        const userRef = doc(db, 'usuarios', user);
        getDocs(data).then((snapshot) => {
            snapshot.docs.map((element) => {
                if (user === element.id) {
                    element.data().vinos.map((vino) => {
                        if (id === vino.id) {
                            arrayVinos.push(newItem)
                        } else {
                            arrayVinos.push(vino)
                        }
                    })
                }
            })
        }).then(() => updateDoc(userRef, {
            vinos: arrayVinos
        }))

        arrayVinos = []
    }

    const consthandleChange = (event) => {
        console.log(event.target.value)
        setTipoVino(event.target.value)
        console.log(tipoVino)
    }

    const Details = () => {
        return (
            <>
                <div class="item__contenedor__item">
                    <h5 class="tituloDetalles">{nombreDelVino}</h5>

                    <div class="contenedor__item">
                        <div class="contenedor__detalles">
                            <div class="contenedor__detalles-item">
                                <p> <b>Comentarios:</b> {conclusiones}</p>
                                <p> <b>Precio:</b> ${precio}</p>
                                <p> <b>{tipoDeVino} </b> - {variedadDeUva}</p>
                                <p> <b>Bodega: </b> {bodega}</p>
                                <p> <b>Calificación: </b> {calificacion}</p>
                            </div>

                            <div class="contenedor__detalles-imagen">
                                <img src={imagen} class="contenedor__detalles-imagen-img" alt="Imagen Item" />
                            </div>
                        </div>
                        {/*
                        <div class="contenedor__tecnica">
                            <h5 class="contenedor__tecnica-titulo">Información Técnica:</h5>
                            <div>
                                <p> <b>Productor:</b> {productor}</p>
                                <p><b>Región: </b>{region}</p>
                                <p><b>Alcohol: </b>{alcohol}%</p>
                                <p><b>Cosecha: </b>{cosecha}</p>
                                <p><b>Profundidad Del Color: </b>{profundidadDelColor}</p>
                                <p><b>tonalidad Del Color: </b>{tonalidadDelColor}</p>
                                <p><b>limpidez: </b>{limpidez}</p>
                                <p><b>intensidad De lAroma: </b>{intensidadDelAroma}</p>
                                <p><b>aromas: </b>{aromas}</p>
                                <p><b>Seco-Dulce: </b>{secoDulce}</p>
                                <p><b>cuerpo: </b>{cuerpo}</p>
                                <p><b>acidez: </b>{acidez}</p>
                                <p><b>Taninos Nivel: </b>{taninosNivel}</p>
                                <p><b>taninos Tipo: </b>{taninosTipo}</p>
                                <p><b>intensidad Del Sabor: </b>{intensidadDelSabor}</p>
                                <p><b>sabores: </b>{sabores}</p>
                                <p><b>final: </b>{final}</p>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div class="accordionType__item">
                    <div >
                        <h2 class="accordionType__item-collapsed" id="flush-headingOne">
                            <button class="collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                EDITAR DATOS
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordionType">    
                            <div class="cart-form-vino-accordion">
                                <h5 class="logIn">Datos del Vino</h5>
                                <form id="miForm" onSubmit={handleSubmit}>
                                    <div class="row g-3 align-items-center">

                                        <div class="col-12 col-md-8">
                                            <label for="exampleInputPassword1" class="form-label">Nombre del Vino</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <label for="exampleInputPassword1" class="form-label">Tipo de Vino</label>
                                            <select onChange={consthandleChange} type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Tinto">Tinto</option>
                                                <option value="Blanco">Blanco</option>
                                                <option value="Rosado">Rosado</option>
                                                <option value="Espumante">Espumante</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <label for="exampleInputPassword1" class="form-label">Variedad de Uva</label>
                                            {(tipoVino === 'Tinto') ?
                                                <select type="text" class="form-control">
                                                    <option value="">-</option>
                                                    <option value="Blend">Blend</option>
                                                    <option value="Bonarda">Bonarda</option>
                                                    <option value="Cabernet Franc">Cabernet Franc</option>
                                                    <option value="Cabernet Sauvignon">Cabernet Sauvignon</option>
                                                    <option value="Garnacha">Garnacha</option>
                                                    <option value="Malbec">Malbec</option>
                                                    <option value="Merlot">Merlot</option>
                                                    <option value="Pinot Noir">Pinot Noir</option>
                                                    <option value="Petit Verdot">Petit Verdot</option>
                                                    <option value="Sangoviese">Sangoviese</option>
                                                    <option value="Syrah">Syrah</option>
                                                    <option value="Tannat">Tannat</option>
                                                    <option value="Tempranillo">Tempranillo</option>
                                                </select>
                                                : (tipoVino === 'Blanco') ?
                                                    <select type="text" class="form-control">
                                                        <option value="">-</option>
                                                        <option value="Chardonnay">Chardonnay</option>
                                                        <option value="Gewürztraminer">Gewürztraminer</option>
                                                        <option value="Pinot Gris">Pinot Gris</option>
                                                        <option value="Riesling">Riesling</option>
                                                        <option value="Sauvignon Blanc">Sauvignon Blanc</option>
                                                        <option value="Semillón">Semillón</option>
                                                        <option value="Torrontés">Torrontés</option>
                                                        <option value="Viognier">Viognier</option>
                                                    </select>
                                                    :
                                                    <select type="text" class="form-control">
                                                        <option value="">-</option>
                                                    </select>
                                            }

                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">Precio</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12 col-md-8">
                                            <label for="exampleInputPassword1" class="form-label">Bodega</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12">
                                            <label for="exampleInputEmail1" class="form-label">CONCLUSIONES</label>
                                            <textarea type="textarea" class="form-control"></textarea>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">CALIFICACIÓN</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12">
                                            <label for="exampleInputPassword1" class="form-label">Imagen (url)</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        </div>
                                        <button type="submit" class="form-button mt-3">Enviar</button>
                                        <div id="miFormAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                                            Datos cargados con éxito
                                        </div>
                                        <div id="miNotFormAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                                            Faltan datos por cargar
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {(() => {
                switch (type) {
                    case "details": return <Details />;
                    default: return <Details />;
                }
            })()}
        </>
    )
}

export default ItemDetail

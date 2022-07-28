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
            productor: e.target[1].value !== '' ? e.target[1].value : productor,
            region: e.target[2].value !== '' ? e.target[2].value : region,
            tipoDeVino: e.target[3].value !== '' ? e.target[3].value : tipoDeVino,
            variedadDeUva: e.target[4].value !== '' ? e.target[4].value : variedadDeUva,
            alcohol: e.target[5].value !== '' ? e.target[5].value : alcohol,
            cosecha: e.target[6].value !== '' ? e.target[6].value : cosecha,
            precio: e.target[7].value !== '' ? e.target[7].value : precio,
            profundidadDelColor: e.target[8].value !== '' ? e.target[8].value : profundidadDelColor,
            tonalidadDelColor: e.target[9].value !== '' ? e.target[9].value : tonalidadDelColor,
            limpidez: e.target[10].value !== '' ? e.target[10].value : limpidez,
            intensidadDelAroma: e.target[11].value !== '' ? e.target[11].value : intensidadDelAroma,
            aromas: e.target[12].value !== '' ? e.target[12].value : aromas,
            secoDulce: e.target[13].value !== '' ? e.target[13].value : secoDulce,
            cuerpo: e.target[14].value !== '' ? e.target[14].value : cuerpo,
            acidez: e.target[15].value !== '' ? e.target[15].value : acidez,
            taninosNivel: e.target[16].value !== '' ? e.target[16].value : taninosNivel,
            taninosTipo: e.target[17].value !== '' ? e.target[17].value : taninosTipo,
            intensidadDelSabor: e.target[18].value !== '' ? e.target[18].value : intensidadDelSabor,
            sabores: e.target[19].value !== '' ? e.target[19].value : sabores,
            final: e.target[20].value !== '' ? e.target[20].value : final,
            conclusiones: e.target[21].value !== '' ? e.target[21].value : conclusiones,
            calificacion: e.target[22].value !== '' ? e.target[22].value : calificacion,
            imagen: e.target[23].value !== '' ? e.target[23].value : imagen,
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
                <h5 class="tituloDetalles">{nombreDelVino}</h5>

                <div >
                    <div class="contenedor__detalles">
                        <div class="contenedor__detalles-item">
                            <p class="contenedor__detalles-item-tituloComentarios">Comentarios</p>
                            <p class="contenedor__detalles-item-comentarios">{conclusiones}</p>
                            <p >Precio: ${precio}</p>
                            <p >{tipoDeVino} - {variedadDeUva}</p>
                            <p >Calificación: {calificacion}</p>
                        </div>

                        <div class="contenedor__detalles-imagen">
                            <img src={imagen} class="contenedor__detalles-imagen-img" alt="Imagen Item" />
                        </div>
                    </div>

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
                    </div>
                </div>

                <div class="accordion-item accordionType">
                    <div class="accordion-itemaccordionType-bar">
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed accordionType-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                EDITAR DATOS
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="cart-form">
                                <h5>Datos del Vino:</h5>
                                <form id="miForm" onSubmit={handleSubmit}>
                                    <div class="row g-3 align-items-center">

                                        <div class="col-8">
                                            <label for="exampleInputPassword1" class="form-label">Nombre del Vino</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-8">
                                            <label for="exampleInputPassword1" class="form-label">Productor</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-8">
                                            <label for="exampleInputPassword1" class="form-label">Región</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-6">
                                            <label for="exampleInputPassword1" class="form-label">Tipo de Vino</label>
                                            <select onChange={consthandleChange} type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Tinto">Tinto</option>
                                                <option value="Blanco">Blanco</option>
                                                <option value="Rosado">Rosado</option>
                                                <option value="Espumante">Espumante</option>
                                            </select>
                                        </div>

                                        <div class="col-6">
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

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">Alcohol</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">Cosecha</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">Precio</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">PROFUNDIDAD DEL COLOR:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Acuoso">Acuoso</option>
                                                <option value="Pálido">Pálido</option>
                                                <option value="Mediano">Mediano</option>
                                                <option value="Profundo">Profundo</option>
                                                <option value="Oscuro">Oscuro</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">TONALIDAD DE COLOR:</label>
                                            {(tipoVino === 'Tinto') ?
                                                <select type="text" class="form-control">
                                                    <option value="">-</option>
                                                    <option value="Rojo-Púrpura">Rojo-Púrpura</option>
                                                    <option value="Rubí">Rubí</option>
                                                    <option value="Granate">Granate</option>
                                                    <option value="Ladrillo">Ladrillo</option>
                                                    <option value="Marrón">Marrón</option>
                                                </select>
                                                : (tipoVino === 'Rosado') ?
                                                    <select type="text" class="form-control">
                                                        <option value="">-</option>
                                                        <option value="Rosa">Rosa</option>
                                                        <option value="Salmón">Salmón</option>
                                                        <option value="Rosa Anaranjado">Rosa Anaranjado</option>
                                                    </select>
                                                    :
                                                    <select type="text" class="form-control">
                                                        <option value="">-</option>
                                                        <option value="Verdoso">Verdoso</option>
                                                        <option value="Amarillo">Amarillo</option>
                                                        <option value="Amarillo Paja">Amarillo Paja</option>
                                                        <option value="Dorado">Dorado</option>
                                                        <option value="Ámbar">Ámbar</option>
                                                    </select>
                                            }
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">LIMPIDEZ:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Brillante">Brillante</option>
                                                <option value="Cristalino">Cristalino</option>
                                                <option value="Limpio">Limpio</option>
                                                <option value="Apagado">Apagado</option>
                                                <option value="Turbio">Turbio</option>
                                                <option value="Nublado">Nublado</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">INTENSIDAD DEL AROMA:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Débil">Débil</option>
                                                <option value="Moderado">Moderado</option>
                                                <option value="Aromático">Aromático</option>
                                                <option value="Potente">Potente</option>
                                            </select>
                                        </div>

                                        <div class="col-6">
                                            <label for="exampleInputPassword1" class="form-label">AROMAS:</label>
                                            <textarea type="text" class="form-control"></textarea>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">SECO/DULCE:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Muy Seco">Muy Seco</option>
                                                <option value="Seco">Seco</option>
                                                <option value="Semi-Seco">Semi-Seco</option>
                                                <option value="Abocado">Abocado</option>
                                                <option value="Dulce">Dulce</option>
                                            </select>
                                        </div>


                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">CUERPO:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Muy Liviano">Muy Liviano</option>
                                                <option value="Liviano">Liviano</option>
                                                <option value="Medio">Medio</option>
                                                <option value="Mucho Cuerpo">Mucho Cuerpo</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">ACIDEZ:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Excesivo">Excesivo</option>
                                                <option value="Ácido">Ácido</option>
                                                <option value="Vivo">Vivo</option>
                                                <option value="Fresco">Fresco</option>
                                                <option value="Suave">Suave</option>
                                                <option value="Flojo">Flojo</option>
                                            </select>
                                        </div>

                                        <div class="col-5">
                                            <label for="exampleInputPassword1" class="form-label">TANINOS NIVEL:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Ninguno">Ninguno</option>
                                                <option value="Débil">Débil</option>
                                                <option value="Mediano">Mediano</option>
                                                <option value="Alto">Alto</option>
                                            </select>
                                        </div>

                                        <div class="col-5">
                                            <label for="exampleInputPassword1" class="form-label">TANINOS TIPO:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Suave">Suave</option>
                                                <option value="Astringente">Astringente</option>
                                                <option value="Duro">Duro</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">INTENSIDAD DEL SABOR:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Débil">Débil</option>
                                                <option value="Moderado">Moderado</option>
                                                <option value="Potente">Potente</option>
                                            </select>
                                        </div>

                                        <div class="col-6">
                                            <label for="exampleInputPassword1" class="form-label">SABORES:</label>
                                            <textarea type="text" class="form-control"></textarea>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">FINAL:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Corto (menos 3 seg)">Corto (menos 3 seg)</option>
                                                <option value="Mediano">Mediano (4-5)</option>
                                                <option value="Largo (5-7)">Largo (5-7)</option>
                                                <option value="Muy Largo (>8 seg)">Muy Largo (mas 8 seg)</option>
                                            </select>
                                        </div>

                                        <div class="col-12">
                                            <label for="exampleInputEmail1" class="form-label">CONCLUSIONES:</label>
                                            <textarea type="text" class="form-control"></textarea>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">CALIFICACIÓN:</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12">
                                            <label for="exampleInputPassword1" class="form-label">Imagen (URL)</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                    </div>
                                    <button type="submit" class="btn btn-primary mt-3">Enviar</button>
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

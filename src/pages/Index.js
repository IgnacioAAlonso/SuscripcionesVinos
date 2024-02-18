import React, { useState, useContext, useEffect } from "react";
import { NavLink as Link, withRouter } from 'react-router-dom';
import CartContext from "../components/Carrito/context/CartContext";
import { addDoc, collection, getFirestore, getDocs, doc, where, query, updateDoc } from 'firebase/firestore';
import Icon from "../images/user-icon.png";
import '../App.css'


const Home = ({ setIsNavbarActive }) => {

    const setUser       = useContext(CartContext).addOrder;
    const user          = useContext(CartContext).orderId;
    let [usuario, setUsuario] = useState(false);
    let [vino, setVino] = useState(false);
    let [tipoVino, setTipoVino] = useState();
    let [arrayVinos, setVinos] = useState();
    let [opinion, setOpinion] = useState();
    const db = getFirestore();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    var randomstring = require("randomstring");

    const submitUsuario = (e) => {
        e.preventDefault()
        const newUsuario = e.target[0].value
        const newItem = { usuario: e.target[0].value }
        if (e.target[0].value.length > 0) {
            const data = collection(db, "usuarios");
            var creado = false;
            getDocs(data).then((snapshot) => {
                snapshot.docs.map((element) => {
                    if (newUsuario === element.data().usuario) {
                        creado = true;
                        document.getElementById("miForm").reset();
                        document.getElementById("miNotUsuarioAlert").classList.remove('hidenClass');
                        document.getElementById("miNotUsuarioAlert").classList.add('showClass');
                        document.getElementById("miUsuarioAlert").classList.remove('showClass');
                        document.getElementById("miUsuarioAlert").classList.add('hidenClass');
                    }
                })
            }).then(() => {
                if (creado === false) {
                    addDoc(data, newItem).then(() => {
                        setUsuario(true);
                        setUser(newUsuario);
                        document.getElementById("miForm").reset();
                        document.getElementById("miUsuarioAlert").classList.remove('hidenClass');
                        document.getElementById("miNotUsuarioAlert").classList.remove('showClass');
                        document.getElementById("miUsuarioAlert").classList.add('showClass');
                        document.getElementById("miNotUsuarioAlert").classList.add('hidenClass');
                    })
                }
            })
        }
        else {
            setUsuario(false);
            document.getElementById("miNotFormAlert").classList.remove('hidenClass');
            document.getElementById("miNotFormAlert").classList.add('showClass');
            document.getElementById("miFormAlert").classList.remove('showClass');
            document.getElementById("miFormAlert").classList.add('hidenClass');
        }
    }

    const submitLogIn = (e) => {
        e.preventDefault()
        const newUsuario = e.target[0].value.toLowerCase();
        if (e.target[0].value.length > 0) {
            const data = collection(db, "usuarios");
            var creado = false;
            getDocs(data).then((snapshot) => {
                snapshot.docs.map((element) => {
                    if (newUsuario === element.data().usuario) {
                        setIsNavbarActive(true);
                        creado = true;
                        setUsuario(true);
                        setUser(element.id);
                        setVinos(element.data().vinos)
                        document.getElementById("miForm").reset();
                    }
                })
            }).then(() => {
                if (creado === false) {
                    document.getElementById("miForm").reset();
                    document.getElementById("miLogInAlert").classList.remove('hidenClass');
                    document.getElementById("miLogInAlert").classList.add('showClass');
                }
            })
        }
        else {
            setUsuario(false);
            document.getElementById("miNotFormAlert").classList.remove('hidenClass');
            document.getElementById("miNotFormAlert").classList.add('showClass');
            document.getElementById("miFormAlert").classList.remove('showClass');
            document.getElementById("miFormAlert").classList.add('hidenClass');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let result = randomstring.generate(30);
        const newItem = {
            nombreDelVino: e.target[0].value,
            productor: e.target[1].value,
            region: e.target[2].value,
            tipoDeVino: e.target[3].value,
            variedadDeUva: e.target[4].value,
            alcohol: e.target[5].value,
            cosecha: e.target[6].value,
            precio: e.target[7].value,
            profundidadDelColor: e.target[8].value,
            tonalidadDelColor: e.target[9].value,
            limpidez: e.target[10].value,
            intensidadDelAroma: e.target[11].value,
            aromas: e.target[12].value,
            secoDulce: e.target[13].value,
            cuerpo: e.target[14].value,
            acidez: e.target[15].value,
            taninosNivel: e.target[16].value,
            taninosTipo: e.target[17].value,
            intensidadDelSabor: e.target[18].value,
            sabores: e.target[19].value,
            final: e.target[20].value,
            conclusiones: e.target[21].value,
            calificacion: e.target[22].value,
            imagen: e.target[23].value,
            id: result
        }

        if (e.target[0].value.length > 0) {
            setOpinion(newItem)
            setVino(true);
            document.getElementById("miForm").reset();
            document.getElementById("miFormAlert").classList.remove('hidenClass');
            document.getElementById("miFormAlert").classList.add('showClass');
            document.getElementById("miNotFormAlert").classList.remove('showClass');
            document.getElementById("miNotFormAlert").classList.add('hidenClass');
        }
        else {
            setVino(false);
            document.getElementById("miNotFormAlert").classList.remove('hidenClass');
            document.getElementById("miNotFormAlert").classList.add('showClass');
            document.getElementById("miFormAlert").classList.remove('showClass');
            document.getElementById("miFormAlert").classList.add('hidenClass');
        }
    }

    const handleSubmitBasico = (e) => {
        e.preventDefault()
        let result = randomstring.generate(30);
        const newItem = {
            nombreDelVino: e.target[0].value,
            bodega: e.target[4].value,
            productor: '',
            region: '',
            tipoDeVino: e.target[1].value,
            variedadDeUva: e.target[2].value,
            alcohol: '',
            cosecha: '',
            precio: e.target[3].value,
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
            conclusiones: e.target[5].value,
            calificacion: e.target[6].value,
            imagen: e.target[7].value,
            id: result
        }

        if (e.target[0].value.length > 0) {
            if (user){
                const data = collection(db, "usuarios");
                getDocs(data).then((snapshot) => {
                    snapshot.docs.map((element) => {
                        if (user === element.id) {
                            setUser(element.id);
                            setVinos(element.data().vinos)
                        }
                    })
                })
            }

            setOpinion(newItem);
            setVino(true);
            document.getElementById("miForm").reset();
            document.getElementById("miFormAlert").classList.add('form-button-dis');
            document.getElementById("miNotFormAlert").classList.remove('showClass');
            document.getElementById("miNotFormAlert").classList.add('hidenClass');
        }
        else {
            setVino(false);
            document.getElementById("miNotFormAlert").classList.remove('hidenClass');
            document.getElementById("miNotFormAlert").classList.add('showClass');
        }
    }

    const consthandleChange = (event) => {
        setTipoVino(event.target.value)
    }

    const finalizeWineLoading = (e) => {
        const userRef = doc(db, 'usuarios', user);
        arrayVinos.push(opinion);
        updateDoc(userRef, {
            vinos: arrayVinos
        });
    }

    return (
        <div class="contenedorAll">
            {(user) ?

                /*<div class="accordion accordion-flush accordionType" id="accordionFlushExample">
                    <div class="accordion-itemaccordionType-bar">
                        <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed accordionType-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                CARGAR VINO - BASICO
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">*/
                        <div class="accordionType">    
                            <div class="cart-form-vino">
                                <h5 class="logIn">Datos del Vino</h5>
                                <form id="miForm" onSubmit={handleSubmitBasico}>
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

                                    <div class="cart-form-vino-button">
                                        <button id="miFormAlert" type="submit" class="mt-3 form-button">Cargar Vino</button>

                                        {(vino) ?
                                            (<Link to={{
                                                pathname: `/colecciones`
                                            }} onClick={() => {
                                                const userRef = doc(db, 'usuarios', user);
                                                arrayVinos.push(opinion);
                                                updateDoc(userRef, {
                                                    vinos: arrayVinos
                                                })
                                            }}>
                                                <button type="button" id="form-button-vino" class="mt-3 form-button" data-bs-dismiss="offcanvas"> Finalizar Carga </button>
                                            </Link>)
                                            :
                                            (<button  type="button" class="mt-3 form-button-dis"> Finalizar Carga </button>)
                                        }
                                    </div>

                                    <div id="miNotFormAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                                        Faltan datos por cargar
                                    </div>
                                </form>
                            </div>
                        </div>
                        /*</div>
    
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed accordionType-button" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                CARGAR VINO - AVANZADO
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="cart-form">
                                <h5 class="logIn">Datos del Vino</h5>
                                <form id="miForm" onSubmit={handleSubmit}>
                                    <div class="row g-3 align-items-center">

                                        <div class="col-12 col-md-8">
                                            <label for="exampleInputPassword1" class="form-label">Nombre del Vino</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12 col-md-8">
                                            <label for="exampleInputPassword1" class="form-label">Productor</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12  col-md-8">
                                            <label for="exampleInputPassword1" class="form-label">Región</label>
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

                                        <div class="col-12  col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">Alcohol</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">Cosecha</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">Precio</label>
                                            <input type="text" class="form-control"></input>
                                        </div>

                                        <div class="col-12 col-md-4">
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

                                        <div class="col-12 col-md-4">
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

                                        <div class="col-12 col-md-4">
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

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">INTENSIDAD DEL AROMA:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Débil">Débil</option>
                                                <option value="Moderado">Moderado</option>
                                                <option value="Aromático">Aromático</option>
                                                <option value="Potente">Potente</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <label for="exampleInputPassword1" class="form-label">AROMAS:</label>
                                            <textarea type="text" class="form-control"></textarea>
                                        </div>

                                        <div class="col-12 col-md-4">
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


                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">CUERPO:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Muy Liviano">Muy Liviano</option>
                                                <option value="Liviano">Liviano</option>
                                                <option value="Medio">Medio</option>
                                                <option value="Mucho Cuerpo">Mucho Cuerpo</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-4">
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

                                        <div class="col-12 col-md-5">
                                            <label for="exampleInputPassword1" class="form-label">TANINOS NIVEL:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Ninguno">Ninguno</option>
                                                <option value="Débil">Débil</option>
                                                <option value="Mediano">Mediano</option>
                                                <option value="Alto">Alto</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-5">
                                            <label for="exampleInputPassword1" class="form-label">TANINOS TIPO:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Suave">Suave</option>
                                                <option value="Astringente">Astringente</option>
                                                <option value="Duro">Duro</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">INTENSIDAD DEL SABOR:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Débil">Débil</option>
                                                <option value="Moderado">Moderado</option>
                                                <option value="Potente">Potente</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <label for="exampleInputPassword1" class="form-label">SABORES:</label>
                                            <textarea type="text" class="form-control"></textarea>
                                        </div>

                                        <div class="col-12 col-md-4">
                                            <label for="exampleInputPassword1" class="form-label">FINAL:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="Corto (menos 3 seg)">Corto (menos 3 seg)</option>
                                                <option value="Mediano">Mediano (4-5)</option>
                                                <option value="Largo (5-7)">Largo (5-7)</option>
                                                <option value="Muy Largo (>8 seg)">Muy Largo (mas 8 seg)</option>
                                            </select>
                                        </div>

                                        <div class="col-12 col-md-12">
                                            <label for="exampleInputEmail1" class="form-label">CONCLUSIONES:</label>
                                            <textarea type="text" class="form-control"></textarea>
                                        </div>

                                        <div class="col-12 col-md-4">
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
                </div>*/
                :
                <div class="cart-form">
                    <h5 class="logIn">Ingresar Usuario</h5>
                    <form id="miForm" onSubmit={submitLogIn}>
                        <div class="row g-3 align-items-center">

                            <div class="col-12 col-md-4 form-box">
                                <img class="form-icon" src={Icon} alt="Icono de Usuario"/>
                                <label for="exampleInputPassword1" class="form-label"></label>
                                <input type="text" class="form-icon-control" placeholder="Usuario"></input>
                            </div>

                        </div>
                        <button type="submit" class="mt-3 form-button">Iniciar Sesión</button>
                        <div id="miLogInAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                            No existe el usuario
                        </div>
                    </form>
                </div>
            }
        </div>


    )
}

export default Home

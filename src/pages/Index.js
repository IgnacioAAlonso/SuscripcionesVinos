import React, { useState, useContext, useEffect } from "react";
import { NavLink as Link, withRouter } from 'react-router-dom';
import CartContext from "../components/Carrito/context/CartContext";
import { addDoc, collection, getFirestore, getDocs, doc, where, query, updateDoc } from 'firebase/firestore';
import '../App.css'

function useAddCarrito(eventType, handler) {
    useEffect(() => {

        window.addEventListener(eventType, handler);
        return () => {
            window.removeEventListener(eventType, handler);
        }
    }, [handler])
}

const Home = () => {

    const setUser = useContext(CartContext).addOrder;
    const user = useContext(CartContext).orderId;
    let [usuario, setUsuario] = useState(false);
    /*let [user, setUser] = useState();*/
    let [vino, setVino] = useState(false);
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
                    console.log(element.data().usuario)
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
        const newUsuario = e.target[0].value
        const newItem = { usuario: e.target[0].value }
        if (e.target[0].value.length > 0) {
            const data = collection(db, "usuarios");
            var creado = false;
            getDocs(data).then((snapshot) => {
                snapshot.docs.map((element) => {
                    console.log(element.data().usuario)
                    if (newUsuario === element.data().usuario) {
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
        console.log(e.target[0].value
            && e.target[3].value
            && e.target[21].value
            && e.target[23].value)

        if (e.target[0].value.length > 0
            && e.target[3].value.length > 0
            && e.target[21].value.length > 0
            && e.target[23].value.length > 0) {
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

    return (
        <div class="contenedorAll">
            {(user) ?

                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                CARGAR VINO - AVANZADO
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
                                            <select type="text" class="form-control">
                                                <option value=""></option>
                                                <option value="tinto">Tinto</option>
                                                <option value="blanco">Blanco</option>
                                                <option value="rosado">Rosado</option>
                                                <option value="espumante">Espumante</option>
                                            </select>
                                        </div>

                                        <div class="col-6">
                                            <label for="exampleInputPassword1" class="form-label">Variedad de Uva</label>
                                            <select type="text" class="form-control">
                                                <option value=""></option>
                                                <option value="malbec">Malbec</option>
                                                <option value="frank">Frank</option>
                                                <option value="pinotnoir">Pinot Noir</option>
                                            </select>
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
                                                <option value="acuoso">Acuoso</option>
                                                <option value="palido">Pálido</option>
                                                <option value="mediano">Mediano</option>
                                                <option value="Profundo">Profundo</option>
                                                <option value="Oscuro">oscuro</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">TONALIDAD DE COLOR:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="acuoso">Acuoso</option>
                                                <option value="palido">Pálido</option>
                                                <option value="mediano">Mediano</option>
                                                <option value="Profundo">Profundo</option>
                                                <option value="Oscuro">oscuro</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">LIMPIDEZ:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="brillante">brillante</option>
                                                <option value="cristalino">cristalino</option>
                                                <option value="limpio">limpio</option>
                                                <option value="apagado">apagado</option>
                                                <option value="turbio">turbio</option>
                                                <option value="nublado">nublado</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">INTENSIDAD DEL AROMA:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="débil">Débil</option>
                                                <option value="moderado">moderado</option>
                                                <option value="aromático">aromático</option>
                                                <option value="potente">potente</option>
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
                                                <option value="muy seco">muy seco</option>
                                                <option value="seco">seco</option>
                                                <option value="semi-seco">semi-seco</option>
                                                <option value="abocado">abocado</option>
                                                <option value="dulce">dulce</option>
                                            </select>
                                        </div>


                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">CUERPO:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="muy liviano">muy liviano</option>
                                                <option value="liviano">liviano</option>
                                                <option value="medio">medio</option>
                                                <option value="mucho cuerpo">mucho cuerpo</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">ACIDEZ:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="excesivo">excesivo</option>
                                                <option value="ácido">ácido</option>
                                                <option value="vivo">vivo</option>
                                                <option value="fresco">fresco</option>
                                                <option value="suave">suave</option>
                                                <option value="flojo">flojo</option>
                                            </select>
                                        </div>

                                        <div class="col-5">
                                            <label for="exampleInputPassword1" class="form-label">TANINOS NIVEL:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="ninguno">ninguno</option>
                                                <option value="débil">débil</option>
                                                <option value="mediano">mediano</option>
                                                <option value="alto">alto</option>
                                            </select>
                                        </div>

                                        <div class="col-5">
                                            <label for="exampleInputPassword1" class="form-label">TANINOS TIPO:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="suave">suave</option>
                                                <option value="astringente">astringente</option>
                                                <option value="duro">duro</option>
                                            </select>
                                        </div>

                                        <div class="col-4">
                                            <label for="exampleInputPassword1" class="form-label">INTENSIDAD DEL SABOR:</label>
                                            <select type="text" class="form-control">
                                                <option value="">-</option>
                                                <option value="débil">Débil</option>
                                                <option value="moderado">moderado</option>
                                                <option value="potente">potente</option>
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
                                                <option value="Corto">Corto (menos 3 seg) </option>
                                                <option value="mediano">mediano (4-5)</option>
                                                <option value="Largo (5-7)">Largo (5-7)</option>
                                                <option value=" muy largo (>8 seg)">muy largo (mas 8 seg)</option>
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
                                            <label for="exampleInputPassword1" class="form-label">Imagen</label>
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
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                CARGAR VINO - BASICO
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                        </div>
                    </div>
                </div>
                :
                <div class="cart-form">
                    <h5>Crear Usuario:</h5>
                    <form id="miForm" onSubmit={submitUsuario}>
                        <div class="row g-3 align-items-center">

                            <div class="col-4">
                                <label for="exampleInputPassword1" class="form-label">Nombre de Usuario:</label>
                                <input type="text" class="form-control"></input>
                            </div>

                        </div>
                        <button type="submit" class="btn btn-primary mt-3">Enviar</button>
                        <div id="miUsuarioAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                            Usuario cargado con éxito
                        </div>
                        <div id="miNotUsuarioAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                            Ya existe el usuario
                        </div>
                    </form>

                    <h5>Ingresar Usuario:</h5>
                    <form id="miForm" onSubmit={submitLogIn}>
                        <div class="row g-3 align-items-center">

                            <div class="col-4">
                                <label for="exampleInputPassword1" class="form-label">Nombre de Usuario:</label>
                                <input type="text" class="form-control"></input>
                            </div>

                        </div>
                        <button type="submit" class="btn btn-primary mt-3">Enviar</button>
                        <div id="miLogInAlert" class="alert alert-primary hidenClass mt-3" role="alert">
                            No existe el usuario
                        </div>
                    </form>
                </div>
            }
            <div class="cart-checkOut">
                {(vino) ?
                    (<Link to={{
                        pathname: `/colecciones`
                    }} onClick={() => {
                        const userRef = doc(db, 'usuarios', user);
                        arrayVinos.push(opinion)
                        updateDoc(userRef, {
                            vinos: arrayVinos
                        })
                        console.log(user);
                        /*
                        Link to={{
                        pathname: `/colecciones`
                    }}
                        getDocs(data).then((snapshot) => {
                snapshot.docs.map((element) => {
                    console.log(element.data().usuario)
                    if (newUsuario === element.data().usuario) {
                        creado = true;
                        setUsuario(true);
                        setUser(newUsuario);
                        document.getElementById("miForm").reset();
                    }
                })
            })

                        const data = doc(db, "usuarios")
                        updateDoc(data, order).then((res) => {
                            setOrder(res.id);
                        })*/
                    }}>
                        <button class="cart-checkOutTotalButton" data-bs-dismiss="offcanvas"> Cargar Vino </button>
                    </Link>)
                    :
                    (<div> </div>)
                }
            </div>
        </div>


    )
}

export default Home

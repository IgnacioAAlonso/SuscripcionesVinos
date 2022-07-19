import React from 'react'
import ItemListContainer from '../components/Item/ItemList/ItemListContainer'
import Titles from '../components/Titles'
import { NavLink as Link } from 'react-router-dom';
import '../App.css'

const Home = () => {

    return (
        <div class="contenedorAll">
            {/* <div style={{ display: 'flex', justifyContent: 'center', height: '10vh' }}>
                <Titles textoTitulo={"Inicio"}></Titles>
            </div> */}
            {/* <ItemListContainer /> */}
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://www.cuevadelobo.com/wp-content/uploads/2014/08/Batman-4.jpg" class="d-block w-100" alt="Banner Batman" />
                        <Link to="/colecciones">
                            <button class="carousel-itemButton">
                                Colecciones
                            </button>
                        </Link>
                    </div>
                    <div class="carousel-item">
                        <img src="https://cdn.wallpapersafari.com/5/93/R5lFOX.jpg" class="d-block w-100" alt="Banner SpiderMan" />
                        <Link to="/contacto">
                            <button class="carousel-itemButton">
                                Contacto
                            </button>
                        </Link>
                    </div>
                    <div class="carousel-item">
                        <img src="https://images.alphacoders.com/575/thumb-1920-575815.png" class="d-block w-100" alt="Banner Cyclops" />
                        <Link to="/nosotros">
                            <button class="carousel-itemButton">
                                Nosotros
                            </button>
                        </Link>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="contenedor__informacionBox">
                <div class="contenedor__informacion">
                    <div class="contenedor__informacionDiv">
                        <i class="fas fa-truck"></i>
                        <p class="contenedor__informacionTit">Envios a toda la Argentina </p>
                        <p class="contenedor__informacionSubTit">Envio con Mercado Libre o Correo</p>
                    </div>
                    <div class="contenedor__informacionDiv contenedor__informacionDiv">
                        <i class="fas fa-credit-card"></i>
                        <p class="contenedor__informacionTit">Pagá como quieras</p>
                        <p class="contenedor__informacionSubTit">Tarjetas, efectivo y más</p>
                    </div>
                    <div class="contenedor__informacionDiv contenedor__informacionDiv">
                        <i class="fas fa-shield-alt"></i>
                        <p class="contenedor__informacionTit">Comprá seguro</p>
                        <p class="contenedor__informacionSubTit">Simpre cuidamos tu medio de pago</p>
                    </div>
                </div>
            </div>

            <div class="contenedorBox">

                <div class="contenedorBox__square">
                    <div class="contenedorBox__textos">
                        <h3>Batman</h3>
                        <Link to="/category/batman">
                            <button>Ver Colección</button>
                        </Link>
                    </div>
                </div>

                <div class="contenedorBox__rectangle">

                    <div class="contenedorBox__rectangle-cat--1">
                        <div class="contenedorBox__textos">
                            <h3>Spider-Man</h3>
                            <Link to="/category/spiderman">
                                <button>Ver Colección</button>
                            </Link>
                        </div>
                    </div>

                    <div class="contenedorBox__rectangle-cat--2">
                        <div class="contenedorBox__textos">
                            <h3>X-Men</h3>
                            <Link to="/category/xmen">
                                <button>Ver Colección</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contenedorInfo">
                <div class="contenedorInfo__Redes">
                    <ul>
                        <li> <a href={'http://facebook.com'} target="_blank"> <i class="fab fa-facebook-f"></i> </a></li>
                        <li> <a href={'http://instagram.com'} target="_blank"> <i class="fab fa-instagram"></i> </a></li>
                        <li> <a href={'http://pinterest.com'} target="_blank"> <i class="fab fa-pinterest"></i> </a></li>
                    </ul>
                </div>

                <ul>
                    <li><i class="fab fa-whatsapp"></i> 5491124668858</li>
                    <li><i class="fas fa-phone"></i> 11 4322-1597</li>
                    <li><i class="far fa-envelope"></i> yokai@gmail.com.ar</li>
                    <li><i class="fas fa-map-marker-alt"></i> Lavalle 623 Local 10 - Viamonte 621 - Santa Fe 1714 Local 4</li>
                </ul>
            </div>
        </div>
    )
}

export default Home

import React from 'react'

const Contacto = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        document.getElementById("miFormContact").reset();
    }

    return (
        <div class="content">
            <h1 class="logo"> Contacto </h1>

            <div class="contact-wrapper">
                <div class="contact-form">
                    <form id="miFormContact" onSubmit={handleSubmit}>
                        <p>
                            <label>Nombre</label>
                            <input type="text" name="fullname"></input>
                        </p>
                        <p>
                            <label>Email</label>
                            <input type="email" name="emial"></input>
                        </p>
                        <p>
                            <label>Teléfono</label>
                            <input type="tel" name="telefono"></input>
                        </p>
                        <p>
                            <label>Asunto</label>
                            <input type="text" name="comentario"></input>
                        </p>
                        <p class="block">
                            <label>Comentario</label>
                            <textarea type="text" name="comentario" rows="3"></textarea>
                        </p>

                        <p class="block">
                            <button type="submit">Enviar</button>
                        </p>
                    </form>
                </div>
                <div class="contact-info">
                    <h3>Información</h3>

                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Lavalle 623 Local 10 - Viamonte 621 - Santa Fe 1714 Local 4</li>
                        <li><i class="fas fa-phone"></i> 11 4322-1597</li>
                        <li><i class="far fa-envelope"></i> yokai@gmail.com.ar</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Contacto

import React from 'react';
import './Contacto.css'

function Contacto({ nombre, apellido, publicaciones }) {
    return (
        <div className="contenedor">
            <div className="fila">
                <div className="columna">
                    Autor:
                </div>
                <div className="columna">
                    {nombre + ' ' + apellido}
                </div>
            </div>

            {
                publicaciones.map((item, index) => {
                    return (
                        <div className="fila">
                            <div className="columna">
                                Publicación {(index+1)}:
                            </div>
                            <div className="columna">
                                {item}
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
}

export default Contacto;

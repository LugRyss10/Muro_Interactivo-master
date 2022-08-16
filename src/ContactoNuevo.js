import React, { useRef, useState, useEffect } from 'react';
import { getDoc, doc, updateDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { baseDeDato } from "./ConfiguracionFirebase";
import './Contacto';
import Login from './Login';
import Registro from './Registrarse';
import { getAuth } from "firebase/auth";




function ContactoNuevo() {


    return (
        <div>
            <Registro />
            <Login />
            <Publicaciones />
        </div>

    );
}
function BuscarUsuario() {
    const [Registros, setRegistros] = useState([]);
    const [NombreCompleto, setNombreCompleto] = useState("");
    var count = 0;
    useEffect(() => {


        const listado = [];
        baseDeDato.collection('registros')
            .get()
            .then(resultado => {
                resultado.forEach(contacto => {
                    listado.push(contacto.data());
                })
                setRegistros(listado);
            }).catch(error => console.log(error));
        try {
            const auth = getAuth();
            const user = auth.currentUser.email;

            Registros && Registros.slice().reverse().map((item, i) => {
                const { nombre, apellido, publicaciones, usuario } = item;
                var Tnombre = nombre;
                var Tapellido = apellido;
                if (usuario === user) {
                    setNombreCompleto(Tnombre + ' ' + Tapellido);
                }


            })
        } catch (error) {
            setNombreCompleto("");
        }



    }, [count]);

    if (NombreCompleto == "") {
        count++;
    }

    return (
        NombreCompleto
    )
}

function Publicaciones({ agregarNuevoContacto }) {
    const nombreRef = useRef(null);
    const postRef = useRef(null);
    const [identificadores, setIdentidicadores] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioActual, setUsuarioActual] = useState("");

    const agregarContacto = () => {
        var id = [];
        var users = [];

        baseDeDato.collection('registros')
            .get()
            .then(resultado => {
                resultado.forEach(contacto => {
                    id.push(contacto.id);
                    users.push(contacto.data().usuario);
                })
                setIdentidicadores(id);
                setUsuarios(users);
            }).catch(error => console.log(error));
        //console.log(identificadores);
        //console.log(usuarios);
        const auth = getAuth();
        const user = auth.currentUser.email;
        setUsuarioActual(user);

        for (let i = 0; i < usuarios.length; i++) {
            //console.log(user + ' ' + usuarios[i]);

            if (usuarios[i] == usuarioActual) {
                const washingtonRef = doc(baseDeDato, "registros", identificadores[i]);
                updateDoc(washingtonRef, {
                    publicaciones: firebase.default.firestore.FieldValue.arrayUnion(postRef.current.value)
                }).then(() => {
                    alert("Publicación enviada con éxito")
                })

            }
        }

    }

    return (

        <div className='contenedor'>

            <h3>Publicar</h3>
            

            <div className="fila">
                <div className="columna">
                    Post:
                </div>
                <div className="columna">
                    <input type="text" ref={postRef} className="texto" />
                </div>
            </div>

            <div className="fila">
                <div className="columna">
                    <button className="boton" onClick={agregarContacto}>Agregar</button>
                </div>
            </div>

        </div >

    );
}

export default ContactoNuevo;

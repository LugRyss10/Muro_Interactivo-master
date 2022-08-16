import React, { useRef } from 'react';
import './Contacto.css';
import { baseDeDato } from "./ConfiguracionFirebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



function Registro() {
    const RegistroUsuarioRef = useRef(null);
    const RegistroContraRef = useRef(null);
    const RegistronombreRef = useRef(null);
    const RegistroApellidoRef = useRef(null);

    const agregarCuenta = () => {
        const registro = {
            nombre: RegistronombreRef.current.value,
            apellido: RegistroApellidoRef.current.value,
            publicaciones:[],
            usuario: RegistroUsuarioRef.current.value,
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, RegistroUsuarioRef.current.value, RegistroContraRef.current.value)
            .then((userCredential) => {
                // Signed in
                //const user = userCredential.user;
                alert("Cuenta Registrada");
                // ...
                baseDeDato.collection('registros')
                    .add(registro);

                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode);
                alert(errorMessage);
                // ..
            });

        RegistronombreRef.current.value = "";
        RegistroApellidoRef.current.value = "";
        RegistroUsuarioRef.current.value = "";
        RegistroContraRef.current.value = "";

        //agregarNuevoContacto(registro);
    }


    return (

        <div id='div-registrarse'>
            <form className='login'>
                <h3>Registarse</h3>
                <h4>Usuario:</h4><input type="text" ref={RegistroUsuarioRef} className="" required />
                <h4>Contraseña:</h4><input type="text" ref={RegistroContraRef} className="" required /><br />
                <h4>Nombre:</h4><input type="text" ref={RegistronombreRef} className="" required />
                <h4>Apellido:</h4><input type="text" ref={RegistroApellidoRef} className="" required />
                <button onClick={agregarCuenta}>Registarse</button>
            </form>
        </div>

    );
}

export default Registro;

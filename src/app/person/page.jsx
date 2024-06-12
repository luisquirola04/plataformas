'use client'

import { all_personas } from '@/hooks/Services_persona';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import Menu from '../components/menu/menu';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};


export default function Person() {
    let token = Cookies.get('token');
    let [persons, setPersons] = useState(null);
    let [estado, setEstado] = useState(false);
    if (!estado) {
        all_personas(token).then((info) => {
            if (info.code == 200) {
                setPersons(info.datos)
            }
            else {
                //para cuando no hay datos 
            }
        });
        setEstado(true);
    }

    return (
        <div>
            <Menu>
            </Menu>
            <main className="form-signin text-center mt-5">
                <div>
                    <h1>PERSONAS CENSADAS</h1>
                    
                </div>
                <div className="container-fluid">

                    <table className="table table-bordered table-dark table-sm">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Usuario</th>
                                <th>Estado</th>
                                <th>Edad</th>
                                <th>Fecha de nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {persons && persons.map((dato, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{dato.name} {dato.lastName}</td>
                                    <td>{(dato.estadoCivil).toString()}</td>
                                    <td>{dato.edad}</td>
                                    <td>{formatDate(dato.fecha_nac)}</td>
                                    <td>
                                        <Link href={'/person/' + dato.external_id} className="btn btn-danger"> Modificar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="col-40">
                        <Link href="/person/new" style={{ margin: "10px" }}>
                            <button className="btn btn-info">Nuevo</button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
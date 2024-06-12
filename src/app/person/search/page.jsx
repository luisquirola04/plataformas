'use client'

import { search } from '@/hooks/Services_persona';
import { useState } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import Menu from '../../components/menu/menu';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import * as Yup from 'yup';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

// Function to format date to "YYYY/MM/DD"
const formatDateForBackend = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


export default function Search() {
    const validationSchema = Yup.object().shape({
        nombres: Yup.string().trim().required('ESCRIBA LOS NOMBRES'),
        apellidos: Yup.string().trim().required('ESCRIBA LOS APELLIDOS'),
        fecha_nac: Yup.date().required('DEBE PONER FECHA')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [persons, setPersons] = useState(null);
    const [estado, setEstado] = useState(false);
    let token = Cookies.get('token');

    const sendInfo = (data) => {
        // Format the date before sending
        data.fecha_nac = formatDateForBackend(data.fecha_nac);
        console.log(data.fecha_nac);

        search(token,data).then((info) => {
            if (info.code == 200) {
                console.log("lllegoooo");

                console.log(info.datos);
                setPersons(info.datos);
            }else{
                console.log("no vale tu webada");
                console.log(info.datos)
            }
        });
        setEstado(true);
    };

 
    return (
        <div>
            <Menu />
            <main className="form-signin text-center mt-5">
                <div className="container-fluid">
                    <div className="col-50">
                        <form onSubmit={handleSubmit(sendInfo)}>
                            <div className="col-md-3">
                                <label htmlFor="fecha_nac" className="form-label">
                                    Fecha de Nacimiento
                                </label>
                                <input type="date" className="form-control" id="fecha_nac" {...register('fecha_nac')} />
                                {errors.fecha_nac && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.fecha_nac?.message}</div>}
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="nombres" className="form-label">
                                    Nombres
                                </label>
                                <input type="text" className="form-control" id="nombres" {...register('nombres')} />
                                {errors.nombres && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.nombres?.message}</div>}
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="apellidos" className="form-label">
                                    Apellidos
                                </label>
                                <input type="text" className="form-control" id="apellidos" {...register('apellidos')} />
                                {errors.apellidos && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.apellidos?.message}</div>}
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">
                                    BUSCAR
                                </button>
                            </div>
                        </form>
                    </div>
                    {persons && persons.length > 0 ? (
                        <table className="table table-bordered table-dark table-sm mt-3">
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
                                {persons.map((dato, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{dato.name} {dato.lastName}</td>
                                        <td>{dato.estadoCivil}</td>
                                        <td>{dato.edad}</td>
                                        <td>{formatDate(dato.fecha_nac)}</td>
                                        <td>
                                            <Link href={'/person/' + dato.external_id} className="btn btn-danger">Modificar</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="mt-3">
                            <p>No se encontraron resultados.</p>
                            <Link href='/person/censo' className="btn btn-danger mt-3">AGREGAR UNA NUEVA PERSONA AL CENSO</Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};


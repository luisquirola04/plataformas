'use client'

import { all_personas } from '@/hooks/Services_persona';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Cookies from 'js-cookie';
import Menu from '../components/menu/menu';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

export default function Person() {
  let token = Cookies.get('token');
  let [persons, setPersons] = useState(null);
  let [estado, setEstado] = useState(false)
  console.log(token)
  if (!estado) {
    all_personas(token).then((info) => {
      if (info.code == 200) {
        setPersons(info.datos);
      }
      console.log(info)
      setEstado(true);


    });
  }


  //console.log(persons)

  return (
    <div>
      <Menu></Menu>
      <main className="container text-center mt-5">
        <div className='container-fluid'>

          <table className="table table-hover">

            <thead className='table-dark'>
              <tr>
                <th>NRO</th>
                <th>USUARIO</th>
                <th>ESTADO</th>
                <th>CREADA</th>
                <th>EDAD</th>
                <th>ACCIONES/creado</th>

              </tr>
            </thead>
            <tbody>
              {persons && persons.map((dato, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{dato.lastName} {dato.name}</td>
                  <td>{dato.estadoCivil}</td>
                  <td>{formatDate(dato.fecha_nac)}</td>
                  <td>{dato.edad}</td>
                  <td>{formatDate(dato.created_at)}</td>

                </tr>
              ))}
            </tbody>
          </table>
          <div className="col-12 text-end">
            <Link href="/person/new" className="btn btn-info">INGRESAR NUEVO CENSADO</Link>
          </div>
        </div>
      </main>
    </div>

  );
} 
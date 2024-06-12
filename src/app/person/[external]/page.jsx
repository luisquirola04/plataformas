'use client';

import { all_civil, get_person, modify_censado } from '@/hooks/Services_persona';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../../components/menu/menu';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Edit({ params }) {
  let token = Cookies.get('token');
  const router = useRouter();
  const [estado_civil, setEstado_civil] = useState(null);
  const [censado, setCensado] = useState(null);

  useEffect(() => {
    if (!estado_civil) {
      all_civil().then((info) => {
        if (info.code === 200) {
          setEstado_civil(info.datos);
        }
      });
    }

    if (!censado) {
      get_person(token, params.external).then((info) => {
        if (info.code === 200) {
          setCensado(info.datos);
        }
      });
    }
  });

  const validationSchema = Yup.object().shape({
    nombres: Yup.string().trim().required('ESCRIBA LOS NOMBRES'),
    apellidos: Yup.string().trim().required('ESCRIBA LOS APELLIDOS'),
    edad: Yup.number().integer().required('ESCRIBA LA EDAD'),
    
  });

  const formOption = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOption);
  const { errors } = formState;
  const enviar_data = (data) => {
    console.log('Enviando datos:', data); // Agregar este log para verificar si se está llamando la función

    const dataEnv = {
      "apellidos": data.apellidos,
      "nombres": data.nombres,
      "fecha_nac": data.fecha_nac,
      "estadoCivil": data.estadoCivil,
      "external_id": params.external
    };

    modify_censado(dataEnv, token).then((info) => {
      console.log('Respuesta de modificar_censado:', info);
      if (info.code ==200) {
        swal({
          title: "INFO",
          text: "Cuenta modificada",
          icon: "success",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true
        });
        router.push('/person');
        router.refresh();
      } else {
        swal({
          title: "Error",
          text: info.datos.error,
          icon: "error",
          button: "Aceptar",
          timer: 8000,
          closeOnEsc: true
        });
      }
    });
  };

  return (
    <div>
      <Menu />
      <main className="container text-center mt-5">
        <form onSubmit={handleSubmit(enviar_data)} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombres" className="form-label">
              Nombres
            </label>
            <input type="text" className="form-control" id="nombres" {...register('nombres')} defaultValue = {censado && censado.name} />
            {errors.nombres && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.nombres?.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input type="text" className="form-control" id="apellidos" {...register('apellidos')}defaultValue = {censado && censado.lastName} />
            {errors.apellidos && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.apellidos?.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="edad" className="form-label">
              Edad
            </label>
            <input type="text" className="form-control" id="edad" {...register('edad')} defaultValue = {censado && censado.edad} />
            {errors.edad && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.edad?.message} defaultValue = {censado && censado.edad}</div>}
            </div>
          <div className="col-md-6">
            <label htmlFor="estadoCivil" className="form-label">
              Estado Civil
            </label>
            <select className="form-control" name="estado" {...register('estadoCivil')} >
              <option value="">SELECCIONE UN ESTADO</option>
              {estado_civil && estado_civil.map((dato,i)=>(
                <option value = {dato.key}>{dato.value}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="fecha_nac" className="form-label">
              Fecha de Nacimiento
            </label>
            <input type="date" className="form-control" id="fecha_nac" {...register('fecha_nac')} />
            {errors.fecha_nac && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.fecha_nac?.message}</div>}
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}  
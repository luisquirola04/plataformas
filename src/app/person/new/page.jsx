'use client';

import { all_civil, save } from '@/hooks/Services_persona';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import Menu from '../../components/menu/menu';
import Link from 'next/link';
import { useState } from 'react';

export default function New() {
  //const router= useRouter()

  let[estado_civil,setEstado_civil]=useState(null);
  let[estado,setEstado]=useState(false);
  if (!estado){
    all_civil().then((info)=>{
      if(info.code=200){
        setEstado_civil(info.datos);
      }
    });
    setEstado(true); 
  }

  const validationSchema = Yup.object().shape({
    nombres: Yup.string().trim().required('ESCRIBA LOS NOMBRES'),
    apellidos: Yup.string().trim().required('ESCRIBA LOS APELLIDOS'),
    edad: Yup.number().integer().integer('ESCRIBA LA EDAD'),
    estadoCivil: Yup.string().trim().required('ESCRIBA EL ESTADO CIVIL')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  //const router = useRouter(); 
  let token = Cookies.get('token');

  const sendInfo = (data) => {
    //data.fecha_nac = new Date(data.fecha_nac).toISOString().split('T')[0];

    //console.log(data.fecha_nac)


    save(data,token).then((info) => {
      if (info.code =='200') {
        console.log(info);
        //Cookies.set('token',info.datos.token)
        //Cookies.set('usuario',info.datos.user);
          swal({
            title: "CORRECTO",
            text: info.datos.tag,
            icon: "success",
            button: "Accept",
            timer: 4000,
            closeOnEsc: true,
          });
          //router.push('/dashboard');
          //router.refresh();
        } else {
          swal({
          title: "ERROR",
          text: info.datos.error,
          icon: "error",
          button: "Accept",
          timer: 4000,
          closeOnEsc: true,
        });
        console.log(info);
        console.log("NO");
      }
    });
  };

  return (
    <div>
      <Menu />
      <main className="container text-center mt-5">
        <form onSubmit={handleSubmit(sendInfo)} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nombres" className="form-label">
              Nombres
            </label>
            <input type="text" className="form-control" id="nombres" {...register('nombres')} />
            {errors.nombres && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.nombres?.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input type="text" className="form-control" id="apellidos" {...register('apellidos')} />
            {errors.apellidos && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.apellidos?.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="edad" className="form-label">
              Edad
            </label>
            <input type="text" className="form-control" id="edad" {...register('edad')} />
            {errors.edad && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.edad?.message}</div>}
            </div>
          <div className="col-md-6">
            <label htmlFor="estadoCivil" className="form-label">
              Estado Civil
            </label>
            <select className="form-control" name="estado" {...register('estadoCivil')}>
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
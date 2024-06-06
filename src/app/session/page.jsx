'use client';
import { useRouter } from 'next/navigation';
import './login.css';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { login } from '@/hooks/Services_authenticate'; 
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


export default function Session() {
  
  const validationSchema = Yup.object().shape({
    correo: Yup.string().trim().required('ESCRIBA SU CORREO'),
    clave: Yup.string().trim().required('ESCRIBA SU CLAVE')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  let { errors } = formState;
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token){
      router.push('/dashboard');
    }
  },[]);

  const sendInfo = (data) => {
    login(data).then((info) => {
      if (info.code =='200') {
        console.log(info);
        Cookies.set('token',info.datos.token)
        Cookies.set('usuario',info.datos.user);
          swal({
            title: "Info",
            text: "Bienvenido"+info.datos.error,
            icon: "success",
            button: "Accept",
            timer: 4000,
            closeOnEsc: true,
          });
          router.push('/dashboard');
          router.refresh();
        } else {
          swal({
          title: "Error",
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
    <>
      <main className="form-signin text-center mt-5">
        <form onSubmit={handleSubmit(sendInfo)}>
          <h1 className="h3 mb-3 fw-normal">Inicie Sesion</h1>

          <div className="form-floating">
            <input type="email" name='correo' {...register('correo')} className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Correo</label>
            {errors.correo && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.correo?.message}</div>}
          </div>
          <div className="form-floating">
            <input type="password" {...register('clave')} name='clave' className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Clave</label>
            {errors.clave && <div className="text-xs inline-block py-1 px-2 rounded text-red-600">{errors.clave?.message}</div>}
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesion</button>
        </form>
      </main>

    </>
  )
}
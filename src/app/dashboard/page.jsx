'use client'
import { all_personas } from '@/hooks/Services_persona';

import Cookies from 'js-cookie';
import Menu from '../components/menu/menu';

export default function Dashboard(){
  let token = Cookies.get('token');


  all_personas(token).then((info) =>{
    console.log(info);

  });
  return (
    <main className = "form-signin text-center mt-5">
      <h1>Bienvenido</h1>
      <Menu></Menu>
    </main>
  );
} 
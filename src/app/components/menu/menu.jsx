'use client';

import { Button } from "bootstrap";
import Cookies from "js-cookie";
import Link from "next/link";

//import { useEffect } from "react";

//import 'bootstrap/dist/css/bootstrap.css';

export default function Menu() {
const close = (e) => {
//console.log("HOLA");
Cookies.remove('token');
Cookies.remove('user');
}
return (
<div>
<header>
<div className="w-full h-20 navbar-dark bg-dark sticky top-0">
<div className="container mx-auto px-4 h-full">
<div className="flex justify-between items-center h-full">
<ul className="hidden md:flex gap-x-6 text-white">
<li>
<Link href="/person">
<p>Listar Personas</p>
</Link>
</li>
<li>
<Link href="/person/search">
<p>Buscar para censar</p>
</Link>
</li>
<li>
<Link href="/contacts">
<p>Contacts</p>
</Link>
</li>

<li>
<Link href="/session" onClick={(e) => close(e)}>
<p>Close</p>
</Link>
</li>

</ul>
</div>
</div>
</div>
</header>
</div>
);
}
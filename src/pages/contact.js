
'use client'

import { useState } from 'react'
// import {Textarea} from "@nextui-org/react";
import Layout from '@/components/Layout/Layout.component';

import Image from "next/image";
import iconoMail from '../../public/images/icono-mail.png';
import iconoTelefono from '../../public/images/icono-telefono.png';
import iconoLocalizacion from '../../public/images/icono-localizacion.png';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
export default function Form() {
    const [formData, setFormdata] = useState({
        my_name:"",
        email:"",
        phone:"",
        mensaje:"",
        _wpcf7_unit_tag:""
    })

    const handleChange = (event) =>{
        const {type, name, value} =event.target
        setFormdata(prev=>{
            return{
                ...prev,
                [name]:value 
            }
        })
        
    }
    
    const handleSubmit = async (event) =>{
        event.preventDefault()
        console.log(formData) 
        
        try {
            const form = new FormData();
            form.append('my_name', formData.my_name);
            form.append('email', formData.email);
            form.append('phone', formData.phone);
            form.append('mensaje', formData.mensaje);
            form.append('_wpcf7_unit_tag', 'wpcf7-f2241-p56-o1');
            const response = await fetch(`${siteUrl}/wp-json/contact-form-7/v1/contact-forms/2241/feedback`, {
            method: 'POST',
            body: form,
            });
            
            const responseBody = await response.json()
            console.log(responseBody);
            
            if (response.ok) {
            // Traitement réussi
            console.log('Formulaire soumis avec succès');
            
            } else {
            // Gérer les erreurs
            console.error('Erreur lors de la soumission du formulaire');
            }
        } catch (error) {
            console.error('Erreur réseau', error);
        }
        
    }

  return (
    <Layout title="Contact">

<div class="relative h-screen text-white overflow-hidden">
  <div class="absolute inset-0">
    <img src="https://fribuffet.fr/wp-content/uploads/2023/04/2023-Fribuffet-Slide-Contacto-Fondo.jpg" alt="Background Image" className="object-cover object-center w-full h-full" />
    {/* <div class="absolute inset-0 bg-black opacity-50"></div> */}
  </div>
  
  <div class="relative z-10__ flex flex-col justify-center items-left h-full text-left">
    <img src="https://fribuffet.fr/wp-content/uploads/2023/07/Contacta-con-nosotros-FR.png" alt="hero-fribuffet" className='w-1/2' />    
  </div>
</div>

    <div className="grid grid-cols-3 gap-4">        
        
    <div className="col-span-2 p-4">

        <form onSubmit={handleSubmit} id="wpcf7-f2241-p56-o1">
            {/* <label>Nom :</label>
            <input 
                type="text"
                placeholder='Entrez votre nom'
                value={formData.nombre}
                onChange={handleChange} 
                name='my_name' 
            />

            <label> Email :</label>
            <input 
                type="email"
                placeholder='Entrez votre email'
                value={formData.email}
                onChange={handleChange} 
                name='email' 
            />

            <label> Sujet :</label>
            <input 
                type="text"
                placeholder='Entrez votre sujet'
                value={formData.phone}
                onChange={handleChange} 
                name='phone' 
            />

            <label> Message :</label>
            <input
                type='text'
                placeholder="Entrez votre message"
                className="max-w-xs"
                value={formData.mensaje}
                onChange={handleChange} 
                name='mensaje' 
            />
            <button type='submit'> Envoyer</button> */}


        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Nom
            </label>
            <input class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow focus:border-gray-300" id="grid-first-name" type="text" placeholder="entrez votre nom" 
                value={formData.nombre}
                onChange={handleChange} 
                name='my_name'  />
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Telephone
            </label>
            <input class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow focus:border-gray-300" id="grid-last-name" type="text" placeholder="Telephone" 
            value={formData.phone}
            onChange={handleChange} 
            name='phone'  />
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Email
            </label>
            <input class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow focus:border-gray-300" id="grid-password" type="email" placeholder="Entrez votre email" 
            value={formData.email}
            onChange={handleChange} 
            name='email'  />
            {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
            </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
                <textarea 
                placeholder="Entrez votre message"
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow focus:border-gray-300"
                value={formData.mensaje}
                onChange={handleChange} 
                name='mensaje' 
                ></textarea>
            </div>
        </div>

        <button type='submit' className='bg-primary-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'> Envoyer</button>
        </form>

        </div>
        
        <div className="col-span-1 p-4">

            <h2 className="blackblue uppercase">Adresse</h2>
            <div className="direccion">
                <Image src={iconoLocalizacion} width={20} height={20} alt="icono-localizacion" className="inline-block pr-1" />
                <p className="font-semi inline-block">
                
                Ctra. de Aguilar a A-318 por Moriles, km 15,5 – A-3132<br/>
                CP 14900 LUCENA, Córdoba – España</p>

                </div>
                <h2 className="black mt-2 blue uppercase">siège social</h2>

                <p className="font-semi">
                    <Image src={iconoTelefono} width={20} height={20} alt="icono-mail" className="pr-1" />
                    <a href="tel:34957513068"> +34 957 51 30 68 </a></p>
                <p className="font-semi">
                    <Image src={iconoMail} width={20} height={20} alt="icono-mail" className="pr-1" />
                    <a href="mailto:comercial@fribuffet.fr">comercial@fribuffet.fr</a></p>
            
        </div>
    </div>
    
    </Layout>
  )
}

'use client'

import { useState } from 'react'
// import {Textarea} from "@nextui-org/react";
import Layout from '@/components/Layout/Layout.component';

import Image from "next/image";
import iconoMail from '../../public/images/icono-mail.png';
import iconoTelefono from '../../public/images/icono-telefono.png';
import iconoLocalizacion from '../../public/images/icono-localizacion.png';
import heroImg from '../../public/images/2023-Fribuffet-Slide-Contacto-Fondo.jpg';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
export default function Form() {
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState()
    const [globalError, setGlobalError] = useState()
    // const [errorName, setErrorName] = useState(null)
    // const [errorTelefono, setErrorTelefono] = useState(null)
    // const [errorEmail, setErrorEmail] = useState(null)

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
        let errors = {};
        setErrors(null) // Clear previous errors when a new request starts
        setGlobalError(null)
        console.log(formData) 
        
        try {
            const form = new FormData();
            form.append('my_name', formData.my_name);
            form.append('email', formData.email);
            form.append('phone', formData.phone);
            form.append('mensaje', formData.mensaje);
            form.append('_wpcf7_unit_tag', 'wpcf7-f2241-p56-o1');

            if (!formData.my_name) {
                errors.name = 'Name is required.';
            }
            if (!formData.email) {
                errors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                errors.email = 'Email is invalid.';
            }
    
            if (!formData.mensaje) {
                errors.mensaje = 'message is required.';
            } else if (formData.mensaje.length < 6) {
                errors.mensaje = 'Message must be at least 6 characters.';
            }
            setErrors(errors)
    
            
            if(Object.keys(errors).length === 0) {

                console.log("enviar")
            const response = await fetch(`${siteUrl}/wp-json/contact-form-7/v1/contact-forms/2241/feedback`, {
            method: 'POST',
            body: form,
            });
            
            const responseBody = await response.json()
            //console.log(`responseBody ${JSON.stringify(responseBody)}`);
            console.log(responseBody);
            
            if (response.ok) {
                console.log(responseBody.status)
                if(responseBody.status == "validation_failed") {
                    responseBody.invalid_fields.map((stat =>                      
                        {                          
                            console.log(`Log error ${stat.message}`)
                            errors.global = `${stat.field} ${stat.message}`                            
                            setGlobalError(errors)
                        }
                    ))
                    //setError(responseBody.message)
                }else if(responseBody.status == "mail_sent") {
                    console.log('Formulaire soumis avec succès');
                    setSuccess('Formulaire soumis avec succès')
                }      
            
            } else {
            // Gérer les erreurs
            console.error('Erreur lors de la soumission du formulaire');
            errors.global = 'Ha ocurrido un error al enviar el formulario.'
            setGlobalError(errors)
            }

            }//if is valid form
            
        } catch (error) {
            //setError(error.message)
            errors.global = error.message
            setGlobalError(errors)
            console.error('Erreur réseau', error);
        }
        
    }

  return (
    <Layout title="Contact">

<div className="relative  w-full h-[600px] text-white overflow-hidden ">
  <div className="absolute inset-0">
    <Image 
        src={heroImg} 
        alt="Fribuffet Contact" 
        className="object-cover object-center w-full h-[600px]"
         height={600}
         width={600}
        //sizes="(max-width: 900px) 100vw"
        priority />
    {/* <div class="absolute inset-0 bg-black opacity-50"></div> */}
  </div>
  
  <div className="relative z-10__ flex flex-col justify-center items-left h-full text-left">
    <img src="https://fribuffet.fr/wp-content/uploads/2023/07/Contacta-con-nosotros-FR.png" alt="hero-fribuffet" className='w-11/12 md:w-1/2' />    
  </div>
</div>

    <div className="grid grid-cols-3 gap-4 container mx-auto content-start justify-between lg:max-w-[1450px]">        
        
    <div className="col-span-3 md:col-span-2 p-4">

        {globalError && <div className="mb-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{globalError.global}</div>}
        {success && <div className="mb-5 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{success}</div>}

        <form onSubmit={handleSubmit} id="wpcf7-f2241-p56-o1">
          
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Nom
            </label>
            <input className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow focus:border-gray-300" id="grid-first-name" type="text" placeholder="entrez votre nom" 
                value={formData.nombre}
                onChange={handleChange} 
                name='my_name'  />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}            
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Telephone
            </label>
            <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:shadow focus:border-gray-300" id="grid-last-name" type="text" placeholder="Telephone" 
            value={formData.phone}
            onChange={handleChange} 
            name='phone'  />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                Email
            </label>
            <input className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow focus:border-gray-300" id="grid-password" type="email" placeholder="Entrez votre email" 
            value={formData.email}
            onChange={handleChange} 
            name='email'  />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} 
            </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <textarea 
                placeholder="Entrez votre message"
                className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:shadow focus:border-gray-300"
                value={formData.mensaje}
                onChange={handleChange} 
                name='mensaje' 
                ></textarea>
                {errors.mensaje && <p className="text-red-500 text-xs italic">{errors.mensaje}</p>} 
            </div>
        </div>

        <button type='submit' className='bg-primary-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'> Envoyer</button>
        </form>

        </div>
        
        <div className="col-span-3 md:col-span-1 p-4">

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
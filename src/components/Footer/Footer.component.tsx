/**
 * Renders Footer of the application.
 * @function Footer
 * @returns {JSX.Element} - Rendered component
 */
import Image from "next/image";
import iconoMail from '../../../public/images/icono-mail.png';
import iconoTelefono from '../../../public/images/icono-telefono.png';

const Footer = () => (
  <footer className="bg-white mb-4 hidden md:block px-4">

    {/* <div className="container flex md:flex-wrap flex-col md:flex-row justify-between px-6 py-3 mx-auto mt-0 md:min-w-96 border border-gray-200 rounded lg:max-w-[1450px]">
      <div className="text-gray-600 mx-auto">
        &copy; {new Date().getFullYear()} 
      </div>
    </div> */}
    <div className="container mx-auto flex md:flex-wrap flex-col md:flex-row content-start justify-between lg:max-w-[1450px] text-gray-800">
    <div className="items-center mx-auto mb-7">
    <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-azul-nous-sommes.png"
        width={396}
        height={229}
        alt="grupo-infrico-logo"
        //  sizes="100vw"        
         style={{ width: '100%', height: 'auto' }} // optional
      />    
    </div>
    {/* cols 4 */}
    <div className="grid grid-cols-2 sm:grid-cols-6 pb-6 gap-5" >

      <div className="col-start-2">
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-infrico.png"
        width={251}
        height={101}
        alt="infrico"       
      />        
      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-impafri.png"
        width={251}
        height={101}
        alt="impafri"       
      />           
      </div>
      <div>
        <Image
          src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-supermarket.png"
          width={251}
          height={101}
          alt="supermarket"       
        />
      </div>
      <div>
        <Image
          src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-medcare.png"
          width={251}
          height={101}
          alt="medcare"       
        />
        {/* <img width="251" height="101" data-src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-impafri.png" alt=""  src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-medcare.png" /> */}
      </div>
    </div>
    {/* cols 7 */}    
    <div className="grid grid-cols-2 sm:grid-cols-7 gap-6 pb-6 items-center justify-items-center" >
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-fribuffet.png"
        width={251}
        height={101}
        alt="fribuffet"       
      />        
      </div>
      <div>
        <Image
          src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-byyou.png"
          width={251}
          height={101}
          alt="byyou"       
        />             
      </div>
      <div>
        <img width="251" height="101" data-src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-impafri.png" alt=""  src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-kitchenline.png" />
      </div>
      <div className="mx-auto">
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-itecnic.png"
        width={151}
        height={61}
        alt="itecnic"
        //  sizes="100vw"        
         style={{ width: '100%', height: 'auto' }} // optional
      />        
      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-dicafri.png"
        width={251}
        height={101}        
        alt="decafri"
        // sizes="100vw"
        // style={{ width: '100%', height: 'auto' }} // optional
      />       
      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-infrico-france.png"
        width={251}
        height={101}
        alt="infrico-france"       
      />               
      </div>
      <div>
        <img width="251" height="101" data-src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-impafri.png" alt=""  src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-infrico-usa.png" />
      </div>

    </div>

    <div className="w-full grid grid-cols-2 sm:grid-cols-4 pb-3 gap-6 justify-items-center" >
      <div><p>Asociados</p></div>
      <div className="col-start-3"><p>Colaboramos</p></div>
    </div>
    {/* cols 8 */}
    <div className="grid grid-cols-2 sm:grid-cols-8 gap-6 mb-6 items-center justify-items-center" >
    <div>
    {/* <img width="251" height="101" data-src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-impafri.png" alt=""  src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-infrico-france.png" /> */}
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-inditer.png"
        width={251}
        height={101}   
        alt="inditer"
        // sizes="100vw"            
        // style={{ width: '100%', height: 'auto' }} 
      />  


      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-intarcon.png"
        width={251}
        height={101} 
        alt="intarcon"        
      />       
      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-afar.png"
        width={251}
        height={101} 
        alt="afar"        
      />       
      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-aefyt.png"
        width={251}
        height={101} 
        alt="aefyt"        
      />       
      </div>
      

      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-afehc.png"
        width={251}
        height={101}           
        alt="afehc"        
      />       
      </div>
      <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-eurovent.png"
        width={251}
        height={101}           
        alt="eurovent"        
      />       
    </div>
    <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-nafem.png"
        width={251}
        height={101}           
        alt="nafem"        
      />       
    </div>
    <div>
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-fcsi.png"
        width={251}
        height={101}           
        alt="fcsi"        
      />       
    </div>     
    </div>

    <div className="mx-auto mb-8">
      <p className="text-center mb-5">Notre fondation</p>
      <Image
          src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-colores-fund-grupo-inf.png"
          width={297}
          height={171}
          alt="fundacion-infrico-logo"               
          style={{ width: '100%', height: 'auto' }} // optional
        />    
    </div>

    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center" >
      <div className="col-span-2 text-center justify-self-end">
      <Image
        src="https://fribuffet.fr/wp-content/uploads/2023/03/logo-fribuffet-footer.png"
        width={400}
        height={115}           
        alt="fribuffet-logo"        
      />    
      <p className="mb-0"><a href="https://fribuffet.com/aviso-legal/">Aviso legal</a> |<a href="https://fribuffet.com/politica-privacidad/">Política de privacidad</a> |<a href="/?page_id=774">Cookies</a></p>    
      <p>Ctra. de Aguilar a A-318 por Moriles, km 15,5 - A-3132 <br/> CP 14900 LUCENA, Córdoba - España | Tel: +34 957 51 30 68 <br/>
comercial@fribuffet.fr Infrico SL  {new Date().getFullYear()}©. <br/>Diseñado por <a href="https://babait.com" target="_blank" rel="noopener">Babait Technology</a></p>
      </div>
      <div>

      <p className="footer-titulo mb-5">
        <span>General</span><br/>
        <Image src={iconoMail} width={20} height={20} alt="icono-mail" className="pr-1" />
         <a href="mailto:comercial@fribuffet.fr">comercial@fribuffet.fr</a><br/>
         <Image src={iconoTelefono} width={20} height={20} alt="icono-telefono" className="pr-1" /> +34 957 51 30 68
      </p>
      <p className="footer-titulo mb-5">
        <span>Direction Commerciale</span><br/>
        <Image src={iconoMail} width={20} height={20} alt="icono-mail" className="pr-1" />
        <a href="mailto:depcomercial@infrico.com">depcomercial@infrico.com</a><br/>
        <Image src={iconoTelefono} width={20} height={20} alt="icono-telefono" className="pr-1" />+34 957 51 30 68</p>
      <p className="footer-titulo mb-5">
        <span>Exportación</span><br/>
        <Image src={iconoMail} width={20} height={20} alt="icono-mail" className="pr-1" /><a href="mailto:exporta@infrico.com">exportacion@infrico.com</a><br/>
        <Image src={iconoTelefono} width={20} height={20} alt="icono-telefono" className="pr-1" /> +34 957 51 03 03</p>      
      </div>
      <div className="nav-footer justify-self-start">

        <p><a href="https://fribuffet.fr/empresa/">Empresa</a><br/>
        <a href="https://infricodocuments.com/fribuffet/catalogo/catalogo-fribuffet.pdf" target="_blank" rel="noopener">Productos</a><br/>
        <a href="https://fribuffet.fr/catalogos-2/">Catálogos </a><br/><a href="https://fribuffet.fr/contract/">Contract</a><br/>
        <a href="https://fribuffet.fr/revistas-del-grupo/">Comunicación</a><br/><a href="https://fribuffet.fr/contacto/">Contacto</a>
        </p>

      </div>
    </div>

    </div>
  </footer>
);

export default Footer;

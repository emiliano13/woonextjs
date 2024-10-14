import Link from 'next/link';
import Image from 'next/image';

//import Cart from '@/components/Header/Cart.component';
import Search from '@/components/AlgoliaSearch/AlgoliaSearchBox.component';
import SVGMobileSearchIcon from '@/components/SVG/SVGMobileSearchIcon.component';

import Hamburger from './Hamburger.component';

import logo from '../../../public/images/logos-blanco-fribuffet-e1681759569645.png';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Stickynav = () => (
  <nav
    id="footer"
    className="fixed top-0 z-50 w-full mt-[10rem] md:hidden"
  >
    <div className="sticky-nav container flex flex-wrap items-center justify-between px-6 py-3 mx-auto mt-0 md:min-w-96">
      <Hamburger />
      <div
        className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1"
        id="menu"
      >
        <ul className="items-center justify-between pt-4 text-base text-gray-700 md:flex md:pt-0">
          <li>
            <Link href="/produkter">
              <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                Productos
              </span>
            </Link>
          </li>
          <li>
            <Link href="/kategorier">
              <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                Categorías
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex'>
        <Link href="/">
          <Image className="pt-2" src={logo} priority={true} width={230} height={230} alt="fribuffet logo" />
        </Link>
      </div>
      <div className="flex items-center order-2 md:order-3" id="nav-content">
        {/* <Search />
        <SVGMobileSearchIcon /> */}
        {/* <Cart stickyNav /> */}
      </div>
    </div>
  </nav>
);

export default Stickynav;

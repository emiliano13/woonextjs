// Imports
import { ReactNode, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import localFont from '@next/font/local';
import { Lato } from 'next/font/google';

// Components
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '@/components/Footer/Footer.component';
import Stickynav from '@/components/Footer/Stickynav.component';
import Nav from '@/components/Nav';

// State
import { CartContext } from '@/stores/CartProvider';

// Utils

import { getFormattedCart } from '@/utils/functions/functions';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';

interface ILayoutProps {
  children?: ReactNode;
  title: string;
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */



const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});
const geogrotesque = localFont({
  src: [
    {
      path: '../../../public/fonts/180808104102Geogrotesque-regular.woff',
      //path: '../../../public/fonts/Geogrotesque-Regular.woff',
      weight: '400',
    },
    {
      path: '../../../public/fonts/Geogrotesque-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-geogrotesque',
});

const geogrotesqueRegular = localFont({ src: '../../../public/fonts/180808104102Geogrotesque-regular.woff' });


const Layout = ({ children, title }: ILayoutProps) => {
  const { setCart } = useContext(CartContext);

  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data?.cart?.contents?.nodes.length) {
        // Should we clear the localStorage if we have no remote cart?
        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    // className="flex flex-col min-h-screen w-full mx-auto"
    <div className={`${lato.variable} ${geogrotesqueRegular.className} ${geogrotesque.variable} flex flex-col min-h-screen w-full mx-auto`}> 
      <div className="container min-w-[140vw]_ sm:min-w-[95vw] md:px-4_ lg:px-6_ py-2_ w-full mx-auto">
        {/* <Header title={title} /> */}
        <Nav /> 
        {/* <PageTitle title={title} /> */}
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Stickynav />
      </div>
    </div>
  );
};

export default Layout;

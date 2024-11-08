//import styles from './DisplayProducts.module.scss';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

//import { usePathname } from 'next/navigation';
//import { useSelectedLayoutSegment } from 'next/navigation';

//import CategoriesMenuLink from 'components/CategoriesMenuLink';

const CategoriesProduct = ({ children, categories, ...rest }) => {
  const [isOpen, setIsOpen] = useState(0);
  //const [activeNav, setActiveNav] = useState(0);

  let activeNavClass = '';

  const handleToggle = (id) => {
    //setActiveNav(0);
    activeNavClass = '';
    if (isOpen == id) setIsOpen(0);
    else setIsOpen(id);
  };
  
  const { href } = rest;
  console.log(`href ${href} `);



  return (
    <>
      <span className="uppercase shop-sidebar ">Catégories de produits</span>
      <div className="is-divider small"></div>
      <ul className="product-categories  divide-y">
        {categories.length &&
          categories.map((item) => {
            const active = isOpen == item.id ? ' active' : ' ';
         
            return (
              //   <li key={item.id} onClick={() => handleToggle(item.id)} className={isOpen == item.id ? ' active' : null }>
              <li key={item.id} onClick={() => handleToggle(item.id)} className={`${active} ${activeNavClass} py-1`}>
                <Link href={`/categorie-produit/${item.slug}`} className="text-slate-700 text-sm">
                  {item.name}
                </Link>

                {/* <CategoriesMenuLink item={item} slug={item.slug}>{item.name}</CategoriesMenuLink> */}

                <Icon icon="mdi-chevron-up" />

                {item.children.edges && (
                  <ul className="children" key={`ul-${item.key}}`}>
                    {item.children.edges.map((item2) => {
                      return (
                        <li key={item2.node.id}>
                          {/* <CategoriesMenuLink item={item} slug={`${item.slug}/${item2.node.slug}`}>
                            {item2.node.name}
                          </CategoriesMenuLink> */}
                          <Link
                            href={`/categorie-produit/${item.slug}/${item2.node.slug}`}
                            className="text-slate-700 text-sm pb-1"
                          >
                            {item2.node.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
      </ul>
      {children}
    </>
  );
};

export default CategoriesProduct;

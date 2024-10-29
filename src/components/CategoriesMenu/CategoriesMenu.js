//import styles from './DisplayProducts.module.scss';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

//import { usePathname } from 'next/navigation';
//import { useSelectedLayoutSegment } from 'next/navigation';

import client from '@/utils/apollo/ApolloClient';

import { QUERY_ALL_CATEGORIES_MENU } from '@/utils/gql/GQL_QUERIES';

async function getMenu(cat) {
  const res3 = await client.query({
    query: QUERY_ALL_CATEGORIES_MENU
  });
//console.log(res3.data.productCategories.nodes)
  return res3.data.productCategories.nodes;
}

const CategoriesProduct = ({ children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(0);

  const [categories, setCategories] = useState();
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

  useEffect(() => {
    const fetchData = async()=> {
      const data = await getMenu()
      setCategories(data)
      return data
    }
    fetchData()
    
  }, []);


  // useEffect(() => {
  //   let res =  getMenu();
  //   setCategories(res)
  // }, []);
  //let { categories } = getMenu();
//console.log(`cat ${JSON.stringify(categories)}`)
  return (
    <>
      <ul className="product-categories">
      
      {categories &&
          categories.map((item) => {
            const active = isOpen == item.id ? ' active' : ' ';
         //console.log(`item ${item}`)
            return (
              //   <li key={item.id} onClick={() => handleToggle(item.id)} className={isOpen == item.id ? ' active' : null }>
              <li key={item.id} onClick={() => handleToggle(item.id)} className={`${active} ${activeNavClass}`}>
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
                            className="text-slate-700 text-sm"
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

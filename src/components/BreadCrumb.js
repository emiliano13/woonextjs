// /components/NextBreadcrumb.tsx
'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NextBreadcrumb = ({ categories, homeElement, separator, containerClasses, listClasses, activeClasses }) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);
  //console.log(`name ${product.name}`);
  return (
    <div>
      <ul className={containerClasses}>
        <li className={`${listClasses} first:ml-0`}>
          <Link href={'/'}>{homeElement}</Link>
        </li>

        {/* {product?.length > 0 && (
          <div className="text-white font-base text-xs text-center p-1.5 bg-black">{product.name}</div>
        )} */}
        {console.log(categories?.length)}
        {categories?.length > 0 && separator}
        {categories?.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          //let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;
          return (
            <React.Fragment key={index}>
              <l className={itemClasses}>
                <Link href={link.slug}>{link.name}</Link>
              </l>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}

        {/* {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })} */}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;

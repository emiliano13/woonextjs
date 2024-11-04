// import ClassName from 'models/classname';
// import styles from './NavListItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const NavListItem = ({ className, item }) => {
  const nestedItems = (item.children || []).map((item) => {
    return <NavListItem key={item.id} item={item} className={'child'} />;
  });

  return (
    <li key={item.id} className={item.cssClasses}>
      {/* 
        Before rendering the Link component, we first check if `item.path` exists
        and if it does not include 'http'. This prevents a TypeError when `item.path` is null.
      */}
      {item.path && !item.path.includes('http') && !item.target && (
        <Link href={item.path} title={item.title} className={`px-2`}>
          {item.menuImagen?.imagenMenu?.node && 
          <Image
          src={item.menuImagen?.imagenMenu?.node?.sourceUrl}
          alt={item.label}
          width={200}
          height={200}
          />
          }
          {item.label}
        </Link>
      )}
      {/* 
        Before rendering the `a` tag, we first check if `item.path` exists
        and if it includes 'http'. This prevents a TypeError when `item.path` is null.
      */}
      {item.path && item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target} className="px-2">
          {item.label}
        </a>
      )}

      {nestedItems.length > 0 && <ul className={`${className} grid grid-cols-8 gap-4 submenu text-center` }>{nestedItems}</ul>}
    </li>
  );
};

export default NavListItem;

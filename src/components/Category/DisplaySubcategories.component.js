// import styles from './DisplaySubcategories.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import imageNotFound from '../../../public/images/product-not-found.png';

export default function DisplaySubcategories({ children, subcategories, parentSlug }) {

//const DisplaySubcategories = ({ children, subcategories, parentSlug }) => {
  return (
    <div id="product-container" className="flex flex-wrap items-center mb-[120px] md:mb-0">
      {/* <div {...rest} className={DisplaySubcategoriesClassName}> */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {subcategories.map((item) => (
          <div key={item.id} className="text-center cursor-pointer product-box pb-4 px-2">
            <Link href={`/categorie-produit/${parentSlug}/${item.slug}`}>
              {(() => {
                //Imagen subcategoria
                if (item.image) {
                  //console.log(item.image.srcSet)
                  return (
                    <Image
                      className='w-300 md:w-400 h-auto'
                      src={item.image.sourceUrl}
                      priority={true}
                      width={300}
                      height={300}
                      alt={item.name}
                      //srcSet={item.image.srcSet}
                      sizes="(max-width: 768px) 300px, 400px"                      
                      //   sizes="100vw"
                      //   style={{
                      //     width: '100%',
                      //     height: 'auto',
                      //   }}
                    />
                  );
                  //Imagen primer producto subcategoria
                } else if (item.products?.nodes[0].featuredImage.node.sourceUrl) {
                  return (
                    <Image
                      className='w-300 md:w-400 h-auto'
                      src={item.products.nodes[0].featuredImage.node.sourceUrl}
                      priority={true}
                      width={300}
                      height={300}
                      alt={item.name}
                      //srcSet={item.products.nodes[0].featuredImage.node.srcSet}
                      sizes="(max-width: 768px) 300px, 400px"
                      //   style={{
                      //     width: '100%',
                      //     height: 'auto',
                      //   }}
                    />
                  );
                } else {
                  return (
                    <Image
                      src={imageNotFound}
                      priority={true}
                      width={250}
                      height={250}
                      alt={item.name}
                      //   sizes="100vw"
                      //   style={{
                      //     width: '100%',
                      //     height: 'auto',
                      //   }}
                    />
                  );
                }
              })()}
              {/* {item.image ? (
                      <Image
                      src={item.image.sourceUrl}
                      priority={true}
                      width={250}
                      height={250}
                      alt={item.name}
                      //   sizes="100vw"
                      //   style={{
                      //     width: '100%',
                      //     height: 'auto',
                      //   }}
                    />
                    ) : (
                        <Image
                            src={imageNotFound}
                            priority={true}
                            width={250}
                            height={250}
                            alt={item.name}
                         
                        />                     
                    )} */}
            </Link>
            <div className="uppercase text-center">{item.name}</div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};


//export default DisplaySubcategories;

/*eslint complexity: ["error", 20]*/
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { filteredVariantPrice, paddedPrice } from '@/utils/functions/functions';
import Image from 'next/image';
interface Image {
  __typename: string;
  sourceUrl?: string;
}

interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

interface Variations {
  __typename: string;
  nodes: Node[];
}

interface RootObject {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  image: Image;
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations: Variations;
}

interface IDisplayProductsProps {
  products: RootObject[];
}

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @function DisplayProducts
 * @param {IDisplayProductsProps} products Products to render
 * @returns {JSX.Element} - Rendered component
 */

const DisplayProducts = ({ products }: IDisplayProductsProps) => (
  <section className="container mx-auto bg-white">
    <div
      id="product-container"
      className="flex flex-wrap items-center mb-[120px] md:mb-0"
    >      
      {products ? (
        products.map(
          ({
            databaseId,
            name,
            price,
            regularPrice,
            salePrice,
            onSale,
            slug,
            image,
            variations,
          }) => {
            // Add padding/empty character after currency symbol here
            if (price) {
              price = paddedPrice(price, 'kr');
            }
            if (regularPrice) {
              regularPrice = paddedPrice(regularPrice, 'kr');
            }
            if (salePrice) {
              salePrice = paddedPrice(salePrice, 'kr');
            }

            return (
              <div
                key={uuidv4()}
                className="flex flex-col p-1 md:p-6 md:w-1/2 xl:w-1/4 product-box"
              >
                <Link
                  href={`/produit/${encodeURIComponent(slug,)}`}
                >
                  
                    {image ? (                      
                      <Image
                        src={image.sourceUrl!}
                        priority={true}
                        width={250}
                        height={250}
                        alt={name}
                        //   sizes="100vw"
                        //   style={{
                        //     width: '100%',
                        //     height: 'auto',
                        //   }}
                      />              
                    ) : (
                      <img
                        id="product-image"
                        className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                        alt={name}
                        src={
                          process.env.NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL
                        }
                      />
                    )}
                  
                </Link>
                <Link
                  href={`/produkt/${encodeURIComponent(
                    slug,
                  )}?id=${encodeURIComponent(databaseId)}`}
                >
                  <div className="uppercase text-center">{name}</div>
                 
                </Link>
                {/* Display sale price when on sale */}
                {/* {onSale && (
                  <div className="flex justify-center">
                    <div className="pt-1 text-gray-900 text-xl">
                      {variations && filteredVariantPrice(price, '')}
                      {!variations && salePrice}
                    </div>
                    <div className="pt-1 ml-2 text-gray-500 line-through text-lg">
                      {variations && filteredVariantPrice(price, 'right')}
                      {!variations && regularPrice}
                    </div>
                  </div>
                )} */}
                {/* Display regular price when not on sale */}
                {/* {!onSale && (
                  <p className="pt-1 text-center text-gray-900 text-xl">
                    {price}
                  </p>
                )} */}
              </div>
            );
          },
        )
      ) : (
        <div className="mx-auto text-xl font-bold text-center text-gray-800 no-underline uppercase">
          Ingen produkter funnet
        </div>
      )}
    </div>
  </section>
);

export default DisplayProducts;

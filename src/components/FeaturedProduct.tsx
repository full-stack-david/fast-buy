"use client"

import React from 'react';
import useSWR from 'swr';
import { get_all_products } from '@/Services/Common/product';
import Loading from '@/app/loading';
import ProductCard from './ProductCard';

type ProductData = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  featured: Boolean;
};

export default function FeaturedProduct() {
  const { data, isLoading } = useSWR('/gettingAllProducts', get_all_products);

  let filteredProducts: ProductData[] = [];
  if (data && data.length > 0) {
    let filtered = data.filter((item: ProductData) => item.featured);
    if (filtered.length > 0) {
      filteredProducts = filtered.slice(0, 9);
    }
  }

  return (
    <div className='w-full  border-2 flex items-center flex-col justify-start'>
      {
        isLoading
        ? <Loading />
        : filteredProducts.length > 0 && (
          <>
            <div className='flex items-center justify-center px-2 py-2 mb-2'>
              <h1 className='py-2 px-4 border-x-2 border-x-orange-500 font-semibold text-2xl '>
                Top Products
              </h1>
            </div>
            <div className='md:w-4/5 w-full px-1 h-full py-2 md:px-4 flex items-center justify-center flex-wrap'>
              {filteredProducts?.map((item: ProductData) => {
                  return (
                    <ProductCard
                      key={item?._id}
                      _id={item?._id}
                      name={item?.name}
                      description={item?.description}
                      image={item?.image}
                      price={item?.price}
                    />
                  )}
                )
              }
            </div>
          </>
        )
      }
    </div>
  )
}

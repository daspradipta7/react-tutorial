import { useState } from 'react';
import type { Product } from '../types/Products.ts';
import ProductTable from './ProductTable.tsx';
import SearchBar from './SearchBar.tsx';

export default function FilterableProductTable({ products }: { products: Product[]}) {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  return (
    <div>
        <SearchBar 
          filterText={filterText} 
          inStockOnly={inStockOnly} 
          setFilterText= {setFilterText}  
          setInStockOnly={setInStockOnly}
        />
        <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
    </div>
  )
}

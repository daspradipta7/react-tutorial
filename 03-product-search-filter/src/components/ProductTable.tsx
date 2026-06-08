import type React from 'react';
import type { Product } from '../types/Products.ts';
import ProductCategory from './ProductCategory';
import ProductRow from './ProductRow';

function ProductTable( { products, filterText, inStockOnly }: { products: Product[], filterText: string, inStockOnly: boolean }) {
    const rows: React.JSX.Element[] = [];
    let lastCategory: string | null = null;

    products.forEach((product: Product) => {
        if (filterText !== "" && product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
        if (inStockOnly && !product.stocked) return;

        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategory category={product.category} key={product.category} />
            )
        }

        rows.push(
            <ProductRow 
                product={product} 
                key={product.name}
            />
        )

        lastCategory = product.category;
    });

  return (
    <table>
      <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default ProductTable
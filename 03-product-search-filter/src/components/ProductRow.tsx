import type { Product } from '../types/Products.ts';

function ProductRow( { product }: { product: Product }) {
    const name = product.stocked === false ?
        <span style={{color: "red"}}>{product.name}</span> :
        product.name;

  return (
    <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
  )
}

export default ProductRow
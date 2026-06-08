  export default function ProductCategory({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}> {category} </th>
    </tr>
  )
}

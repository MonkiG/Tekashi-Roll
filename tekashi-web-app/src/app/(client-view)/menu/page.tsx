import Filter from './Filter'
import ProductSection from './ProductsSection'
import FilterProvider from './FilterContext'
export default async function Menu (): Promise<JSX.Element> {
  return (
    <FilterProvider>
      <Filter/>
      <ProductSection />
    </FilterProvider>
  )
}

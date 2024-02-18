import ProductsSection from './components/ProductsSection'
import Filter from './components/Filter'
import FilterProvider from './components/FilterContext'

export default async function Dishes (): Promise<JSX.Element> {
  return (
    <FilterProvider >
      <Filter/>
      <ProductsSection/>
    </FilterProvider>
  )
}

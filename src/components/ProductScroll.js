import ProductCard from './ProductCard';

export default function ProductScroll({ title, products = [] }) {
  return (
    <section className="w-full py-8">
      <h2 className="mb-4 pl-4 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="flex gap-6 overflow-x-auto p-4">
        {/* If no products, show the message */}
        {products.length === 0 && (
          <p className="pl-2 text-gray-500">No products found.</p>
        )}

        {/* Map over the REAL products */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
import { useGetProductsQuery } from '../features/api/productApi';
import { Link } from 'react-router-dom';

const ExplorePage = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  const products = data?.products || [];

  return (
    <section className="min-h-screen bg-orange-50 px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Products</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Something went wrong!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden border"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                  <p className="text-orange-600 font-bold">
                    ₹{product.pricing.basePrice} / {product.pricing.unit}
                  </p>
                  <div className="flex items-center text-sm text-yellow-500 mt-2">
                    {'★'.repeat(Math.floor(product.rating.average))}
                    {'☆'.repeat(5 - Math.floor(product.rating.average))}
                    <span className="ml-2 text-gray-600">({product.rating.count})</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExplorePage;

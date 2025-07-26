import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../features/api/productApi';
import { StarIcon } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProductQuery(id);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error loading product.</div>;

  const product = data?.product;

  return (
    <div className='bg-orange-50 min-h-screen px-4 py-10'>
        <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={product?.images?.[0] || '/placeholder.jpg'}
          alt={product.name}
          className="rounded-xl w-full h-auto shadow-md"
        />
        <div className="mt-4 grid grid-cols-5 gap-2">
          {product.images?.slice(0, 5).map((img, i) => (
            <img key={i} src={img} className="rounded-md h-20 object-cover border" />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
        <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>

        <div className="flex items-center space-x-2 text-yellow-500 mb-4">
          {[...Array(Math.round(product.rating?.average || 0))].map((_, i) => (
            <StarIcon key={i} size={18} />
          ))}
          <span className="text-sm text-gray-600">({product.rating?.count} reviews)</span>
        </div>

        <p className="text-xl font-semibold text-green-700 mb-2">
          {product.pricing?.basePrice} {product.pricing?.currency || 'USD'} / {product.pricing?.unit}
        </p>

        <p className="text-gray-700 mb-4">{product.description}</p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Specifications:</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          {Object.entries(product.specifications || {}).map(([key, value]) =>
            value ? <li key={key}><strong className="capitalize">{key}</strong>: {value}</li> : null
          )}
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">Inventory & Shipping:</h3>
        <p className="text-sm text-gray-700 mb-1">
          Available Quantity: {product.inventory?.quantity} {product.pricing?.unit}
        </p>
        <p className="text-sm text-gray-700 mb-1">
          Location: {product.inventory?.location?.warehouse} - {product.inventory?.location?.address}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          Lead Time: {product.inventory?.leadTime} days
        </p>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl text-sm shadow">
          Request Order
        </button>
      </div>
    </div>

    </div>
      );
}

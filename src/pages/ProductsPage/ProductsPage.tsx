import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/productService';
import type { Product } from '../../types/product.types';

// maps product IDs to the downloaded local images
const getLocalImage = (id: number) => {
  const images = [
    '/0-sci-fi-hover-tractor-prop-set.jpg',
    '/7vyhcgf7xijd1.jpeg',
    '/Hb1f786879ab340769f41034d1bc4309a1.jpg_640x640.avif',
    '/green-tractor-old-attached-implement-36481346.webp'
  ];
  return images[id % images.length];
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product');
      alert('Could not delete product. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading products...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products List</h1>
        <Link 
          to="/products/new" 
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-gray-600 font-semibold">Image</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Title</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Category</th>
              <th className="py-3 px-4 text-gray-600 font-semibold">Price</th>
              <th className="py-3 px-4 text-gray-600 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <img 
                    src={getLocalImage(product.id)} 
                    alt={product.title} 
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                  />
                </td>
                <td className="py-3 px-4 text-gray-900 font-medium max-w-xs truncate" title={product.title}>
                  {product.title}
                </td>
                <td className="py-3 px-4 text-gray-500 capitalize">{product.category}</td>
                <td className="py-3 px-4 text-green-700 font-semibold">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link to={`/products/${product.id}`} className="text-blue-600 hover:text-blue-800 font-medium mr-4">View</Link>
                  <Link to={`/products/${product.id}/edit`} className="text-gray-600 hover:text-gray-900 font-medium mr-4">Edit</Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                  >
                    {deletingId === product.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;

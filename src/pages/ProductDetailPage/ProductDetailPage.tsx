import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';
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

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product');
        setError('Could not load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
        <button 
          onClick={() => navigate('/products')}
          className="text-green-600 hover:underline"
        >
          &larr; Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <button 
        onClick={() => navigate('/products')}
        className="text-gray-500 hover:text-green-600 font-medium mb-6 flex items-center gap-2 transition-colors"
      >
        <span>&larr;</span> Back to Products
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        {/* image section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <img 
            src={getLocalImage(product.id)} 
            alt={product.title} 
            className="w-full max-w-sm rounded-2xl shadow-lg border border-gray-200 object-cover"
          />
        </div>

        {/* details section */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4 w-max">
            {product.category}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="text-3xl text-green-600 font-bold mb-6">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          
          <div className="prose prose-gray mb-8 text-gray-600">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="leading-relaxed">
              This heavy-duty agricultural machine is designed to deliver maximum power and efficiency for all your farming needs. Features robust engineering, advanced hydraulics, and an ergonomic cabin for long hours in the field. 
              <br /><br />
              <span className="text-sm italic text-gray-400">(Original factory description: {product.description})</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md shadow-green-500/20 text-center">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;

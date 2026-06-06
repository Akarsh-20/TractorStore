import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../services/productService';

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const data = await getProductById(Number(id));
        setFormData({
          title: data.title,
          price: data.price.toString(),
          category: data.category,
          description: data.description
        });
      } catch (err) {
        console.error('Failed to load product');
        setError('Could not load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);

    try {
      await updateProduct(Number(id), {
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        image: 'https://i.pravatar.cc' // keep default
      });
      
      setSuccess(true);
      // redirect back after brief delay to show success state
      setTimeout(() => navigate('/products'), 1500);
      
    } catch (error) {
      console.error('Failed to update product');
      alert('Failed to update product. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading product data...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate('/products')} className="text-green-600 hover:underline">
          &larr; Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <button 
        onClick={() => navigate('/products')}
        className="text-gray-500 hover:text-green-600 font-medium mb-6 flex items-center gap-2 transition-colors"
      >
        <span>&larr;</span> Back to Products
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Tractor</h1>
          <p className="text-gray-500 mt-2">Update the specifications for this vehicle.</p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Product Updated!</h2>
            <p className="text-green-600">Redirecting you back to the catalog...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Tractor Model Name
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. John Deere 9R 640"
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Price */}
              <div className="flex-1">
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="250000"
                    className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex-1">
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a category...</option>
                  <option value="heavy-duty">Heavy Duty</option>
                  <option value="utility">Utility</option>
                  <option value="row-crop">Row Crop</option>
                  <option value="articulated">Articulated 4WD</option>
                  <option value="track-tractor">Track Tractor</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter tractor features and specifications..."
                className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-md shadow-green-500/20 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;

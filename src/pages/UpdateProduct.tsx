import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../common/axios-helper';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    status: 'a',
    img: null as File | null,
    imgUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(`${SERVER_URL}/products/${id}/`)
      .then(response => {
        setProduct({
            ...response.data,
            imgUrl: response.data.img // Assuming the response contains the image URL
          });
        })
      .catch(error => console.error('Error fetching product details:', error));
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProduct(prevState => ({
        ...prevState,
        img: event.target.files ? event.target.files[0] : null,
        imgUrl: event.target.files ? URL.createObjectURL(event.target.files[0]) : '' // Update the image URL for preview
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('status', product.status);
    if (product.img) {
      formData.append('img', product.img);
    }

    try {
      const token = localStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.put(`${SERVER_URL}/products/update/${id}/`, formData, {
        headers: product.img ? { 'Content-Type': 'multipart/form-data' } : {}
      });
      alert('Product updated successfully');
      navigate('/admin_products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <h1 className="text-4xl mb-5">Update Product</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Product Name</label>
              <input type="text" className="form-control w-full p-2 border border-gray-300 rounded" id="name" name="name" value={product.name} onChange={handleChange} required />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="description" className="block text-lg font-medium mb-2">Product Description</label>
              <textarea className="form-control w-full p-2 border border-gray-300 rounded" id="description" name="description" value={product.description} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="img" className="block text-lg font-medium mb-2">Product Image</label>
              <input type="file" className="form-control w-full p-2 border border-gray-300 rounded" id="img" name="img" onChange={handleFileChange} />
              {product.imgUrl && (
                <img
                  src={product.imgUrl}
                  alt="Product Preview"
                  className="mt-2"
                  style={{ maxHeight: '200px' }}
                />
              )}
            </div>
            <div className="form-group mb-4">
              <label htmlFor="price" className="block text-lg font-medium mb-2">Product Price</label>
              <input type="number" className="form-control w-full p-2 border border-gray-300 rounded" id="price" name="price" value={product.price} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="status" className="block text-lg font-medium mb-2">Product Status</label>
              <select className="form-control w-full p-2 border border-gray-300 rounded" id="status" name="status" value={product.status} onChange={handleChange} required>
                <option value="a">Active</option>
                <option value="i">Inactive</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
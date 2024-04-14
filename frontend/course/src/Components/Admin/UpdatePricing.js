import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePricing = () => {
  // State for storing pricing details and form inputs
  const [pricingDetails, setPricingDetails] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    saving: '',
    description: ''
  });

  // Fetch pricing details on component mount
  useEffect(() => {
    fetchPricingDetails();
  }, []);

  // Function to fetch pricing details
  const fetchPricingDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8081/pricing');
      setPricingDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching pricing details:', error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle form submission for adding/updating pricing details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (pricingDetails.some(item => item.id == formData.id)) {
        // Update existing pricing detail
        await axios.put('http://localhost:8081/pricing', formData);
      } else {
        // Add new pricing detail
        await axios.post('http://localhost:8081/pricing', formData);
      }
      // Clear form data and fetch updated pricing details
      setFormData({
        id: '',
        name: '',
        price: '',
        saving: '',
        description: ''
      });
      fetchPricingDetails();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Function to handle deleting a pricing detail
  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/pricing', { data: { id } });
      fetchPricingDetails();
    } catch (error) {
      console.error('Error deleting pricing detail:', error);
    }
  };

  return (
    <div>
      <h1>Pricing Details</h1>
      {/* Form for adding/updating pricing details */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder="id" required />
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" required />
        <input type="text" name="saving" value={formData.saving} onChange={handleInputChange} placeholder="Saving" required />
        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
        <button type="submit">{pricingDetails.some(item => item.id == formData.id) ? 'Update' : 'Add'}</button>
      </form>

      {/* Display pricing details */}
      <div>
        {pricingDetails.map(item => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Price: {item.price}</p>
            <p>Saving: {item.saving}</p>
            <p>Description: {item.description}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatePricing;

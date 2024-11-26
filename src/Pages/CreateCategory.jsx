import axios from 'axios';
import React, { useState } from 'react'
import { FiImage } from 'react-icons/fi'; // You'll need to install react-icons


const CreateCategory = () => {
  
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentCategory: '',
        image: null
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.parentCategory) {
          notify("Please fill in all fields");
          return;
        }
       const category = {
        name : formData.name,
        description:formData.description,
        parentCategory:formData.parentCategory
       }
       try {
        const {data} =await axios.post(
          "https://builds-backend-wc2e.onrender.com/categories",
          category
        )
        alert(data.message)
       } catch (error) {
        alert(error.response?.data?.message)
       }
        console.log(formData);
      };
    
      
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
          ...prevState,
          image: file
        }));
      };
    
      return (
        <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6">Create New Category post</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Category Name"
                  required
                />
              </div>
    
              {/* Slug Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="enter-description-here"
                  required
                />
              </div>
    
              
              <div>
                <label className="block text-sm font-medium mb-2">Category Image</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <FiImage className="mx-auto text-4xl mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload image
                    </span>
                  </label>
                </div>
              </div>
    
              
              <div>
                <label className="block text-sm font-medium mb-2">Parent Category</label>
                <input
                type='text'
                  name="parentCategory"y
                  value={formData.parentCategory}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your parent category here..."
                  required
                />
              </div>
            </div>
    
            {/* Submit Button */}
            <button
        
              type="submit"
              className="w-full bg-[#7e3af2] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              
            >
              Create Category Post
            </button>
          </form>
        </div>
      );
    };

export default CreateCategory

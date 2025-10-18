import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaArrowLeft, FaSave, FaPlus } from "react-icons/fa";

const AddDepartments = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await axios.post('http://localhost:4000/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container py-6">
            <div className="surface p-6 sm:p-8 max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin-dashboard/departments")}
                            className="btn btn-outline flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <FaArrowLeft />
                            Back to Departments
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                                <FaBuilding className="text-blue-600" />
                                Add New Department
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Create a new department for your organization
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Department Information
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Department Name */}
                            <div>
                                <label htmlFor="dep_name" className="label text-gray-700 dark:text-gray-300">
                                    Department Name *
                                </label>
                                <input
                                    type="text"
                                    name="dep_name"
                                    id="dep_name"
                                    onChange={handleChange}
                                    value={department.dep_name}
                                    placeholder="e.g., Human Resources, Engineering, Marketing"
                                    className="input"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="label text-gray-700 dark:text-gray-300">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    onChange={handleChange}
                                    value={department.description}
                                    placeholder="Describe the department's role and responsibilities..."
                                    className="input resize-none"
                                    rows="4"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-primary flex items-center gap-2 px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner w-5 h-5"></div>
                                    Creating Department...
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    Create Department
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDepartments;

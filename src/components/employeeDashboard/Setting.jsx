import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContex";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash, FaSave, FaShieldAlt } from "react-icons/fa";

const Setting = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setSetting({...setting, [name]: value})
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        
        if (setting.newPassword !== setting.confirmPassword) {
            setError("New password and confirm password do not match")
            setSubmitting(false)
            return
        }

        if (setting.newPassword.length < 6) {
            setError("New password must be at least 6 characters long")
            setSubmitting(false)
            return
        }

        try {
            const response = await axios.put("http://localhost:4000/api/setting/change-password", setting,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if (response.data.success) {
                navigate("/employee-dashboard")
                setError("")
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message)
            } else {
                setError("Failed to change password. Please try again.")
            }
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <div className="app-container py-6">
      <div className="surface p-6 sm:p-8 max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <FaShieldAlt className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Change Password
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update your account password for security
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Password Change Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="label flex items-center gap-2">
              <FaLock className="text-gray-500" />
              Current Password
            </label>
            <div className="relative">
              <input 
                type={showPasswords.oldPassword ? "text" : "password"} 
                name="oldPassword" 
                placeholder="Enter your current password" 
                onChange={handleChange} 
                className="input pr-10" 
                required 
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('oldPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="label flex items-center gap-2">
              <FaLock className="text-gray-500" />
              New Password
            </label>
            <div className="relative">
              <input 
                type={showPasswords.newPassword ? "text" : "password"} 
                name="newPassword" 
                placeholder="Enter your new password" 
                onChange={handleChange} 
                className="input pr-10" 
                required 
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('newPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label flex items-center gap-2">
              <FaLock className="text-gray-500" />
              Confirm New Password
            </label>
            <div className="relative">
              <input 
                type={showPasswords.confirmPassword ? "text" : "password"} 
                name="confirmPassword" 
                placeholder="Confirm your new password" 
                onChange={handleChange} 
                className="input pr-10" 
                required 
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg font-semibold"
          >
            {submitting ? (
              <>
                <div className="spinner-small"></div>
                Updating Password...
              </>
            ) : (
              <>
                <FaSave />
                Update Password
              </>
            )}
          </button>
        </form>

        {/* Security Tips */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Password Security Tips:
          </h3>
          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Use at least 6 characters</li>
            <li>• Include numbers and special characters</li>
            <li>• Avoid common words or personal information</li>
            <li>• Don't reuse passwords from other accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;

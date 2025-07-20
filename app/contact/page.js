// components/ContactForm.jsx
"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiCheckCircle } from 'react-icons/fi'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  // components/ContactForm.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);
  setSubmitError('');
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message. Please try again later.');
    }

    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Full submission error:', error);
    setSubmitError(error.message || 'An unexpected error occurred. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
;

    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-white rounded-xl shadow-md mx-auto max-w-md"
      >
        <FiCheckCircle className="mx-auto text-5xl text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for contacting us. We'll get back to you soon.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2 bg-[#B6F500] text-black rounded-lg hover:bg-[#A5E000] transition"
        >
          Send Another Message
        </button>
      </motion.div>
    )
  }

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 mt-10">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-xl shadow-md w-full max-w-2xl"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#B6F500] focus:border-[#B6F500] outline-none transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#B6F500] focus:border-[#B6F500] outline-none transition ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#B6F500] focus:border-[#B6F500] outline-none transition ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about your project..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {submitError && (
          <p className="mb-4 text-red-500 text-center">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:w-auto mx-auto flex items-center justify-center px-8 py-3 rounded-lg font-medium transition ${
            isSubmitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#B6F500] hover:bg-[#9ED600] text-black'
          }`}
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <FiSend className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </motion.form>
    </div>
  )
}
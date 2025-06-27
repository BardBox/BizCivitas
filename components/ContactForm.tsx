
"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ContactFormData } from "@/types/common.types";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      howFindUs: ""
    }
  });

  // Watch all form values for debugging
  const watchedValues = watch();

  // Console log watched values for debugging
  useEffect(() => {
    console.log("Form values changed:", watchedValues);
  }, [watchedValues]);

  const handleFormSubmit = async (data: ContactFormData) => {
    console.log("Submitting form data:", data);
    setIsSubmitting(true);
    
    try {
      await onSubmit(data);
      reset(); // Reset form on successful submission
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { 
              required: "Name is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" }
            })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter Your Name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Contact and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="contact"
              {...register("contact", { 
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Your Contact Number"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address"
                }
              })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* How Did You Find Us */}
        <div>
          <label htmlFor="howFindUs" className="block text-sm font-medium text-gray-700 mb-2">
            How did you find us? <span className="text-red-500">*</span>
          </label>
          <select
            id="howFindUs"
            {...register("howFindUs", { required: "Please select an option" })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
              errors.howFindUs ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select an option</option>
            <option value="google">Google</option>
            <option value="social_media">Social Media</option>
            <option value="referral">Referral</option>
            <option value="event">Event</option>
            <option value="website">Website</option>
            <option value="other">Other</option>
          </select>
          {errors.howFindUs && (
            <p className="mt-1 text-sm text-red-600">{errors.howFindUs.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}

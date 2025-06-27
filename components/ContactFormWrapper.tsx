
"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";
import { ContactFormData } from "@/types/common.types";

interface ContactFormWrapperProps {
  onFormSubmit: (data: ContactFormData) => Promise<any>;
}

export default function ContactFormWrapper({ onFormSubmit }: ContactFormWrapperProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus({ type: null, message: '' });
      console.log("Client: Submitting form data:", data);
      
      const result = await onFormSubmit(data);
      console.log("Client: Form submission result:", result);
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your inquiry! We\'ll get back to you soon.'
      });
    } catch (error) {
      console.error("Client: Form submission error:", error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error submitting your inquiry. Please try again.'
      });
    }
  };

  return (
    <div>
      {/* Status Messages */}
      {submitStatus.type && (
        <div className={`mb-6 p-4 rounded-lg border ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {submitStatus.type === 'success' ? (
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {submitStatus.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <ContactForm onSubmit={handleSubmit} />
    </div>
  );
}

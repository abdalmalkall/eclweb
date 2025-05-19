import React, { useState } from 'react';

function ContactUS() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    issueType: 'Course Structure',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-7xl mx-auto font-sans relative overflow-hidden">
      {/* Orange background elements */}
      <div className="fixed top-0 left-0 w-full h-100 bg-orange-500 rounded-bl-[90px] rounded-br-[90px] z-[-1]"></div>


      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-center text-2xl font-semibold mb-6">Contact Our Team</h2>

        {/* Contact Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mx-auto max-w-7xl mb-12 mt-12">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="John Wilson"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Contact email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">Issue Related to*</label>
                <div className="relative">
                  <select
                    id="issueType"
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8"
                    required
                  >
                    <option>Course Structure</option>
                    <option>Content Structure</option>
                    <option>Payment Failure</option>
                    <option>Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your message*</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Type your message..."
                required
              ></textarea>
            </div>

            <div className="text-xs text-gray-500 mb-6">
              By submitting this form, you agree to our terms and conditions and our Privacy Policy which explains how we may collect, use and disclose your personal information including to third parties.
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-900"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          {/* Email Option */}
          <div className="flex flex-col items-center">
            <div className="bg-yellow-400 rounded-lg p-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg">Email Us</h3>
            <p className="text-sm text-center text-gray-600 mb-2">
              Email us for general queries, including marketing and partnership opportunities.
            </p>
            <a href="mailto:hello@yourdomain.com" className="text-blue-800 font-medium text-sm">hello@yourdomain.com</a>
          </div>

          {/* Call Option */}
          <div className="flex flex-col items-center">
            <div className="bg-orange-400 rounded-lg p-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg">Call Us</h3>
            <p className="text-sm text-center text-gray-600 mb-2">
              Call us to speak to a member of our team. We are always happy to help.
            </p>
            <a href="tel:+123456789" className="text-blue-800 font-medium text-sm">+12 3456 6789</a>
          </div>
        </div>

        {/* Dots decoration */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-1 w-1 bg-orange-400 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUS;
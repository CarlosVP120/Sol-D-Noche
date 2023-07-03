import React from "react";
import ContactForm from "../Components/ContactForm";

const Contact = () => {
  return (
    <div className="bg-white py-12" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500 text-center mt-8 mb-6">
          Contact
        </h1>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <ContactForm />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 sm:ml-12">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Phone</h2>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Email</h2>
                <p>info@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

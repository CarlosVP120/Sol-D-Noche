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
          <div className="md:w-1/3 mt-6 md:mt-0 sm:ml-12">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Phone</h2>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Email</h2>
                <p>soldnoche2@gmail.com</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Social Media</h2>
                <div className="flex space-x-6">
                  <a
                    href="https://www.instagram.com/soldnocheaccents/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram text-6xl text-pink-500 hover:text-pink-600 transition-all duration-300 transform hover:scale-110"></i>
                  </a>
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook text-6xl text-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"></i>
                  </a>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-whatsapp text-6xl text-green-500 hover:text-green-600 transition-all duration-300 transform hover:scale-110"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

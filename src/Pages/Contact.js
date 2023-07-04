import React from "react";

const Contact = () => {
  return (
    <div className="bg-white py-12" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500 text-center mb-6">
          Contact
        </h1>
        <div className="flex flex-col items-center">
          <div className="sm:w-1/2">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-center gap-16">
                <a
                  href="https://www.instagram.com/soldnocheaccents/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram text-6xl lg:text-8xl text-pink-500 hover:text-pink-600 transition-all duration-300 transform hover:scale-110"></i>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook text-6xl lg:text-8xl text-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"></i>
                </a>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-whatsapp text-6xl lg:text-8xl text-green-500 hover:text-green-600 transition-all duration-300 transform hover:scale-110"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

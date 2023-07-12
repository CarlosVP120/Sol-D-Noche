import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const closeModal = () => {
    setSuccessMessage(false);
    setErrorMessage(false);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_0n0ac7p",
        "template_3m9yral",
        form.current,
        "XXLP5sfZPwa0dOL4K"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMessage(true);
        },
        (error) => {
          console.log(error.text);
          setErrorMessage(true);
        }
      );

    form.current.reset();
  };

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (event.target.closest(".modal") === null) {
        closeModal();
      }
    };

    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("click", handleClickOutsideModal);
    };
  }, []);

  return (
    <div className="" id="contact">
      <div className="max-w-md mx-auto mt-0">
        <h2 className="text-2xl font-bold text-gray-600 flex justify-center mt-8">
          Send me a message!
        </h2>
        {/* <p className="text-gray-600 text-center mt-2">I'll get back to you as soon as possible.</p> */}

        <form ref={form} onSubmit={sendEmail} className="mt-4">
          <div className="mb-4 rounded-md sm:px-4 px-8">
            <label htmlFor="name" className="text-gray-800">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="user_name"
              placeholder="Enter your name..."
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 "
              required
            />
          </div>

          <div className="mb-4 rounded-md sm:px-4 px-8">
            <label htmlFor="email" className="text-gray-800">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="user_email"
              placeholder="Your email address..."
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 "
              required
            />
          </div>

          <div className="mb-4 rounded-md sm:px-4 px-8">
            <label htmlFor="message" className="text-gray-800">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              rows="5"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-orange-500 "
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 text-lg font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {successMessage && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Email Sent
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your email has been sent successfully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500  text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Error
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        An error occurred while sending your email. Please try
                        again later.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-500  text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactForm;

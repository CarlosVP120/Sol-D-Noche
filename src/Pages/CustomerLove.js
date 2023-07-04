import React from "react";

const testimonials = [
  {
    quote:
      "I absolutely adore the bead necklace I purchased from this store. The craftsmanship is impeccable and the quality is outstanding. I get compliments every time I wear it!",
    author: "Sarah Thompson",
  },
  {
    quote:
      "The handmade bags from this store are simply stunning. I love the attention to detail and the unique designs. Highly recommended!",
    author: "Michael Johnson",
  },
  {
    quote:
      "I've been collecting gemstone accessories for years, and the pieces I found at this store are among the most beautiful I've seen. The selection is impressive, and the prices are reasonable. I'm thrilled with my purchase!",
    author: "Emily Rodriguez",
  },
  {
    quote:
      "I can't say enough good things about this store. The customer service is exceptional, and the products are top-notch. I'm a loyal customer and will continue to recommend them to everyone I know!",
    author: "David Smith",
  },
];

const CustomerLove = () => {
  return (
    <div className="bg-gray-100 pb-12" id="customer-love">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-500 text-center mb-12">
          Customer Love
        </h1>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 sm:ml-24">
            <img
              src="images/image9.png"
              alt="Customer Love"
              className="w-full rounded-md shadow-md"
            />
          </div>
          <div className="md:w-2/3 mt-6 md:mt-0 sm:ml-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                  <blockquote className="text-xl italic text-gray-800 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <cite className="text-lg font-semibold">
                    {testimonial.author}
                  </cite>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLove;

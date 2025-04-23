
import { Star } from "lucide-react";

type TestimonialProps = {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
};

const Testimonial = ({ quote, author, role, image, rating }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex space-x-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-harvest-secondary text-harvest-secondary" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <div className="flex items-center">
        <img src={image} alt={author} className="w-10 h-10 rounded-full object-cover mr-4" />
        <div>
          <h4 className="font-semibold text-harvest-dark">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Harvest Harmony transformed how I sell my crops. With guaranteed contracts, I can focus on quality growing rather than worrying about market prices.",
      author: "Rajesh Kumar",
      role: "Wheat Farmer, Punjab",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      quote: "As a food processing company, we need consistent quality supply. This platform helped us establish direct relationships with farmers, ensuring quality control from farm to factory.",
      author: "Priya Sharma",
      role: "Procurement Manager, Fresh Foods Inc.",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop",
      rating: 5,
    },
    {
      quote: "The transparent contract system has eliminated middlemen and increased my profit margins by 30%. The milestone-based payments provide security like never before.",
      author: "Michael Rodriguez",
      role: "Organic Vegetable Farmer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-harvest-dark mb-4">What Our Users Say</h2>
          <p className="text-gray-600">
            Real success stories from farmers and buyers using our platform to grow their businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

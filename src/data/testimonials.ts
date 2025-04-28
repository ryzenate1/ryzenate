// Define the structure for a single testimonial
export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  quote: string;
  imageUrl?: string; // Changed type to string as next/image is removed
}

// Sample Testimonial Data (Updated Image URLs)
// Using https://avatar.iran.liara.run/public/boy?username=[...] or /girl?username=[...] for more variety
export const testimonials: TestimonialData[] = [
    { id: 1, name: "Priya Sharma", role: "Founder, Tech Startup (Chennai)", quote: "Exceptional quality and communication throughout the project.", imageUrl: "https://avatar.iran.liara.run/public/girl?username=PriyaSharma" },
    { id: 2, name: "David Miller", role: "CTO, Fintech (Austin TX)", quote: "Working with Ryzen was a fantastic experience. Deep technical knowledge.", imageUrl: "https://avatar.iran.liara.run/public/boy?username=DavidMiller" },
    { id: 3, name: "Arjun Kumar", role: "Product Lead (Bangalore)", quote: "Ryzen consistently delivered high-quality results ahead of schedule.", imageUrl: "https://avatar.iran.liara.run/public/boy?username=ArjunKumar" },
    { id: 4, name: "Emily White", role: "UX Designer (San Francisco)", quote: "Understood the design vision perfectly and executed flawlessly.", imageUrl: "https://avatar.iran.liara.run/public/girl?username=EmilyWhite" },
    { id: 5, name: "Suresh Ramalingam", role: "Business Owner (Madurai)", quote: "Transformed our operations. Highly recommend for digitalization.", imageUrl: "https://avatar.iran.liara.run/public/boy?username=SureshRamalingam" },
    { id: 6, name: "Michael B.", role: "Tech Consultant (NYC)", quote: "A reliable, skilled, and proactive developer.", imageUrl: "https://avatar.iran.liara.run/public/boy?username=MichaelB" }, // Using initial for seed
    { id: 7, name: "Lakshmi Menon", role: "Project Manager (Coimbatore)", quote: "Clear communication and proactive problem-solving made the project smooth.", imageUrl: "https://avatar.iran.liara.run/public/girl?username=LakshmiMenon" },
    { id: 8, name: "Robert Jones", role: "Lead Engineer (Chicago)", quote: "High-quality code and always willing to find the best solution.", imageUrl: "https://avatar.iran.liara.run/public/boy?username=RobertJones" },
    { id: 9, name: "Ananya Gupta", role: "Marketing Director (Mumbai)", quote: "The new platform is performing brilliantly.", imageUrl: "https://avatar.iran.liara.run/public/girl?username=AnanyaGupta" },
     // Add more if needed
];
import Slider from "@/app/components/Slider";
import Category from "@/app/components/Category";
import Produk from "@/app/components/Produk";
import Chatbot from "@/app/components/Chatbot";

export default function Home() {
  return (
    <div className="w-full sm:w-360 min-h-screen bg-white mx-auto mt-5 sm:mt-30 mb-5 sm:mb-30 relative">
      <div className="w-full sm:w-345 bg-white mx-auto p-3 sm:p-5">
        <Slider />
        <Category />
        <Produk />
      </div>
      <div className="chatbot-wrapper fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <Chatbot />
      </div>
    </div>
  );
}

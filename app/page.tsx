import Slider from "@/app/components/Slider";
import Category from "@/app/components/Category";
import Produk from "@/app/components/Produk";
import Chatbot from "@/app/components/Chatbot";

export default function Home() {
  return (
    <div className="w-360 h-335 bg-white mx-auto mt-30 mb-30 relative">
      <div className="w-345 bg-white h-150 mx-auto py-5 justify-center">
        <Slider />
        <Category />
        <Produk />
      </div>
      <div className="chatbot-wrapper">
        <Chatbot />
      </div>
    </div>
  );
}

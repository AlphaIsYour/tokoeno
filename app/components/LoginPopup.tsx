import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faQrcode,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Definisikan tipe untuk props
interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;

    setIsLoading(true);

    // Simulasi proses login (ganti dengan API call sebenarnya)
    setTimeout(() => {
      setIsLoading(false);
      // Proses selanjutnya setelah login berhasil
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center transparent bg-opacity-5 backdrop-blur-sm  z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl w-96 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold mb-4">Masuk</h2>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 absolute top-6 right-16"
            >
              Daftar
            </Link>

            {/* Input Field with animation */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Nomor HP atau Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-200 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setEmail("")}
                >
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </motion.button>
              )}
            </div>

            {/* Help Button */}
            <button className="text-blue-500 hover:text-blue-700 transition-colors duration-200 mt-2 text-sm">
              Butuh bantuan?
            </button>

            {/* Submit Button with Loading State */}
            <button
              className={`w-full p-3 rounded-lg mt-4 font-medium transition-all duration-200 ${
                email
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!email || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2"
                  />
                  Memproses...
                </span>
              ) : (
                "Selanjutnya"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">
                atau masuk dengan
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* QR Code Button */}
            <motion.button
              className="w-full flex items-center justify-center p-3 border rounded-lg mt-2 hover:bg-gray-50 transition-colors duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FontAwesomeIcon icon={faQrcode} className="mr-2" /> Scan Kode QR
            </motion.button>

            {/* Other Methods Button */}
            <motion.button
              className="w-full p-3 border rounded-lg mt-2 hover:bg-gray-50 transition-colors duration-200"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Metode Lain
            </motion.button>

            {/* Footer */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Dengan melanjutkan, Anda menyetujui
              <Link
                href="/terms"
                className="text-blue-500 hover:text-blue-700 mx-1"
              >
                Ketentuan Layanan
              </Link>
              dan
              <Link
                href="/privacy"
                className="text-blue-500 hover:text-blue-700 mx-1"
              >
                Kebijakan Privasi
              </Link>
              kami.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginPopup;

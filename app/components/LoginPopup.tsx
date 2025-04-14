"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, useSession } from "next-auth/react";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("[GOOGLE_SIGNIN_ERROR]", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
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
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Masuk</h2>
            <Link
              href="/register"
              onClick={onClose}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 absolute top-6 right-16"
            >
              Daftar
            </Link>

            {/* Session Info or Sign In */}
            {session ? (
              <div className="text-center">
                <p className="text-lg font-medium">Selamat datang!</p>
                <p className="text-gray-600">{session.user?.email}</p>
                <p className="text-sm text-gray-500">
                  Role: {session.user?.role}
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <>
                {/* Google Sign In Button */}
                <motion.button
                  className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 mt-4 flex items-center justify-center"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin mr-2"
                      />
                      Memproses...
                    </span>
                  ) : (
                    "Masuk dengan Google"
                  )}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-3 text-gray-500 text-sm">atau</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Placeholder for Other Methods */}
                <motion.button
                  className="w-full p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled
                >
                  Metode Lain (Segera Hadir)
                </motion.button>
              </>
            )}

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

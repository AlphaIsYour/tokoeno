"use client";
import React, { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SkeletonRegister = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-96 animate-shimmer">
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto my-4"></div>
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [step, setStep] = useState("register");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsButtonDisabled(!value.trim() || !validateEmail(value));
    setError("");
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("confirm");
    } catch {
      setError("Gagal mengirim email. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setStep("verify");
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Simulasi verifikasi kode
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "USER" }),
      });
      router.push("/login");
    } catch {
      setError("Kode salah. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isLoading && step === "register" && <SkeletonRegister />}
      {!isLoading && (
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          {step === "register" && (
            <>
              <h2 className="text-xl font-semibold text-center">
                Daftar Sekarang
              </h2>
              <p className="text-center text-gray-500 text-sm">
                Sudah punya akun?{" "}
                <a href="/login" className="text-blue-500 cursor-pointer">
                  Masuk
                </a>
              </p>
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 mt-4 p-2 border rounded-lg shadow-sm hover:bg-gray-100"
                disabled={isLoading}
              >
                <Image
                  src="/img/google.png"
                  alt="Google"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                Google
              </button>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-400 text-sm">atau</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <input
                type="email"
                placeholder="Masukkan E-mail"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={handleChange}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                className={`w-full mt-4 p-2 rounded-lg text-white ${
                  isButtonDisabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } flex items-center justify-center`}
                disabled={isButtonDisabled || isLoading}
                onClick={handleRegister}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Daftar"
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Dengan mendaftar, saya menyetujui{" "}
                <a href="/terms" className="text-blue-500 cursor-pointer">
                  Syarat & Ketentuan
                </a>{" "}
                serta{" "}
                <a href="/privacy" className="text-blue-500 cursor-pointer">
                  Kebijakan Privasi
                </a>
                .
              </p>
            </>
          )}

          {step === "confirm" && (
            <>
              <h2 className="text-xl font-semibold text-center">
                Konfirmasi Email
              </h2>
              <p className="text-center text-gray-500 text-sm">
                {email}
                <br /> Pastikan E-mail yang kamu isi sudah benar untuk
                diverifikasi.
              </p>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="flex justify-between mt-4">
                <button
                  className="w-30 p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                  onClick={() => setStep("register")}
                  disabled={isLoading}
                >
                  Ubah
                </button>
                <button
                  className="w-30 p-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
                  onClick={handleConfirm}
                  disabled={isLoading}
                >
                  Ya, Benar
                </button>
              </div>
            </>
          )}

          {step === "verify" && (
            <>
              <h2 className="text-xl font-semibold text-center">
                Masukkan Kode Verifikasi
              </h2>
              <p className="text-center text-gray-500 text-sm">
                Kode telah dikirim ke {email}
              </p>
              <input
                type="text"
                placeholder="Masukkan kode"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                className="w-full mt-4 p-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
                onClick={handleVerify}
                disabled={isLoading || !verificationCode.trim()}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Verifikasi"
                )}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;

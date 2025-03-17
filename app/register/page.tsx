"use client";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [step, setStep] = useState("register");
  const [verificationCode, setVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsButtonDisabled(e.target.value.trim() === "");
  };

  const handleRegister = () => {
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("verify");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        {step === "register" && (
          <>
            <h2 className="text-xl font-semibold text-center">
              Daftar Sekarang
            </h2>
            <p className="text-center text-gray-500 text-sm">
              Sudah punya akun?{" "}
              <span className="text-green-500 cursor-pointer">Masuk</span>
            </p>
            <button className="w-full flex items-center justify-center gap-2 mt-4 p-2 border rounded-lg shadow-sm hover:bg-gray-100">
              <img src="/img/google.png" alt="Google" className="w-8 h-8" />{" "}
              Google
            </button>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">atau</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <input
              type="email"
              placeholder="Nomor HP atau E-mail"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={handleChange}
            />
            <button
              className={`w-full mt-4 p-2 rounded-lg text-white ${
                isButtonDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={isButtonDisabled}
              onClick={handleRegister}
            >
              Daftar
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">
              Dengan mendaftar, saya menyetujui{" "}
              <span className="text-green-500 cursor-pointer">
                Syarat & Ketentuan
              </span>
              serta{" "}
              <span className="text-green-500 cursor-pointer">
                Kebijakan Privasi
              </span>
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
            <div className="flex justify-between mt-4">
              <button
                className="w-30 p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                onClick={() => setStep("register")}
              >
                Ubah
              </button>
              <button
                className="w-30 p-2 rounded-lg text-white bg-green-500 hover:bg-green-600"
                onClick={handleConfirm}
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
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mt-4"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button className="w-full mt-4 p-2 rounded-lg text-white bg-green-500 hover:bg-green-600">
              Verifikasi
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;

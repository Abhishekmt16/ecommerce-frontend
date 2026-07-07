import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  if (!email) {
  navigate("/checkout");
}

  const handleVerify = async () => {
    try {
      const res = await api.post(
        `/api/otp/verify?email=${email}&otp=${otp}`
      );

      if (res.data === "OTP_VERIFIED") {
       
        setSuccess(true);

        setTimeout(() => {
          navigate("/payment", {
          state: {
            amount: location.state.amount,
            email: location.state.email,
          },
        });
        }, 1500);
      } else {
        alert("Invalid OTP ❌");
      }

    } catch (err) {
      console.error(err);
      alert("OTP verification failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-80">

        <h2 className="text-xl font-bold mb-4">
          OTP Verification
        </h2>

        {success ? (
          <p className="text-green-600 font-bold text-lg">
            ✅ OTP Verified!
            Redirecting to payment...
          </p>
        ) : (
          <>
            <input
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerify}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Verify OTP
            </button>
          </>
        )}

      </div>
    </div>
  );
}
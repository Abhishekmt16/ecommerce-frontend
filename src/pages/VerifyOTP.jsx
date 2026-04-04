import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import api from "../api/axios";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email;

  const { clearCart } = useContext(CartContext);   // ✅ FIX HERE

  const handleVerify = async () => {
  try {
    const res = await api.post(
      `/api/otp/verify?email=${email}&otp=${otp}`
    );

    const text = res.data;

    if (text === "OTP_VERIFIED") {
      clearCart();
      alert("OTP Verified!");
      navigate("/");
    } else {
      alert("Invalid OTP");
    }

  } catch (err) {
    console.error(err);
    alert("OTP verification failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>OTP Verification Required</h2>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={handleVerify}>
        Verify OTP
      </button>
    </div>
  );
}
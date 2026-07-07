import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Biometric() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
   const location = useLocation();
 
  const handleBiometric = async () => {
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_AI_URL}/biometric/verify`, {
          method: "POST"
        });

        const data = await res.json();

        if (data.status === "VERIFIED") {

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

  alert("Biometric failed ❌");

}

      } catch (err) {
        console.error(err);
        alert("Biometric error ❌");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-96">

        <h2 className="text-2xl font-bold mb-4">
          Biometric Authentication
        </h2>

        {success ? (
          <p className="text-green-600 font-bold text-lg">
            ✅ Biometric Verified!
Redirecting to payment...
          </p>
        ) : loading ? (
          <div>
            <p className="text-gray-600 mb-4">🔍 Scanning...</p>
            <div className="animate-pulse text-blue-500">
              Please wait...
            </div>
          </div>
        ) : (
          <button
            onClick={handleBiometric}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            Scan Fingerprint / Face
          </button>
        )}

      </div>
    </div>
  );
}
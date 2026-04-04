import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Biometric() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const handleBiometric = async () => {
    setLoading(true);

    // ⏳ simulate scanning delay
    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:5000/biometric/verify", {
          method: "POST"
        });

        const data = await res.json();

        if (data.status === "VERIFIED") {
          clearCart();   // ✅ same like OTP
          alert("Biometric Verified! Order placed.");
          navigate("/");
        } else {
          alert("Biometric failed");
        }

      } catch (err) {
        console.error(err);
        alert("Biometric error");
      } finally {
        setLoading(false);
      }
    }, 2000); // 2 sec delay
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Biometric Authentication</h2>

      {loading ? (
        <p>🔍 Scanning fingerprint / face...</p>
      ) : (
        <button onClick={handleBiometric}>
          Scan Fingerprint / Face
        </button>
      )}
    </div>
  );
}
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const email = location.state?.email || "";
  const companyData = location.state?.companyData || null;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState(""); // "sending" | "sent" | "error"

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", { email, otp, companyData });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendStatus("sending");
    setError("");
    try {
      await axiosInstance.post("/auth/resend-otp", { email });
      setResendStatus("sent");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
      setResendStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="bg-[#0f172a] p-10 rounded-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-white text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-slate-400 mb-6">Enter the 6-digit code sent to {email}</p>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="000000"
            className="w-full p-4 bg-slate-950 border border-slate-700 text-white rounded-xl text-center text-2xl tracking-[10px]"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {resendStatus === "sent" && (
            <p className="text-green-400 text-sm">A new code has been sent to your email.</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <p className="text-slate-500 text-sm mt-4 text-center">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={handleResend}
            disabled={resendStatus === "sending"}
            className="text-indigo-400 hover:text-indigo-300 font-medium disabled:opacity-50"
          >
            {resendStatus === "sending" ? "Sending..." : "Resend Code"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;

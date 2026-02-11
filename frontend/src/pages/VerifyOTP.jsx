
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-all"
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
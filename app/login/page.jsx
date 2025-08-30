"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_CREDENTIALS } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setErr("Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      {/* Mobile Layout */}
      <div className="sm:hidden h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col">
        {/* Mobile Header */}
        <div className="px-6 pt-12 pb-6 text-center relative flex-shrink-0">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full filter blur-xl animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-300/20 rounded-full filter blur-xl animate-pulse delay-75"></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-indigo-300/15 rounded-full filter blur-xl animate-pulse delay-150"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 grid place-items-center rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-lg shadow-2xl">
                4U
              </div>
              <span className="ml-3 text-2xl font-black text-white tracking-wider drop-shadow-lg">
                4USTACK
              </span>
            </div>
            <p className="text-blue-100 text-base font-medium">
              Empowering Digital Innovation
            </p>
          </div>
        </div>

        {/* Mobile Login Form */}
        <div className="flex-1 bg-white rounded-t-3xl px-6 py-6 relative shadow-2xl overflow-auto">
          <div className="max-w-sm mx-auto">
            {/* Form Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-xl">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">Admin Login</h1>
              <p className="text-sm text-gray-500">
                Authorized access only
              </p>
            </div>

            {/* Error Message */}
            {err && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-red-700 text-sm font-medium">{err}</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-11 text-gray-800 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 group-hover:border-gray-300 shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative group">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pl-11 pr-16 text-gray-800 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 group-hover:border-gray-300 shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    disabled={isLoading}
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl py-3 transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 flex items-center justify-center space-x-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex h-full w-full">
        {/* Left Side - Company Info */}
        <div className="flex flex-col justify-center w-1/2 px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-40 h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 bg-blue-300/10 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-75"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-indigo-300/8 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-150"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-md lg:max-w-lg xl:max-w-xl">
            {/* Company Logo & Name */}
            <div className="flex items-center mb-4 lg:mb-6">
              <div className="h-12 w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 grid place-items-center rounded-2xl lg:rounded-3xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold text-lg lg:text-xl shadow-2xl">
                4U
              </div>
              <span className="ml-3 lg:ml-4 text-2xl lg:text-3xl xl:text-4xl font-black text-white tracking-wider drop-shadow-2xl">
                4USTACK
              </span>
            </div>

            {/* Company Tagline */}
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 lg:mb-4 xl:mb-6 leading-tight">
              Empowering Digital
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
                Innovation
              </span>
            </h1>

            {/* Company Description */}
            <div className="space-y-3 lg:space-y-4 text-blue-100 text-sm lg:text-base xl:text-lg leading-relaxed mb-4 lg:mb-6 xl:mb-8">
              <p className="text-base lg:text-lg xl:text-xl font-medium">
                We are a cutting-edge technology company specializing in comprehensive 
                digital solutions that transform businesses and drive innovation.
              </p>
              
              <div className="grid gap-2 lg:gap-3">
                {[
                  "Web Application Development",
                  "AI Agents & Machine Learning", 
                  "Blockchain Solutions",
                  "Cloud Computing & Architecture",
                  "DevOps & CI/CD Solutions"
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm lg:text-base">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visit Website Button */}
            <button
              onClick={() => window.open('https://4ustack.com', '_blank')}
              className="group inline-flex items-center px-4 lg:px-6 xl:px-8 py-2 lg:py-3 bg-white/10 backdrop-blur-md border border-white/25 rounded-xl text-white font-semibold text-sm lg:text-base hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>Visit Company Website</span>
              <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center w-1/2 p-4 lg:p-6 xl:p-8 bg-gradient-to-br from-gray-50 via-blue-50/50 to-indigo-50/50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 lg:w-56 lg:h-56 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="w-full max-w-sm lg:max-w-md relative z-10">
            {/* Login Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 lg:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl mb-4 shadow-2xl">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-2">Admin Login</h1>
                <p className="text-sm lg:text-base text-gray-600">
                  Access restricted to authorized personnel
                </p>
              </div>

              {/* Error Message */}
              {err && (
                <div className="mb-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-red-700 text-sm font-medium">{err}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={onSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border-2 border-gray-200/80 bg-white/50 px-4 py-3 pl-10 text-gray-800 text-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white hover:border-gray-300 hover:bg-white/70 shadow-lg backdrop-blur-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={show ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border-2 border-gray-200/80 bg-white/50 px-4 py-3 pl-10 pr-16 text-gray-800 text-sm outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:bg-white hover:border-gray-300 hover:bg-white/70 shadow-lg backdrop-blur-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors"
                      disabled={isLoading}
                    >
                      {show ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg py-3 text-sm transition-all duration-300 shadow-xl hover:shadow-2xl disabled:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 flex items-center justify-center space-x-2"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <p className="text-center text-xs text-gray-500">
                  Protected by enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1)

  const handleNext = (e) => {
    e.preventDefault()
    if (username.trim()) {
      setStep(2)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login submitted:', { username, password })
    setStep(3)
    // Navigate to /build after a brief delay to show success
    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess()
      }
      navigate('/build')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Dark */}
      <div className="bg-[#101828] flex flex-col items-center px-4 sm:px-6 py-8 sm:py-10 lg:py-10 lg:w-[46%] lg:min-h-screen">
        {/* Decorative Bar with Ellipses */}
        <div className="bg-[#b9afaf] rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center w-full max-w-[500px] mb-8 sm:mb-12 lg:mb-20 gap-4 sm:gap-8 lg:gap-12">
          {/* Circle 1 */}
          <div className="flex-1 max-w-[85px] aspect-[85/59]">
            <svg className="w-full h-full" viewBox="0 0 85 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="42.5" cy="29.5" rx="42.5" ry="29.5" fill="#D9D9D9"/>
            </svg>
          </div>
          {/* Circle 2 */}
          <div className="flex-1 max-w-[85px] aspect-[85/59]">
            <svg className="w-full h-full" viewBox="0 0 85 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="42.5" cy="29.5" rx="42.5" ry="29.5" fill="#D9D9D9"/>
            </svg>
          </div>
          {/* Circle 3 */}
          <div className="flex-1 max-w-[85px] aspect-[85/59]">
            <svg className="w-full h-full" viewBox="0 0 85 59" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="42.5" cy="29.5" rx="42.5" ry="29.5" fill="#D9D9D9"/>
            </svg>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl px-5 sm:px-8 py-6 sm:py-10 w-full max-w-[470px] min-h-[450px]">
          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[#6b7280] text-xs font-bold tracking-wide">STEP</span>
            <div className="flex items-center gap-1 text-xs font-bold">
              <span className="text-[#111827]">{Math.min(step, 2)}</span>
              <span className="text-[#6b7280]">OF 2</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8 lg:mb-11">
            <h1 className="text-[#111827] text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-3">
              {step === 1 ? 'Login' : step === 2 ? 'Password' : 'Success!'}
            </h1>
            <p
              className="text-[#6b7280] text-sm leading-[14px]"
            >
              {step === 1
                ? 'Enter your username to continue'
                : step === 2
                ? 'Enter your password to login'
                : 'You have successfully logged in'}
            </p>
          </div>

          {/* Form */}
          {step < 3 && (
            <form onSubmit={step === 1 ? handleNext : handleSubmit}>
              {/* Username Field - Step 1 */}
              {step === 1 && (
                <div className="mb-10 sm:mb-12 lg:mb-16">
                  <label className="block text-[#111827] text-[13px] font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. aaron123"
                    className="w-full h-[50px] sm:h-[54px] bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-2xl px-4 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00c2c7] transition-colors"
                  />
                </div>
              )}

              {/* Password Field - Step 2 */}
              {step === 2 && (
                <div className="mb-10 sm:mb-12 lg:mb-16">
                  <label className="block text-[#111827] text-[13px] font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-[50px] sm:h-[54px] bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-2xl px-4 text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#00c2c7] transition-colors"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 sm:h-14 bg-[#00c2c7] hover:bg-[#00b0b5] active:bg-[#009a9e] rounded-2xl text-white text-base sm:text-lg font-bold transition-colors cursor-pointer"
              >
                {step === 1 ? 'Next →' : 'Submit'}
              </button>
            </form>
          )}

          {/* Success Message - Step 3 */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 bg-[#00c2c7] rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[#111827] font-bold text-lg">Welcome, {username}!</p>
            </div>
          )}

          {/* Links */}
          <div className="flex justify-between items-center mt-3 sm:mt-4 gap-4">
            {step === 1 && (
              <>
                <button className="text-[#00a7ab] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer bg-transparent border-none">
                  Use email instead
                </button>
                <button className="text-[#00a7ab] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer bg-transparent border-none">
                  Need help?
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[#00a7ab] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer bg-transparent border-none"
                >
                  ← Back
                </button>
                <button className="text-[#00a7ab] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer bg-transparent border-none">
                  Forgot password?
                </button>
              </>
            )}
            {step === 3 && (
              <button
                type="button"
                onClick={() => {
                  setStep(1)
                  setUsername('')
                  setPassword('')
                }}
                className="text-[#00a7ab] text-xs sm:text-[13px] font-bold hover:underline cursor-pointer bg-transparent border-none mx-auto"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Video */}
      <div className="relative flex-1 min-h-[150px] sm:min-h-[200px] lg:min-h-screen lg:w-[54%] overflow-hidden">
        {/* Teal overlay for branding consistency */}
        <div className="absolute inset-0 bg-[#00c6c2]/30 z-10" />

        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Fallback background color if video fails to load */}
        <div className="absolute inset-0 bg-[#00c6c2] -z-10" />
      </div>
    </div>
  )
}

export default LoginPage

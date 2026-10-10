"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useShopContext } from "@/contexts/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"
import { Eye, EyeOff, ArrowLeft, Shield, Smartphone } from "lucide-react"
import { formatPhoneNumber } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import FadeIn from "@/components/animations/FadeIn"

const LoginContent = () => {
  const [currentState, setCurrentState] = useState<"Login" | "Sign Up">("Login")
  const { setToken, navigate, backendUrl } = useShopContext()

  const [identifier, setIdentifier] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("+91 ")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [timer, setTimer] = useState(30)
  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [forgotPassword, setForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOtpLoading, setIsOtpLoading] = useState(false)
  const [isVerifyLoading, setIsVerifyLoading] = useState(false)
  const [isResetLoading, setIsResetLoading] = useState(false)

  const startResendTimer = () => {
    setResendDisabled(true)
    setTimer(30)
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const sendOtpHandler = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber)
    setIsOtpLoading(true)

    try {
      const response = await axios.post(`${backendUrl}/api/user/send-otp`, {
        phoneNumber: formattedPhoneNumber,
      })

      if (response.data.success) {
        toast.success("OTP sent to your phone successfully!")
        setOtpSent(true)
        startResendTimer()
      } else {
        toast.error(response.data.message || "Failed to send OTP")
      }
    } catch (error: any) {
      console.error("Error in sendOtpHandler:", error)
      toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.")
    } finally {
      setIsOtpLoading(false)
    }
  }

  const verifyOtpHandler = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber)
    setIsVerifyLoading(true)

    try {
      const response = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        phoneNumber: formattedPhoneNumber,
        otp,
      })

      if (response.data.success) {
        toast.success("Phone number verified successfully!")
        setIsOtpVerified(true)
        setOtpSent(false)
      } else {
        toast.error(response.data.message || "Invalid OTP")
        setIsOtpVerified(false)
      }
    } catch (error: any) {
      console.error("Error in verifyOtpHandler:", error)
      toast.error(error.response?.data?.message || "OTP verification failed. Please try again.")
      setIsOtpVerified(false)
    } finally {
      setIsVerifyLoading(false)
    }
  }

  const resetPasswordHandler = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber)
    if (!isOtpVerified) {
      toast.error("Please verify your OTP before resetting your password.")
      return
    }
    setIsResetLoading(true)

    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
        phoneNumber: formattedPhoneNumber,
        newPassword,
      })
      if (response.data.success) {
        toast.success("Password reset successfully!")
        setForgotPassword(false)
        setCurrentState("Login")
        // Reset form
        setPhoneNumber("+91 ")
        setOtp("")
        setNewPassword("")
        setIsOtpVerified(false)
      } else {
        toast.error(response.data.message || "Failed to reset password")
      }
    } catch (error: any) {
      console.error("Error in resetPasswordHandler:", error)
      toast.error(error.response?.data?.message || "Failed to reset password. Please try again.")
    } finally {
      setIsResetLoading(false)
    }
  }

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault()
    setIsLoading(true)

    if (currentState === "Sign Up") {
      if (!isOtpVerified) {
        toast.error("Please verify your OTP before proceeding.")
        setIsLoading(false)
        return
      }

      try {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          phoneNumber: formatPhoneNumber(phoneNumber),
        })

        if (response.data.success) {
          toast.success("Registration successful! Welcome to IMPACTPURE!")
          setToken(response.data.token)
          if (typeof window !== "undefined") {
            localStorage.setItem("token", response.data.token)
          }
          navigate("/")
        } else {
          toast.error(response.data.message || "Registration failed")
        }
      } catch (error: any) {
        console.error("Error in registration:", error)
        toast.error(error.response?.data?.message || "Registration failed. Please try again.")
      }
    } else {
      try {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          identifier,
          password,
        })

        if (response.data.success) {
          toast.success("Login successful! Welcome back!")
          setToken(response.data.token)
          if (typeof window !== "undefined") {
            localStorage.setItem("token", response.data.token)
          }
          navigate("/")
        } else {
          toast.error(response.data.message || "Invalid credentials")
        }
      } catch (error: any) {
        console.error("Error in login:", error)
        toast.error(error.response?.data?.message || "Login failed. Please check your credentials.")
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield size={24} />
                </div>
              </div>
              <h1 className="text-2xl font-medium text-center">{forgotPassword ? "Reset Password" : currentState}</h1>
              <p className="text-primary-100 text-center mt-2">
                {forgotPassword
                  ? "Secure your account with a new password"
                  : currentState === "Login"
                    ? "Welcome back to IMPACTPURE"
                    : "Join the IMPACTPURE family"}
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {forgotPassword ? (
                  <motion.div
                    key="forgot-password"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-2">
                      <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number (starts with +91)"
                        disabled={isOtpVerified}
                        className="flex-1"
                      />
                      {!isOtpVerified && (
                        <Button
                          onClick={sendOtpHandler}
                          disabled={resendDisabled || isOtpLoading}
                          variant="outline"
                          size="sm"
                          isLoading={isOtpLoading}
                        >
                          {isOtpLoading ? "Sending..." : "Send OTP"}
                        </Button>
                      )}
                    </div>

                    {!isOtpVerified && resendDisabled && (
                      <p className="text-sm text-neutral-500 text-center">Resend OTP in {timer} seconds</p>
                    )}

                    {otpSent && !isOtpVerified && (
                      <div className="flex items-center space-x-2">
                        <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                        <Button
                          onClick={verifyOtpHandler}
                          disabled={isVerifyLoading}
                          variant="outline"
                          size="sm"
                          isLoading={isVerifyLoading}
                        >
                          {isVerifyLoading ? "Verifying..." : "Verify"}
                        </Button>
                      </div>
                    )}

                    {isOtpVerified && (
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    )}

                    <Button
                      onClick={resetPasswordHandler}
                      disabled={!isOtpVerified || isResetLoading}
                      className="w-full"
                      isLoading={isResetLoading}
                    >
                      {isResetLoading ? "Resetting..." : "Reset Password"}
                    </Button>

                    <button
                      onClick={() => setForgotPassword(false)}
                      className="flex items-center justify-center w-full text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back to Login
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={currentState}
                    initial={{ opacity: 0, x: currentState === "Login" ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentState === "Login" ? 20 : -20 }}
                    onSubmit={onSubmitHandler}
                    className="space-y-6"
                  >
                    {currentState === "Login" ? (
                      <>
                        <Input
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="Email or Phone Number"
                          required
                        />
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <button
                            type="button"
                            onClick={() => setForgotPassword(true)}
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            Forgot password?
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentState("Sign Up")}
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                          >
                            Create account
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name"
                          required
                        />
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2 flex-1">
                            <Smartphone size={16} className="text-neutral-400" />
                            <Input
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="Phone Number"
                              disabled={isOtpVerified}
                              className="flex-1"
                            />
                          </div>
                          {!isOtpVerified && (
                            <Button
                              type="button"
                              onClick={sendOtpHandler}
                              disabled={resendDisabled || isOtpLoading}
                              variant="outline"
                              size="sm"
                              isLoading={isOtpLoading}
                            >
                              {isOtpLoading ? "Sending..." : "Send OTP"}
                            </Button>
                          )}
                        </div>

                        {!isOtpVerified && resendDisabled && (
                          <p className="text-sm text-neutral-500 text-center">Resend OTP in {timer} seconds</p>
                        )}

                        {otpSent && !isOtpVerified && (
                          <div className="flex items-center space-x-2">
                            <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                            <Button
                              type="button"
                              onClick={verifyOtpHandler}
                              disabled={isVerifyLoading}
                              variant="outline"
                              size="sm"
                              isLoading={isVerifyLoading}
                            >
                              {isVerifyLoading ? "Verifying..." : "Verify"}
                            </Button>
                          </div>
                        )}

                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          required
                        />
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create Password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCurrentState("Login")}
                          className="text-sm text-neutral-600 hover:text-primary-600 transition-colors"
                        >
                          Already have an account? Login here
                        </button>
                      </>
                    )}

                    <Button type="submit" disabled={isLoading} className="w-full" isLoading={isLoading}>
                      {isLoading ? "Please wait..." : currentState === "Login" ? "Sign In" : "Create Account"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default LoginContent

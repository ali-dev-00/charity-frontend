"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthService from "@/app/services/authService"
import { RegisterRequest } from "@/app/services/types/authTypes"
import { useRouter } from "next/navigation"
import Toast from "@/app/components/common/toaster"

export default function SignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)  // For loading state
  const [showToast, setShowToast] = useState(false)  
  const [toastType, setToastType] = useState<'success' | 'error'>('success') 
  const [toastMessage, setToastMessage] = useState('')  // To store the toast message

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    const registerData: RegisterRequest = {
      name,
      email,
      password,
      role: 'donor',  
    }

    setIsLoading(true) 

    try {
      // Make sure the API call is being made here
      console.log("Sending data to register:", registerData);
      const response = await AuthService.register(registerData)

      console.log("Response from backend:", response);  // Debugging the response

      if (response.status) {
        setToastType('success')
        setToastMessage("Account created successfully!")
        setShowToast(true)
        setSuccess("Account created successfully!")

        if (response?.data?.role === 'admin') {
          router.push("/dashboard") 
        } else {  
          router.push("/home") 
        }
      } else {
        setError(response.message || "Registration failed. Please try again.")
        setToastType('error')
        setToastMessage(response.message || "Registration failed. Please try again.")
        setShowToast(true)
      }
    }catch (err) {
      console.error("An error occurred while creating the account:", err); // Log the error
      setError("An error occurred while creating the account.")
      setToastType('error')
      setToastMessage("An error occurred while creating the account.")
      setShowToast(true)
    } finally {
      setIsLoading(false)  // Stop loading
    }
  }

  return (
    <Card className="mx-auto max-w-md w-[500px] bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-theme-green">Create an account</CardTitle>
        <CardDescription className="text-muted-foreground text-gray-600">Enter your details to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 text-gray-600">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="border-gray-200 focus:ring-[#f25f4a] focus:border-none"
              id="name"
              type="text"
              placeholder="John Doe"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="border-gray-200 focus:ring-[#f25f4a] focus:border-none"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-theme-green" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="pr-10 border-gray-200 focus:ring-[#f25f4a] focus:border-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password" className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-theme-green" />
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="pr-10 border-gray-200 focus:ring-[#f25f4a] focus:border-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {password !== confirmPassword && confirmPassword && (
              <p className="text-red-500 mt-2">Passwords do not match.</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#f25f4a] hover:bg-[#f25f4a]/90 text-white"
            disabled={isLoading} 
            onClick={handleSubmit}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
            {isLoading && <div className="ml-2 inline-block animate-spin h-4 w-4 border-t-2 border-white border-solid rounded-full" />}
          </Button>
         
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="underline text-[#f25f4a] hover:text-[#f25f4a]/90">
            Sign in
          </Link>
        </div>
      </CardContent>

      {/* Toast Notifications */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </Card>
  )
}

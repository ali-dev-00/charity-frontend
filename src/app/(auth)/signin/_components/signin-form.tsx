"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthService from "@/app/services/authService"
import { LoginRequest } from "@/app/services/types/authTypes"
import { useRouter } from "next/navigation"
import Toast from "@/app/components/common/toaster"

export default function SignInForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)  
  const [toastType, setToastType] = useState<'success' | 'error'>('success') 
  const [toastMessage, setToastMessage] = useState('')  // To store the toast message
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // For handling the loader state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset previous validation errors
    setEmailError('')
    setPasswordError('')

    let isValid = true

    // Validate email
    if (!email) {
      setEmailError("Email is required")
      isValid = false
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    }

    if (!isValid) return

    const loginData: LoginRequest = { email, password }

    setIsLoading(true)  

    try {
      const response = await AuthService.login(loginData)

      if (response.status) {
        const userRole = response?.data?.role
        if (userRole === 'admin') {
          router.push("/dashboard") 
          console.log('admin')
        } else {
          router.push("/home") 
          console.log('admin')
        }
        setToastType('success')
        setToastMessage('Login successful')
        setShowToast(true)


        
      } else {
        setError(response.message || "Login failed. Please try again.")
        setToastType('error')
        setToastMessage(response.message || "Login failed. Please try again.")
        setShowToast(true)
      }
    } catch (err) {
      setError("An error occurred while logging in.")
      setToastType('error')
      setToastMessage("An error occurred while logging in.")
      setShowToast(true)
    } finally {
      setIsLoading(false) 
    }
  }

  return (
    <Card className="mx-auto max-w-md w-[500px] bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-theme-green">Sign In</CardTitle>
        <CardDescription className="text-muted-foreground text-gray-600">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 text-gray-600">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="focus:ring-[#f25f4a] border-gray-200 focus:border-none"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-theme-green" />
                Password
              </Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline text-theme-orange hover:text-theme-orange/90"
              >
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="pr-10 focus:border-none border-gray-200 focus:ring-[#f25f4a]"
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
            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          </div>
          <Button type="submit" className="w-full bg-[#f25f4a] hover:bg-[#f25f4a]/90 cursor-pointer text-white" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
            {isLoading && <div className="ml-2 inline-block animate-spin h-4 w-4 border-t-2 border-white border-solid rounded-full" />}
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="underline text-[#f25f4a] hover:text-[#f25f4a]/90 cursor-pointer">
            Sign up
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

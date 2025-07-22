"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User } from "lucide-react"

interface FormData {
  profession: string
  name: string
  cellNo: string
  whatsappNo: string
  emailId: string
  address: string
  city: string
  province: string
}

export default function MembersRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    profession: "",
    name: "",
    cellNo: "",
    whatsappNo: "",
    emailId: "",
    address: "",
    city: "",
    province: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Form submitted:", formData)
    alert("Registration submitted successfully!")
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-md sm:max-w-xl mx-auto px-4">
      <Card className="border-none shadow-none">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl text-center font-bold text-gray-800 p-0">MEMBERS REGISTRATION FORM</CardTitle>
        </CardHeader>

        <CardContent className="border border-gray-300 py-6 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Profile Photo Circle */}
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>

              {/* Upload Button */}
              <button
                type="button"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload Image</span>
              </button>
            </div>

            {/* Add Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Details</h3>

              {/* Profession Dropdown */}
              <div className="space-y-2">
                <Select value={formData.profession} onValueChange={(value) => handleInputChange("profession", value)}>
                  <SelectTrigger className="w-full rounded-full text-gray-500 border-none bg-gray-100">
                    <SelectValue placeholder="Profession" />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-gray-100">
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="Name *"
                  />

                  <Input
                    type="tel"
                    value={formData.whatsappNo}
                    onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="Whatsapp No. *"
                  />

                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="Address *"
                  />

                  <Input
                    type="text"
                    value={formData.province}
                    onChange={(e) => handleInputChange("province", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="Province"
                  />
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <Input
                    type="tel"
                    value={formData.cellNo}
                    onChange={(e) => handleInputChange("cellNo", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="Cell No. *"
                  />

                  <Input
                    type="email"
                    value={formData.emailId}
                    onChange={(e) => handleInputChange("emailId", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="Email ID"
                  />

                  <Input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100 transition-all duration-200 focus:ring-2 focus:ring-[#007466] focus:border-[#007466]"
                    placeholder="City *"
                  />
                </div>
              </div>
              {/* Other Hobby Input */}
              <div className="pt-4">
                <Input
                  id="otherHobby"
                  type="text"
                  className="w-full rounded-full border-none bg-gray-100"
                  placeholder="Other"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#F25F4A] hover:bg-[#e54d37] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

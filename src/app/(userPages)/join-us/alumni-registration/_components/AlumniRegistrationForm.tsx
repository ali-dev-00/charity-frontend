"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Toast from "@/app/components/common/toaster"
import AlumniService from "@/app/services/alumniService"
import { AlumniCreateRequest } from "@/app/services/types/alumniTypes"

export default function AlumniRegistrationForm() {
  const [formData, setFormData] = useState<AlumniCreateRequest>({
    exStudent: "ex-student", // Correct initial value
    orphanStatus: "orphan",
    schoolName: "",
    degreeCertificate: "",
    passingYear: "",
    name: "",
    fatherName: "",
    cell_no: "",
    whatsappNo: "",
    email: "",
    Country: "",
    City: "",
    Province: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    permanentAddress: "",
    mailingAddress: "",
    institute: "",
    faculty: "",
    degree: "",
    organization: "",
    designation: "",
    location: "",
    hobbies: {
      contentWriting: false,
      socialMedia: false,
      fundRaising: false,
      voiceOver: false,
      teacherTraining: false,
      otherHobby: "",
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (field: keyof Omit<AlumniCreateRequest, "hobbies">, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleHobbyChange = (
    hobby: "contentWriting" | "socialMedia" | "fundRaising" | "voiceOver" | "teacherTraining" | "otherHobby",
    value: boolean | string
  ) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: {
        ...prev.hobbies,
        [hobby]: value,
      },
    }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.cell_no) newErrors.cell_no = "Cell number is required"
    if (!formData.schoolName) newErrors.schoolName = "School/College Name is required"
    if (!formData.degreeCertificate) newErrors.degreeCertificate = "Degree/Certificate is required"
    if (!formData.passingYear) newErrors.passingYear = "Passing Year is required"
    if (!formData.fatherName) newErrors.fatherName = "Father's name is required"
    if (!formData.Country) newErrors.Country = "Country is required"
    if (!formData.City) newErrors.City = "City is required"
    if (!formData.Province) newErrors.Province = "Province is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required"
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital Status is required"
    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.permanentAddress) newErrors.permanentAddress = "Permanent Address is required"
    if (!formData.mailingAddress) newErrors.mailingAddress = "Mailing Address is required"
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})  // Clear previous errors

    try {
      const response = await AlumniService.create(formData)
      if (response.status) {
        setToast({ message: "Alumni created successfully", type: "success" })
        setFormData({
          exStudent: "ex-student",
          orphanStatus: "orphan",
          schoolName: "",
          degreeCertificate: "",
          passingYear: "",
          name: "",
          fatherName: "",
          cell_no: "",
          whatsappNo: "",
          email: "",
          Country: "",
          City: "",
          Province: "",
          dateOfBirth: "",
          maritalStatus: "",
          gender: "",
          permanentAddress: "",
          mailingAddress: "",
          institute: "",
          faculty: "",
          degree: "",
          organization: "",
          designation: "",
          location: "",
          hobbies: {
            contentWriting: false,
            socialMedia: false,
            fundRaising: false,
            voiceOver: false,
            teacherTraining: false,
            otherHobby: "",
          },
        })
      }
    } catch (error) {
      setToast({ message: "Error creating alumni. Please try again.", type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md sm:max-w-xl mx-auto px-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Card className="border-none shadow-none">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl text-center font-bold text-gray-800 p-0">
            ALUMNI REGISTRATION FORM
          </CardTitle>
        </CardHeader>

        <CardContent className="border border-gray-300 py-4 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Top Level Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Select value={formData.exStudent} onValueChange={(value) => handleInputChange("exStudent", value)}>
                  <SelectTrigger className="w-full rounded-full text-gray-500 border-none bg-gray-100">
                    <SelectValue placeholder="Ex Student" />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-gray-100">
                    <SelectItem value="ex-student">Ex-Student</SelectItem>
                    <SelectItem value="ex-employee">Ex-Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Select value={formData.orphanStatus} onValueChange={(value) => handleInputChange("orphanStatus", value)}>
                  <SelectTrigger className="w-full rounded-full text-gray-500 border-none bg-gray-100">
                    <SelectValue placeholder="Select Orphan Status" />
                  </SelectTrigger>
                  <SelectContent className="border-none bg-gray-100">
                    <SelectItem value="orphan">An Orphan</SelectItem>
                    <SelectItem value="not-orphan">Not an Orphan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                Academic Information (OLAD Foundation)
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Input
                    id="schoolName"
                    type="text"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange("schoolName", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="School/College Name"
                  />
                  {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="degree-certificate"
                    type="text"
                    value={formData.degreeCertificate}
                    onChange={(e) => handleInputChange("degreeCertificate", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Degree/Certificate"
                  />
                  {errors.degreeCertificate && <p className="text-red-500 text-sm">{errors.degreeCertificate}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="passing-year"
                    type="text"
                    value={formData.passingYear}
                    onChange={(e) => handleInputChange("passingYear", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Passing Year"
                  />
                  {errors.passingYear && <p className="text-red-500 text-sm">{errors.passingYear}</p>}
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="father-name"
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange("fatherName", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Father's Name"
                  />
                  {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="cell_no"
                    type="text"
                    value={formData.cell_no}
                    onChange={(e) => handleInputChange("cell_no", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Cell #"
                  />
                  {errors.cell_no && <p className="text-red-500 text-sm">{errors.cell_no}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="whatsapp-no"
                    type="tel"
                    value={formData.whatsappNo}
                    onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="WhatsApp #"
                  />
                  {errors.whatsappNo && <p className="text-red-500 text-sm">{errors.whatsappNo}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="City"
                    type="text"
                    value={formData.City}
                    onChange={(e) => handleInputChange("City", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="City"
                  />
                  {errors.City && <p className="text-red-500 text-sm">{errors.City}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="Province"
                    type="text"
                    value={formData.Province}
                    onChange={(e) => handleInputChange("Province", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Province"
                  />
                  {errors.Province && <p className="text-red-500 text-sm">{errors.Province}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="Country"
                    type="text"
                    value={formData.Country}
                    onChange={(e) => handleInputChange("Country", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Country"
                  />
                  {errors.Country && <p className="text-red-500 text-sm">{errors.Country}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="date-of-birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="w-full text-gray-500 rounded-full border-none bg-gray-100"
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger id="marital-status" className="w-full rounded-full text-gray-500 border-none bg-gray-100">
                      <SelectValue placeholder="Marital Status" />
                    </SelectTrigger>
                    <SelectContent className="border-none bg-gray-100">
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
                </div>

                <div className="space-y-2">
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger id="gender" className="w-full rounded-full text-gray-500 border-none bg-gray-100">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent className="border-none bg-gray-100">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>

                <div className="space-y-2">
                  <Input
                    id="permanent-address"
                    type="text"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Permanent Address"
                  />
                  {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Input
                    id="mailingAddress"
                    type="text"
                    value={formData.mailingAddress}
                    onChange={(e) => handleInputChange("mailingAddress", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Mailing Address"
                  />
                  {errors.mailingAddress && <p className="text-red-500 text-sm">{errors.mailingAddress}</p>}
                </div>
              </div>
            </div>

            {/* Current College/University Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                Current College/University (If Any)
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Input
                    id="institute"
                    type="text"
                    value={formData.institute}
                    onChange={(e) => handleInputChange("institute", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Institute name"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    id="faculty"
                    type="text"
                    value={formData.faculty}
                    onChange={(e) => handleInputChange("faculty", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Faculty"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    id="degree"
                    type="text"
                    value={formData.degree}
                    onChange={(e) => handleInputChange("degree", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Degree"
                  />
                </div>
              </div>
            </div>

            {/* Current Profession Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                Current Profession (If Any)
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Input
                    id="designation"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Designation"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Organization"
                  />
                </div>

                <div className="space-y-2">
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="w-full rounded-full border-none bg-gray-100"
                    placeholder="Location"
                  />
                </div>
              </div>
            </div>

            {/* Hobbies & Skills Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                Hobbies & Skills (in which areas you can be helpful to OLAD Foundation)
              </h3>
              <div className="flex flex-wrap gap-[10px]">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contentWriting"
                    checked={formData.hobbies!.contentWriting}
                    onCheckedChange={(checked) => handleHobbyChange("contentWriting", checked as boolean)}
                    className="data-[state=checked]:bg-[#007466] data-[state=checked]:border-[#007466]"
                  />
                  <Label htmlFor="contentWriting" className="text-sm text-gray-600">
                    Content Writing
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="socialMedia"
                    checked={formData.hobbies!.socialMedia}
                    onCheckedChange={(checked) => handleHobbyChange("socialMedia", checked as boolean)}
                    className="data-[state=checked]:bg-[#007466] data-[state=checked]:border-[#007466]"
                  />
                  <Label htmlFor="socialMedia" className="text-sm text-gray-600">
                    Social Media
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fundRaising"
                    checked={formData.hobbies!.fundRaising}
                    onCheckedChange={(checked) => handleHobbyChange("fundRaising", checked as boolean)}
                    className="data-[state=checked]:bg-[#007466] data-[state=checked]:border-[#007466]"
                  />
                  <Label htmlFor="fundRaising" className="text-sm text-gray-600">
                    Fund Raising
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="voiceOver"
                    checked={formData.hobbies!.voiceOver}
                    onCheckedChange={(checked) => handleHobbyChange("voiceOver", checked as boolean)}
                    className="data-[state=checked]:bg-[#007466] data-[state=checked]:border-[#007466]"
                  />
                  <Label htmlFor="voiceOver" className="text-sm text-gray-600">
                    Voice Over
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teacher-training"
                    checked={formData.hobbies!.teacherTraining}
                    onCheckedChange={(checked) => handleHobbyChange("teacherTraining", checked as boolean)}
                    className="data-[state=checked]:bg-[#007466] data-[state=checked]:border-[#007466]"
                  />
                  <Label htmlFor="teacher-training" className="text-sm text-gray-600">
                    Teacher Training
                  </Label>
                </div>
              </div>
              {/* Other Hobby Input */}
              <div className="pt-4">
                <Input
                  id="otherHobby"
                  type="text"
                  value={formData.hobbies!.otherHobby}
                  onChange={(e) => handleHobbyChange("otherHobby", e.target.value)}
                  className="w-full rounded-full border-none bg-gray-100"
                  placeholder="Other"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
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
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

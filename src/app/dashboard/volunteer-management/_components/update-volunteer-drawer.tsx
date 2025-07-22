import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import Toast from "@/app/components/common/toaster";
import VolunteerService from "@/app/services/VolunteerService";
import { VolunteerUpdateRequest } from "@/app/services/types/volunteerTypes";

interface UpdateVolunteerDrawerProps {
    open: boolean;
    volunteerId: string;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void; // Add onSuccess callback prop
}


export function UpdateVolunteerDrawer({ open, volunteerId, onOpenChange, onSuccess }: UpdateVolunteerDrawerProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<VolunteerUpdateRequest>({
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
        profilePhoto: null,
    });
    const cleanPayload = (data: VolunteerUpdateRequest) => {
        const cleanedData = JSON.parse(JSON.stringify(data));
        delete cleanedData._id;
        delete cleanedData.createdAt;
        delete cleanedData.updatedAt;
        delete cleanedData.__v;
        if (cleanedData.hobbies) {
            delete cleanedData.hobbies._id;
        }

        return cleanedData;
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Fetch existing volunteer data on opening the drawer or volunteerId change
    useEffect(() => {
        if (!volunteerId) return;
        VolunteerService.getById(volunteerId)
            .then((response) => {
                if (response.status) {
                    setFormData(response.data); // Populate form data with fetched volunteer data
                } else {
                    setToast({ message: "Failed to fetch volunteer data.", type: "error" });
                }
            })
            .catch(() => {
                setToast({ message: "Error fetching volunteer data.", type: "error" });
            });
    }, [volunteerId]);

    // Handle input change
    const handleInputChange = (field: keyof VolunteerUpdateRequest, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle file change for profile photo
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null; // If no file selected, set as null
        setFormData((prev) => ({
            ...prev,
            profilePhoto: file, // Update the profile photo field with file or null
        }));
    };

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
        }));
    };

    // Validation functions for each step
    const validateStep1 = () => {
        const step1Errors: { [key: string]: string } = {};
        if (!formData.name) step1Errors.name = "Name is required";
        if (!formData.email) step1Errors.email = "Email is required";
        if (!formData.cell_no) step1Errors.cell_no = "Cell number is required";
        if (!formData.schoolName) step1Errors.schoolName = "School/College Name is required";
        if (!formData.degreeCertificate) step1Errors.degreeCertificate = "Degree/Certificate is required";
        if (!formData.passingYear) step1Errors.passingYear = "Passing Year is required";
        if (!formData.fatherName) step1Errors.fatherName = "Father's name is required";
        if (!formData.Country) step1Errors.Country = "Country is required";
        if (!formData.City) step1Errors.City = "City is required";
        if (!formData.Province) step1Errors.Province = "Province is required";
        if (!formData.dateOfBirth) step1Errors.dateOfBirth = "Date of Birth is required";
        if (!formData.maritalStatus) step1Errors.maritalStatus = "Marital Status is required";
        if (!formData.gender) step1Errors.gender = "Gender is required";
        return step1Errors;
    };

    const validateStep2 = () => {
        const step2Errors: { [key: string]: string } = {};
        if (!formData.schoolName) step2Errors.schoolName = "School/College Name is required";
        if (!formData.degreeCertificate) step2Errors.degreeCertificate = "Degree/Certificate is required";
        if (!formData.passingYear) step2Errors.passingYear = "Passing Year is required";
        return step2Errors;
    };

    const validateStep3 = () => {
        const step3Errors: { [key: string]: string } = {};
        if (!formData.permanentAddress) step3Errors.permanentAddress = "Permanent Address is required";
        if (!formData.mailingAddress) step3Errors.mailingAddress = "Mailing Address is required";
        return step3Errors;
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } =
            currentStep === 1
                ? validateStep1()
                : currentStep === 2
                    ? validateStep2()
                    : currentStep === 3
                        ? validateStep3()
                        : {};
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        setCurrentStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const cleanedFormData = cleanPayload(formData);

        setIsSubmitting(true);

        try {
            const res = await VolunteerService.update(volunteerId, cleanedFormData);
            if (res.status) {

                setTimeout(() => {
                    setToast({ message: "Volunteer updated successfully", type: "success" });
                }, 300)
                onOpenChange(false);  
                setCurrentStep(1)
                onSuccess?.(); 
            } else {
                setToast({ message: res.message, type: "error" });
            }
        } catch (error) {
            setToast({ message: "Error updating volunteer. Please try again.", type: "error" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="profilePhoto" className="text-gray-600">Profile Photo</Label>
                                <Input
                                    type="file"
                                    id="profilePhoto"
                                    onChange={handleFileChange}
                                    className="border-gray-200"
                                />
                                {errors.profilePhoto && <p className="text-red-500 text-sm">{errors.profilePhoto}</p>}
                            </div>
                            <div className="w-full space-y-2 text-gray-600 mb-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                                    <SelectTrigger id="gender" className="w-full  text-gray-500 border-gray-200 ">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent className="border-gray-200 bg-white text-gray-500">
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="name">Full Name</Label>
                                <Input className="border-gray-200" id="name" placeholder="Write here…" value={formData.name} onChange={e => handleInputChange("name", e.target.value)} />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="fatherName">Father's Name</Label>
                                <Input className="border-gray-200" id="fatherName" placeholder="Write here…" value={formData.fatherName} onChange={e => handleInputChange("fatherName", e.target.value)} />
                                {errors.fatherName && <p className="text-red-500 text-sm">{errors.fatherName}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="email">Email</Label>
                                <Input className="border-gray-200" id="email" placeholder="Write here…" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2 text-gray-600">
                                    <Label htmlFor="cell_no">Phone</Label>
                                    <Input className="border-gray-200" id="cell_no" placeholder="Write here…" value={formData.cell_no} onChange={e => handleInputChange("cell_no", e.target.value)} />
                                    {errors.cell_no && <p className="text-red-500 text-sm">{errors.cell_no}</p>}
                                </div>
                                <div className="space-y-2 text-gray-600">
                                    <Label htmlFor="whatsappNo">WhatsApp</Label>
                                    <Input className="border-gray-200" id="whatsappNo" placeholder="Write here…" value={formData.whatsappNo} onChange={e => handleInputChange("whatsappNo", e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input className="border-gray-200" id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={e => handleInputChange("dateOfBirth", e.target.value)} />
                                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="maritalStatus">Marital Status</Label>
                                <Input className="border-gray-200" id="maritalStatus" placeholder="Write here…" value={formData.maritalStatus} onChange={e => handleInputChange("maritalStatus", e.target.value)} />
                                {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2 text-gray-600">
                                    <Label htmlFor="City">Current City</Label>
                                    <Input className="border-gray-200" id="City" placeholder="Write here…" value={formData.City} onChange={e => handleInputChange("City", e.target.value)} />
                                    {errors.City && <p className="text-red-500 text-sm">{errors.City}</p>}
                                </div>
                                <div className="space-y-2 text-gray-600">
                                    <Label htmlFor="Province">Province</Label>
                                    <Input className="border-gray-200" id="Province" placeholder="Write here…" value={formData.Province} onChange={e => handleInputChange("Province", e.target.value)} />
                                    {errors.Province && <p className="text-red-500 text-sm">{errors.Province}</p>}
                                </div>
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="Country">Country</Label>
                                <Input className="border-gray-200" id="Country" placeholder="Write here…" value={formData.Country} onChange={e => handleInputChange("Country", e.target.value)} />
                                {errors.Country && <p className="text-red-500 text-sm">{errors.Country}</p>}
                            </div>
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Academic Information (OLAD Foundation)</h2>
                        <div className="space-y-4">
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="schoolName">School/College Name</Label>
                                <Input className="border-gray-200" id="schoolName" placeholder="Write here…" value={formData.schoolName} onChange={e => handleInputChange("schoolName", e.target.value)} />
                                {errors.schoolName && <p className="text-red-500 text-sm">{errors.schoolName}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="degreeCertificate">Degree/Certificate</Label>
                                <Input className="border-gray-200" id="degreeCertificate" placeholder="Write here…" value={formData.degreeCertificate} onChange={e => handleInputChange("degreeCertificate", e.target.value)} />
                                {errors.degreeCertificate && <p className="text-red-500 text-sm">{errors.degreeCertificate}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="passingYear">Passing Year</Label>
                                <Input className="border-gray-200" id="passingYear" placeholder="Write here…" value={formData.passingYear} onChange={e => handleInputChange("passingYear", e.target.value)} />
                                {errors.passingYear && <p className="text-red-500 text-sm">{errors.passingYear}</p>}
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-4 mt-6">Current College/University (If Any)</h2>
                        <div className="space-y-4">
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="institute">Institute Name</Label>
                                <Input className="border-gray-200" id="institute" placeholder="Write here…" value={formData.institute} onChange={e => handleInputChange("institute", e.target.value)} />
                                {errors.institute && <p className="text-red-500 text-sm">{errors.institute}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="faculty">Faculty</Label>
                                <Input className="border-gray-200" id="faculty" placeholder="Write here…" value={formData.faculty} onChange={e => handleInputChange("faculty", e.target.value)} />
                                {errors.faculty && <p className="text-red-500 text-sm">{errors.faculty}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="degree">Degree</Label>
                                <Input className="border-gray-200" id="degree" placeholder="Write here…" value={formData.degree} onChange={e => handleInputChange("degree", e.target.value)} />
                                {errors.degree && <p className="text-red-500 text-sm">{errors.degree}</p>}
                            </div>
                        </div>

                        <h2 className="text-lg font-semibold mb-4 mt-6">Current Profession (If Any)</h2>
                        <div className="space-y-4">
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="designation">Designation</Label>
                                <Input className="border-gray-200" id="designation" placeholder="Write here…" value={formData.designation} onChange={e => handleInputChange("designation", e.target.value)} />
                                {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="organization">Organization</Label>
                                <Input className="border-gray-200" id="organization" placeholder="Write here…" value={formData.organization} onChange={e => handleInputChange("organization", e.target.value)} />
                                {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
                            </div>
                            <div className="space-y-2 text-gray-600">
                                <Label htmlFor="location">Location</Label>
                                <Input className="border-gray-200" id="location" placeholder="Write here…" value={formData.location} onChange={e => handleInputChange("location", e.target.value)} />
                                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                            </div>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Hobbies & Skills</h2>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <div className="space-y-2 w-full text-gray-600 mt-4">
                                    <Label htmlFor="permanentAddress">Permanent Address</Label>
                                    <Input
                                        id="permanentAddress"
                                        type="text"
                                        value={formData.permanentAddress}
                                        onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                                        className="border-gray-200"
                                        placeholder="Write here"
                                    />
                                    {errors.permanentAddress && <p className="text-red-500 text-sm">{errors.permanentAddress}</p>}
                                </div>

                                <div className="space-y-2 w-full text-gray-600 mt-4">
                                    <Label htmlFor="mailingAddress">Mailing Address</Label>
                                    <Input
                                        id="mailingAddress"
                                        type="text"
                                        value={formData.mailingAddress}
                                        onChange={(e) => handleInputChange("mailingAddress", e.target.value)}
                                        className="border-gray-200"
                                        placeholder="Write here"
                                    />
                                    {errors.mailingAddress && <p className="text-red-500 text-sm">{errors.mailingAddress}</p>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="contentWriting"
                                        checked={formData.hobbies!.contentWriting}
                                        onCheckedChange={(checked) => handleHobbyChange("contentWriting", checked as boolean)}
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
                                    />
                                    <Label htmlFor="voiceOver" className="text-sm text-gray-600">
                                        Voice Over
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="teacherTraining"
                                        checked={formData.hobbies!.teacherTraining}
                                        onCheckedChange={(checked) => handleHobbyChange("teacherTraining", checked as boolean)}
                                    />
                                    <Label htmlFor="teacherTraining" className="text-sm text-gray-600">
                                        Teacher Training
                                    </Label>
                                </div>
                            </div>

                            <div className="space-y-2 text-gray-600 mt-4">
                                <Label htmlFor="otherHobby">Other Hobby</Label>
                                <Input
                                    id="otherHobby"
                                    type="text"
                                    value={formData.hobbies!.otherHobby}
                                    onChange={(e) => handleHobbyChange("otherHobby", e.target.value)}
                                    className="border-gray-200"
                                    placeholder="Write here"
                                />
                            </div>
                        </div>
                    </>
                )
            default:
                return null
        }
    }
    return (
        <>
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent side="right" className="bg-white w-full max-w-xl sm:max-w-lg flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">Update Alumni</DialogTitle>
                </DialogHeader>
                {/* Step indicator */}
                <div className="mb-6 flex items-center gap-2 px-1">
                    <div
                        className={`h-1 w-1/3 rounded-full ${currentStep >= 1 ? "bg-green-600" : "bg-gray-200"
                            }`}
                    />
                    <div
                        className={`h-1 w-1/3 rounded-full ${currentStep >= 2 ? "bg-green-600" : "bg-gray-200"
                            }`}
                    />
                    <div
                        className={`h-1 w-1/3 rounded-full ${currentStep >= 3 ? "bg-green-600" : "bg-gray-200"
                            }`}
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 px-1 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                    {renderStepContent()}
                </form>

                <div className="mt-6 flex justify-end gap-2 pr-2">
                    <Button variant="secondary" onClick={prevStep} disabled={currentStep === 1}>
                        Previous
                    </Button>
                    {currentStep < 3 ? (
                        <Button className="bg-[#F25f4a] text-white" onClick={nextStep}>
                            Next
                        </Button>
                    ) : (
                        <Button className="bg-[#F25f4a] text-white" type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
         {toast && (
            <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
        </>
      
    );
}

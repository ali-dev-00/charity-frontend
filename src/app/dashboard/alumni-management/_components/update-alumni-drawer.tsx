    "use client";
    import { useEffect, useState, useRef, memo } from "react";
    import {
        Dialog,
        DialogContent,
        DialogHeader,
        DialogTitle,
    } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select";
    import { Checkbox } from "@/components/ui/checkbox";
    import Toast from "@/app/components/common/toaster";
    import AlumniService from "@/app/services/alumniService";
    import {
        AlumniCreateRequest,
        AlumniUpdateRequest,
    } from "@/app/services/types/alumniTypes";

    // Props
    interface UpdateAlumniDrawerProps {
        open: boolean;
        onOpenChange: (o: boolean) => void;
        alumniId: string;
        onSuccess?: () => void;
    }

    // Blank data
    const blankData: AlumniCreateRequest = {
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
    };

    // Clean payload
    const cleanPayload = (data: AlumniCreateRequest) => {
        const payload = JSON.parse(JSON.stringify(data)); // Deep clone
        delete payload.createdAt;
        delete payload.updatedAt;
        delete (payload as any).__v;
        if (payload.hobbies) delete (payload.hobbies as any)._id;
        return payload;
    };

    // Step components with memoization
    const Step1 = memo(({ formData, errors, handleInputChange }: any) => (
        <>
            <h2 className="text-lg font-semibold mb-4">Personal Details</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="orphanStatus" className="text-gray-600">Orphan Status</Label>
                    <Select value={formData.orphanStatus} onValueChange={(value) => handleInputChange("orphanStatus", value)}>
                        <SelectTrigger className="w-full text-gray-500 border-gray-200">
                            <SelectValue placeholder="Select Orphan Status" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-200 bg-white text-gray-500">
                            <SelectItem value="orphan">An Orphan</SelectItem>
                            <SelectItem value="not-orphan">Not an Orphan</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="exStudent" className="text-gray-600">Ex Student</Label>
                    <Select value={formData.exStudent} onValueChange={(value) => handleInputChange("exStudent", value)}>
                        <SelectTrigger className="w-full text-gray-500 border-gray-200">
                            <SelectValue placeholder="Ex Student" />
                        </SelectTrigger>
                        <SelectContent className="border-gray-200 bg-white text-gray-500">
                            <SelectItem value="ex-student">Ex-Student</SelectItem>
                            <SelectItem value="ex-employee">Ex-Employee</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full space-y-2 text-gray-600 mb-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger id="gender" className="w-full text-gray-500 border-gray-200">
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
    ));

    const Step2 = memo(({ formData, errors, handleInputChange }: any) => (
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
                </div>
                <div className="space-y-2 text-gray-600">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Input className="border-gray-200" id="faculty" placeholder="Write here…" value={formData.faculty} onChange={e => handleInputChange("faculty", e.target.value)} />
                </div>
                <div className="space-y-2 text-gray-600">
                    <Label htmlFor="degree">Degree</Label>
                    <Input className="border-gray-200" id="degree" placeholder="Write here…" value={formData.degree} onChange={e => handleInputChange("degree", e.target.value)} />
                </div>
            </div>
            <h2 className="text-lg font-semibold mb-4 mt-6">Current Profession (If Any)</h2>
            <div className="space-y-4">
                <div className="space-y-2 text-gray-600">
                    <Label htmlFor="designation">Designation</Label>
                    <Input className="border-gray-200" id="designation" placeholder="Write here…" value={formData.designation} onChange={e => handleInputChange("designation", e.target.value)} />
                </div>
                <div className="space-y-2 text-gray-600">
                    <Label htmlFor="organization">Organization</Label>
                    <Input className="border-gray-200" id="organization" placeholder="Write here…" value={formData.organization} onChange={e => handleInputChange("organization", e.target.value)} />
                </div>
                <div className="space-y-2 text-gray-600">
                    <Label htmlFor="location">Location</Label>
                    <Input className="border-gray-200" id="location" placeholder="Write here…" value={formData.location} onChange={e => handleInputChange("location", e.target.value)} />
                </div>
            </div>
        </>
    ));

    const Step3 = memo(({ formData, errors, handleHobbyChange }: any) => (
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
                            onChange={(e) => formData.handleInputChange("permanentAddress", e.target.value)}
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
                            onChange={(e) => formData.handleInputChange("mailingAddress", e.target.value)}
                            className="border-gray-200"
                            placeholder="Write here"
                        />
                        {errors.mailingAddress && <p className="text-red-500 text-sm">{errors.mailingAddress}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="contentWriting"
                            checked={formData.hobbies.contentWriting}
                            onCheckedChange={(checked) => handleHobbyChange("contentWriting", checked)}
                        />
                        <Label htmlFor="contentWriting" className="text-sm text-gray-600">Content Writing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="socialMedia"
                            checked={formData.hobbies.socialMedia}
                            onCheckedChange={(checked) => handleHobbyChange("socialMedia", checked)}
                        />
                        <Label htmlFor="socialMedia" className="text-sm text-gray-600">Social Media</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="fundRaising"
                            checked={formData.hobbies.fundRaising}
                            onCheckedChange={(checked) => handleHobbyChange("fundRaising", checked)}
                        />
                        <Label htmlFor="fundRaising" className="text-sm text-gray-600">Fund Raising</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="voiceOver"
                            checked={formData.hobbies.voiceOver}
                            onCheckedChange={(checked) => handleHobbyChange("voiceOver", checked)}
                        />
                        <Label htmlFor="voiceOver" className="text-sm text-gray-600">Voice Over</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="teacherTraining"
                            checked={formData.hobbies.teacherTraining}
                            onCheckedChange={(checked) => handleHobbyChange("teacherTraining", checked)}
                        />
                        <Label htmlFor="teacherTraining" className="text-sm text-gray-600">Teacher Training</Label>
                    </div>
                </div>
                <div className="space-y-2 text-gray-600 mt-4 mb-5">
                    <Label htmlFor="otherHobby">Other Hobby</Label>
                    <Input
                        id="otherHobby"
                        type="text"
                        value={formData.hobbies.otherHobby}
                        onChange={(e) => handleHobbyChange("otherHobby", e.target.value)}
                        className="border-gray-200"
                        placeholder="Write here"
                    />
                </div>
            </div>
        </>
    ));

    export default function UpdateAlumniDrawer({
        open,
        onOpenChange,
        alumniId,
        onSuccess,
    }: UpdateAlumniDrawerProps) {
        // State
        const [currentStep, setCurrentStep] = useState(1);
        const [formData, setFormData] = useState<AlumniCreateRequest>(blankData);
        const [errors, setErrors] = useState<Record<string, string>>({});
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
        const scrollRef = useRef<HTMLDivElement>(null); // Ref for scrollable container

        // Fetch & prefill
        useEffect(() => {
            if (!open) return;
            (async () => {
                try {
                    const res = await AlumniService.getById(alumniId);
                    if (res.status && res.data) {
                        const { _id, createdAt, updatedAt, hobbies = {}, ...rest } = res.data;
                        const { _id: hobbyId, ...hobbiesRest } = hobbies as any;
                        setFormData({
                            ...blankData,
                            ...rest,
                            hobbies: { ...blankData.hobbies, ...hobbiesRest },
                        });
                        setCurrentStep(1);
                    } else {
                        setToast({ message: "Could not load alumni details.", type: "error" });
                    }
                } catch {
                    setToast({ message: "Failed to fetch alumni details.", type: "error" });
                }
            })();
        }, [open, alumniId]);

        // Preserve scroll position
        useEffect(() => {
            const scrollContainer = scrollRef.current;
            if (scrollContainer) {
                const scrollPosition = scrollContainer.scrollTop;
                return () => {
                    if (scrollContainer) {
                        scrollContainer.scrollTop = scrollPosition;
                    }
                };
            }
        }, [formData]);

        // Helpers
        const handleInputChange = (field: keyof AlumniCreateRequest, value: any) =>
            setFormData((p) => ({ ...p, [field]: value }));
        const handleHobbyChange = (
            hobby: "contentWriting" | "socialMedia" | "fundRaising" | "voiceOver" | "teacherTraining" | "otherHobby",
            value: boolean | string,
        ) =>
            setFormData((p) => ({
                ...p,
                hobbies: { ...p.hobbies, [hobby]: value },
            }));

        // Validation
        const validateStep1 = () => {
            const e: Record<string, string> = {};
            if (!formData.name) e.name = "Name is required";
            if (!formData.email) e.email = "Email is required";
            if (!formData.cell_no) e.cell_no = "Cell number is required";
            if (!formData.fatherName) e.fatherName = "Father's name is required";
            if (!formData.Country) e.Country = "Country is required";
            if (!formData.City) e.City = "City is required";
            if (!formData.Province) e.Province = "Province is required";
            if (!formData.dateOfBirth) e.dateOfBirth = "Date of Birth is required";
            if (!formData.maritalStatus) e.maritalStatus = "Marital Status is required";
            if (!formData.gender) e.gender = "Gender is required";
            return e;
        };
        const validateStep2 = () => {
            const e: Record<string, string> = {};
            if (!formData.schoolName) e.schoolName = "School/College Name is required";
            if (!formData.degreeCertificate) e.degreeCertificate = "Degree/Certificate is required";
            if (!formData.passingYear) e.passingYear = "Passing Year is required";
            return e;
        };
        const validateStep3 = () => {
            const e: Record<string, string> = {};
            if (!formData.permanentAddress) e.permanentAddress = "Permanent Address is required";
            if (!formData.mailingAddress) e.mailingAddress = "Mailing Address is required";
            return e;
        };
        const validateCurrent = () =>
            currentStep === 1 ? validateStep1() : currentStep === 2 ? validateStep2() : validateStep3();

        // Submit
        const handleSubmit = async (ev: React.FormEvent) => {
            ev.preventDefault();
            const newErrors = validateCurrent();
            setErrors(newErrors);
            if (Object.keys(newErrors).length) return;

            setIsSubmitting(true);
            try {
                const res = await AlumniService.update(alumniId, cleanPayload(formData) as unknown as AlumniUpdateRequest);
                if (res.status) {
                    setToast({ message: "Alumni updated successfully", type: "success" });
                    onOpenChange(false);
                    onSuccess?.();
                } else {
                    setToast({
                        message: Array.isArray(res.message) ? res.message.join(", ") : res.message,
                        type: "error",
                    });
                }
            } catch {
                setToast({ message: "Error updating alumni. Please try again.", type: "error" });
            } finally {
                setIsSubmitting(false);
            }
        };

        // Navigation
        const nextStep = () => {
            const newErrors = validateCurrent();
            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                setCurrentStep((p) => p + 1);
            }
        };
        const prevStep = () => setCurrentStep((p) => p - 1);

        // Render
        return (
            <>
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent side="right" className="bg-white w-full max-w-xl sm:max-w-lg flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-semibold">Update Alumni</DialogTitle>
                        </DialogHeader>
                        <div className="mb-6 flex items-center gap-2 px-1">
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`h-1 w-1/3 rounded-full ${currentStep >= s ? "bg-green-600" : "bg-gray-200"}`}
                                />
                            ))}
                        </div>
                        <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4">
                            <form onSubmit={handleSubmit} className="space-y-4 px-1">
                                {currentStep === 1 && <Step1 formData={formData} errors={errors} handleInputChange={handleInputChange} />}
                                {currentStep === 2 && <Step2 formData={formData} errors={errors} handleInputChange={handleInputChange} />}
                                {currentStep === 3 && <Step3 formData={formData} errors={errors} handleHobbyChange={handleHobbyChange} />}
                            </form>
                        </div>
                        <hr className="text-gray-300" />
                        <div className="mt-6 flex justify-end gap-2 pr-2">
                            <Button variant="secondary" onClick={prevStep} disabled={currentStep === 1}>
                                Previous
                            </Button>
                            {currentStep < 3 ? (
                                <Button className="bg-[#F25f4a] text-white" onClick={nextStep}>
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    className="bg-[#F25f4a] text-white"
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? "Saving…" : "Save"}
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </>
        );
    }
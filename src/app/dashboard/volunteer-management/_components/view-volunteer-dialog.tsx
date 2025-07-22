"use client"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import VolunteerService from "@/app/services/VolunteerService"
import { VolunteerBase } from "@/app/services/types/volunteerTypes"

interface ViewVolunteerDialogProps {
  open: boolean
  volunteerId: string
  onOpenChange: (open: boolean) => void
}

const InfoRow = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => (
  <>
    <span className="font-semibold text-gray-900">{label}</span>
    <span className="truncate text-gray-600">{value}</span>
  </>
)

export default function ViewVolunteerDialog({
  open,
  volunteerId,
  onOpenChange,
}: ViewVolunteerDialogProps) {
  const [volunteer, setVolunteer] = useState<(VolunteerBase & { _id: string }) | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !volunteerId) return
    setLoading(true)
    VolunteerService.getById(volunteerId)
      .then((res) => setVolunteer(res.data))
      .finally(() => setLoading(false))
  }, [open, volunteerId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Volunteer Details</DialogTitle>
        </DialogHeader>

        {loading && <Skeleton className="h-40 w-full" />}

        {!loading && volunteer && (
          <div className="grid grid-cols-[150px_1fr] gap-x-6 gap-y-2 max-h-[70vh] overflow-y-auto text-sm">
            {/* ── BASIC ───────────── */}
            <InfoRow label="Name" value={volunteer.name} />
            <InfoRow label="Father Name" value={volunteer.fatherName} />
            <InfoRow label="Date of Birth" value={volunteer.dateOfBirth} />
            <InfoRow label="Gender" value={volunteer.gender} />
            <InfoRow label="Marital Status" value={volunteer.maritalStatus} />

            {/* ── CONTACT ─────────── */}
            <InfoRow label="Email" value={volunteer.email} />
            <InfoRow label="Phone / WhatsApp" value={`${volunteer.cell_no} / ${volunteer.whatsappNo}`} />
            <InfoRow label="City" value={volunteer.City} />
            <InfoRow label="Province" value={volunteer.Province} />
            <InfoRow label="Country" value={volunteer.Country} />
            <InfoRow label="Permanent Address" value={volunteer.permanentAddress} />
            <InfoRow label="Mailing Address" value={volunteer.mailingAddress} />

            {/* ── EDUCATION ───────── */}
            <InfoRow label="School Name" value={volunteer.schoolName} />
            <InfoRow label="Passing Year" value={volunteer.passingYear} />
            <InfoRow label="Degree (Old)" value={volunteer.degreeCertificate} />
            <InfoRow label="Institute" value={volunteer.institute || "—"} />
            <InfoRow label="Faculty" value={volunteer.faculty || "—"} />
            <InfoRow label="Degree" value={volunteer.degree || "—"} />

            {/* ── PROFESSIONAL ───── */}
            <InfoRow label="Designation" value={volunteer.designation || "—"} />
            <InfoRow label="Organization" value={volunteer.organization || "—"} />
            <InfoRow label="Location" value={volunteer.location || "—"} />

            {/* ── HOBBIES ─────────── */}
            <InfoRow label="Content Writing" value={volunteer.hobbies?.contentWriting ? "Yes" : "No"} />
            <InfoRow label="Social Media" value={volunteer.hobbies?.socialMedia ? "Yes" : "No"} />
            <InfoRow label="Fund Raising" value={volunteer.hobbies?.fundRaising ? "Yes" : "No"} />
            <InfoRow label="Voice Over" value={volunteer.hobbies?.voiceOver ? "Yes" : "No"} />
            <InfoRow label="Teacher Training" value={volunteer.hobbies?.teacherTraining ? "Yes" : "No"} />
            {volunteer.hobbies?.otherHobby && (
              <InfoRow label="Other Hobby" value={volunteer.hobbies.otherHobby} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

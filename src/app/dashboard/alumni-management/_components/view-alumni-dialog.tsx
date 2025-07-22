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
import AlumniService from "@/app/services/alumniService"
import { AlumniBase } from "@/app/services/types/alumniTypes"

/* ── types ────────────────────────────────────────────────────────────── */
interface ViewAlumniDialogProps {
  open: boolean
  alumniId: string
  onOpenChange: (open: boolean) => void
}

/* ── helper ───────────────────────────────────────────────────────────── */
const InfoRow = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => (
  <>
    {/* label — bold, black */}
    <span className="font-semibold text-gray-900">{label}</span>

    {/* value — normal weight, muted gray */}
    <span className="truncate text-gray-600">{value}</span>
  </>
)

/* ── component ────────────────────────────────────────────────────────── */
export default function ViewAlumniDialog({
  open,
  alumniId,
  onOpenChange,
}: ViewAlumniDialogProps) {
  const [alumni, setAlumni] = useState<(AlumniBase & { _id: string }) | null>(
    null,
  )
  const [loading, setLoading] = useState(false)

  /* fetch one record whenever dialog opens or id changes */
  useEffect(() => {
    if (!open || !alumniId) return
    setLoading(true)
    AlumniService.getById(alumniId)
      .then((res) => setAlumni(res.data))
      .finally(() => setLoading(false))
  }, [open, alumniId])

  /* ── render ────────────────────────────────────────────────────────── */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Alumni Details</DialogTitle>
        </DialogHeader>

        {loading && <Skeleton className="h-40 w-full" />}

        {!loading && alumni && (
          /* two‑column grid; rows auto‑flow, nice spacing */
          <div className="grid grid-cols-[150px_1fr] gap-x-6 gap-y-2 max-h-[70vh] overflow-y-auto text-sm">
            {/* ── BASIC ───────────────────────────── */}
            <InfoRow label="Name" value={alumni.name} />
            <InfoRow label="Father Name" value={alumni.fatherName} />
            <InfoRow label="Date of Birth" value={alumni.dateOfBirth} />
            <InfoRow label="Gender" value={alumni.gender} />
            <InfoRow label="Marital Status" value={alumni.maritalStatus} />

            {/* ── CONTACT ─────────────────────────── */}
            <InfoRow label="Email" value={alumni.email} />
            <InfoRow
              label="Phone / WhatsApp"
              value={`${alumni.cell_no} / ${alumni.whatsappNo}`}
            />
            <InfoRow label="City" value={alumni.City} />
            <InfoRow label="Province" value={alumni.Province} />
            <InfoRow label="Country" value={alumni.Country} />
            <InfoRow label="Permanent Address" value={alumni.permanentAddress} />
            <InfoRow label="Mailing Address" value={alumni.mailingAddress} />

            {/* ── STATUS ──────────────────────────── */}
            <InfoRow
              label="Orphan Status"
              value={
                <Badge
                  className={
                    alumni.orphanStatus === "orphan"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {alumni.orphanStatus}
                </Badge>
              }
            />
            <InfoRow label="Ex‑Student / Employee" value={alumni.exStudent} />

            {/* ── ACADEMIC ────────────────────────── */}
            <InfoRow label="School Name" value={alumni.schoolName} />
            <InfoRow label="Passing Year" value={alumni.passingYear} />
            <InfoRow label="Degree (Old)" value={alumni.degreeCertificate} />
            <InfoRow label="Institute" value={alumni.institute} />
            <InfoRow label="Faculty" value={alumni.faculty} />
            <InfoRow label="Degree" value={alumni.degree} />

            {/* ── PROFESSIONAL ────────────────────── */}
            <InfoRow label="Designation" value={alumni.designation} />
            <InfoRow label="Organization" value={alumni.organization} />
            <InfoRow label="Location" value={alumni.location} />

            {/* ── HOBBIES (flatten) ───────────────── */}
            <InfoRow
              label="Content Writing"
              value={alumni.hobbies?.contentWriting ? "Yes" : "No"}
            />
            <InfoRow
              label="Social Media"
              value={alumni.hobbies?.socialMedia ? "Yes" : "No"}
            />
            <InfoRow
              label="Fund Raising"
              value={alumni.hobbies?.fundRaising ? "Yes" : "No"}
            />
            <InfoRow
              label="Voice Over"
              value={alumni.hobbies?.voiceOver ? "Yes" : "No"}
            />
            <InfoRow
              label="Teacher Training"
              value={alumni.hobbies?.teacherTraining ? "Yes" : "No"}
            />
            {alumni.hobbies?.otherHobby && (
              <InfoRow label="Other Hobby" value={alumni.hobbies.otherHobby} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

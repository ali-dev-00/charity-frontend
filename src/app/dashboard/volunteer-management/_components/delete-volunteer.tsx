"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Toast from "@/app/components/common/toaster"
import VolunteerService from "@/app/services/VolunteerService"
import { TrashIcon } from "lucide-react"

interface DeleteVolunteerProps {
  volunteerId: string
  onClose: () => void
  onDeleteSuccess: () => void
}

const DeleteVolunteer: React.FC<DeleteVolunteerProps> = ({
  volunteerId,
  onClose,
  onDeleteSuccess,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await VolunteerService.delete(volunteerId)
      if (response.status) {
        setToastMessage("Volunteer deleted successfully")
        setToastType("success")
        setShowToast(true)
        setTimeout(() => {
          onDeleteSuccess()
          onClose()
        }, 300)
      } else {
        throw new Error("Failed to delete volunteer.")
      }
    } catch (error) {
      setToastMessage("An error occurred while deleting volunteer.")
      setToastType("error")
      setShowToast(true)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="w-[400px] sm:w-[500px] rounded-lg p-6 bg-white max-w-[400px]">
          <DialogHeader className="flex flex-col mb-4">
            <DialogTitle className="text-xl font-semibold flex gap-2">
              <TrashIcon className="text-red-600" /> Delete Volunteer
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              This will remove this volunteer from the system. There is no undo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              onClick={handleDelete}
              className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}

export default DeleteVolunteer

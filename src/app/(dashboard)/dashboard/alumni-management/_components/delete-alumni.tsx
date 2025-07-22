"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button" // Your custom Button component
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog" 
import Toast from "@/app/components/common/toaster"
import AlumniService from "@/app/services/alumniService" 
import { TrashIcon } from "lucide-react"

interface DeleteAlumniProps {
  alumniId: string
  onClose: () => void
  onDeleteSuccess: () => void
}

const DeleteAlumni: React.FC<DeleteAlumniProps> = ({ alumniId, onClose, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")

  const handleDelete = async () => {
    try {
      const response = await AlumniService.delete(alumniId)
      if (response.status) {
        setToastMessage("Alumni deleted successfully");
        setToastType("success");
        setShowToast(true);
        setTimeout(() => {
          onDeleteSuccess(); 
          onClose();         
        }, 300); 
      } else {
        setToastMessage("Failed to delete alumni.");
        setToastType("error");
        setShowToast(true);
      }
    } catch (err) {
      setToastMessage("An error occurred while deleting alumni.");
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <>
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[400px] sm:w-[500px] rounded-lg p-6 bg-white max-w-[400px]">
        <DialogHeader className="flex flex-col mb-4">
          <DialogTitle className="text-xl font-semibold flex gap-2"><TrashIcon className="text-red-600" /> Delete Alumni</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            This will remove this alumni from the system. There is no undo.
          </DialogDescription>
        </DialogHeader>

        <div className=" text-center">
          {error && <p className="text-red-600 mt-2 my-4">{error}</p>}
        </div>

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
     {/* Toast Notifications */}
     {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </>
    
    
  )
}

export default DeleteAlumni

"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { useApp } from "@/context/AppContext"

interface ConfirmationPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  message: string
  type?: "warning" | "success" | "info"
  confirmText?: string
  cancelText?: string
}

export function ConfirmationPopup() {
  return <div></div>
  // const {
  //   open,
  //   onOpenChange,
  //   onConfirm,
  //   title,
  //   message,
  //   type = "warning",
  //   confirmText = "Yes, Confirm",
  //   cancelText = "Cancel",
  // } = useApp();

  // const handleConfirm = () => {
  //   onConfirm()
  //   onOpenChange(false)
  // }

  // const getIcon = () => {
  //   switch (type) {
  //     case "success":
  //       return <CheckCircle className="w-16 h-16 text-green-500" />
  //     case "warning":
  //     default:
  //       return <AlertTriangle className="w-16 h-16 text-amber-500" />
  //   }
  // }

  // const getConfirmButtonStyle = () => {
  //   switch (type) {
  //     case "success":
  //       return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
  //     case "warning":
  //     default:
  //       return "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
  //   }
  // }

  // return (
  //   <Dialog open={open} onOpenChange={onOpenChange}>
  //     <DialogContent className="sm:max-w-md border-0 shadow-2xl bg-white rounded-2xl overflow-hidden" showCloseButton={false}>
  //       <div className="p-8 text-center">
  //         <div className="flex justify-center mb-6">{getIcon()}</div>
  //         <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">{title}</DialogTitle>
  //         <DialogDescription className="text-gray-600 text-base leading-relaxed mb-8">{message}</DialogDescription>

  //         <div className="flex flex-col sm:flex-row gap-3">
  //           <Button
  //             variant="outline"
  //             onClick={() => onOpenChange(false)}
  //             className="flex-1 h-12 border-gray-200 hover:bg-gray-50 rounded-xl font-medium"
  //           >
  //             {cancelText}
  //           </Button>
  //           <Button
  //             onClick={handleConfirm}
  //             className={`flex-1 h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${getConfirmButtonStyle()}`}
  //           >
  //             {confirmText}
  //           </Button>
  //         </div>
  //       </div>
  //     </DialogContent>
  //   </Dialog>
  // )
}

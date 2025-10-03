"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function UploadAccessDialog({
  open,
  onOpenChange,
  onLogin,
  onGuest,
  loading,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onLogin: () => void;
  onGuest: () => void;
  loading?: boolean;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md bg-[#252525] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Login Required</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            To upload files and track jobs, please log in or continue as a{" "}
            <b>guest</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            className="bg-blue-500 hover:bg-blue-600 border-[#C2D8FC] hover:text-white"
            onClick={onLogin}
          >
            Login
          </AlertDialogCancel>
          <AlertDialogAction onClick={onGuest} disabled={loading}>
            {loading ? "Processing…" : "Continue without login"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

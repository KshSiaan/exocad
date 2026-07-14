import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-red-500">
      <AlertCircle className="size-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export function FormErrorAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert variant={"destructive"}>
      <AlertCircleIcon />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
}

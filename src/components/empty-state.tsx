import { Ghost } from "lucide-react";

type EmptyStateProps = {
  title: string;
  message: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col gap-5 items-center bg-linear-to-bl from-accent to-accent/50 p-10 rounded-2xl">
      <Ghost size={50} className="stroke-primary-foreground/50" />
      <p>{title}</p>
      <p className="text-muted-foreground text-center text-balance">{message}</p>
    </div>
  )
}
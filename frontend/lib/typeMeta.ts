import { UserPlus, MessageCircleReply, FileBarChart, Bell } from "lucide-react";

export const TYPE_META: Record<
  string,
  { label: string; icon: typeof Bell }
> = {
  member_invited: { label: "TEAM", icon: UserPlus },
  new_reply: { label: "REPLY", icon: MessageCircleReply },
  report_ready: { label: "REPORT", icon: FileBarChart },
};

export function getTypeMeta(type: string) {
  return TYPE_META[type] || { label: type.replace(/_/g, " ").toUpperCase(), icon: Bell };
}

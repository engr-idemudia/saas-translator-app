"use client";

import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatsMembers";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Badge } from "@/components/ui/badge";
import useIsAdmin from "@/hooks/useAdminId";
import UserAvatar from "./UserAvatar";
import LoadingSpinner from "./loadingSpinner";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return "•••";
  const dotIndex = domain.lastIndexOf(".");
  const name = domain.slice(0, dotIndex);
  const tld = domain.slice(dotIndex); // includes the dot, e.g. ".com"
  return `${local[0]}${"•".repeat(Math.max(local.length - 1, 1))}@${"•".repeat(name.length)}${tld}`;
}

function ChatMembersBadges({ chatId }: { chatId: string }) {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId),
  );

  const adminId = useIsAdmin({ chatId });

  if (loading && !members) return <LoadingSpinner />;

  return (
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => (
            <Badge
              variant="secondary"
              key={member.email}
              className="h-14 p-5 pl-2 pr-5 flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <UserAvatar
                  name={maskEmail(member.email)}
                  image={member.image}
                />
              </div>

              <div>
                <p>{maskEmail(member.email)}</p>
                {member.userId === adminId && (
                  <p className="text-indigo-400 animate-pulse">Admin</p>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
}

export default ChatMembersBadges;

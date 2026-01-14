"use client";
import { Button } from "@/src/components/ui/button";

import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import Link from "next/link";
import { UserProfileSkeleton } from "@/components/shared/Skeletons";

const UserCard = () => {
  const [user, setuser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fullname =
    user?.user_metadata?.first_name + " " + user?.user_metadata?.last_name ||
    "Guest User";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabaseClient.auth.getUser();
        if (user) {
          console.log("UserCard User:", user);
          setuser(user);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <UserProfileSkeleton />;

  return (
    <Link
      href={`/profile/${user?.user_metadata?.username}`}
      className="flex cursor-pointer items-center justify-between mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
          <User className="w-7 h-7" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{fullname}</p>
          <p className="text-gray-400 text-xs">
            @{user?.user_metadata?.username || "Guest"}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold p-0 h-auto"
      >
        Switch
      </Button>
    </Link>
  );
};

export default UserCard;

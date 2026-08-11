import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { wordInitials } from "@/lib/helpers";
import { useGlobalStore } from "@/providers/store-provider";
import { Bell, Moon, Search } from "lucide-react";

export default function OrganizationNavbar() {
  const { actor } = useGlobalStore(state => state);
  return (
    <nav
      className="h-[var(--header-height)] bg-sidebar border-b border-white/10 flex 
      items-center justify-between gap-4 px-4 sticky top-0 z-50 backdrop-blur-sm"
    >
      <SidebarTrigger size="lg" className="p-0" />
      <Command />
      <ApplicationTheme />
      <button>
        <Bell strokeWidth={1.2} size={20} />
      </button>
      <Avatar>
        <AvatarImage src={actor.avatar} />
        <AvatarFallback>{wordInitials(actor.name)}</AvatarFallback>
      </Avatar>
    </nav>
  )
}

function Command() {
  return <div className="mr-auto max-w-md w-full relative">
    <Search
      className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50"
      size={18}
      strokeWidth={1.5}
    />
    <Input
      className="pl-8"
      placeholder="AI HELP"
    />
  </div>
}

function ApplicationTheme() {
  return (
    <button onClick={() => document.body.classList.toggle("dark")}>
      <Moon strokeWidth={1.2} size={20} />
    </button>
  )
}
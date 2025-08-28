"use client";
import { useState } from "react";
import {
  BarChart3,
  Folder,
  MessageCircle,
  Calendar,
  Users,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
    active: false,
  },
  {
    id: "boards",
    label: "Boards",
    icon: Folder,
    href: "/boards",
    active: true,
    hasSubmenu: true,
    submenu: [
      { label: "Create worker", href: "/boards/create-worker" },
      { label: "Independent Board App", href: "/boards/independent" },
      { label: "Sport XI Project", href: "/boards/sport-xi", active: true },
      { label: "WordPress theme", href: "/boards/wordpress" },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageCircle,
    href: "/messages",
    active: false,
    badge: "9",
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
    active: false,
  },
  {
    id: "team",
    label: "Team members",
    icon: Users,
    href: "/team",
    active: false,
  },
];

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["boards"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        {/* Workspace */}
        <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="text-xs bg-gray-700 text-white">
              S
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">workspace</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-medium text-gray-900">
                Root folder
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <div key={item.id}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-3",
                  item.active && !item.hasSubmenu
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "text-gray-700 hover:bg-gray-100",
                )}
                onClick={() => item.hasSubmenu && toggleExpanded(item.id)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-500 text-white text-xs min-w-[18px] h-[18px] p-0 flex items-center justify-center rounded-full"
                  >
                    {item.badge}
                  </Badge>
                )}
                {item.hasSubmenu &&
                  (expandedItems.includes(item.id) ? (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  ) : (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  ))}
              </Button>

              {/* Submenu */}
              {item.hasSubmenu &&
                expandedItems.includes(item.id) &&
                item.submenu && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Button
                        key={subItem.label}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start h-8 px-2 text-sm",
                          subItem.active
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                            : "text-gray-600 hover:bg-gray-50",
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-300 mr-2" />
                        {subItem.label}
                      </Button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-gray-100"
        >
          <HelpCircle className="w-4 h-4 mr-3" />
          Support
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start h-10 px-3 text-gray-700 hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

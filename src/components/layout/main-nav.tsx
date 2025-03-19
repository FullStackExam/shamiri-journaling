"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { BarChart2, BookOpen, Home, LogOut, Menu, Settings, Tag, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import {useAuth} from "@/components/auth/auth-provider"

export default function Sidebar() {
  const {logout} = useAuth()
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  // If mobile, show a button to toggle the sidebar
  if (isMobile && !isOpen) {
    return (
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 h-screen flex flex-col",
        isMobile ? "fixed inset-y-0 left-0 z-50 w-64" : "w-64",
      )}
    >
      {isMobile && (
        <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={toggleSidebar}>
          <X className="h-6 w-6" />
        </Button>
      )}

      <div className="p-6">
        <h1 className="text-xl font-bold text-purple-600 dark:text-purple-400">Journaling App</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/" onClick={closeSidebar}>
              <Button
                variant="ghost"
                className={cn("w-full justify-start", pathname === "/" && "bg-gray-100 dark:bg-gray-800")}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/entries" onClick={closeSidebar}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname.startsWith("/entries") && "bg-gray-100 dark:bg-gray-800",
                )}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Journal Entries
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/categories" onClick={closeSidebar}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname.startsWith("/categories") && "bg-gray-100 dark:bg-gray-800",
                )}
              >
                <Tag className="mr-2 h-5 w-5" />
                Categories
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/insights" onClick={closeSidebar}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname.startsWith("/insights") && "bg-gray-100 dark:bg-gray-800",
                )}
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Insights
              </Button>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="w-full justify-start text-red-500 dark:text-red-400" onClick={logout}>
            <LogOut className="mr-2 h-5 w-5"/>
            Logout
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}


"use client";

import AppLogo from "@/components/display/appLogo";
import Link from "next/link";
import UserIndicator from "./UserIndicator";
import { Lock, Menu, X } from "lucide-react";
import CompanySwitcher from "./companySwitcher";
import { useState } from "react";

interface MobileHeaderProps {
  canAccessManagementConsole: boolean;
}

export default function MobileHeader({ canAccessManagementConsole }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:hidden bg-card border-b relative">
      {/* Mobile Header Bar */}
      <div className="p-4 flex justify-between items-center">
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <AppLogo size="sm" />
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-card absolute top-full left-0 right-0">
          <div className="px-4 py-2 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              {canAccessManagementConsole ? (
                <Link 
                  href={process.env.NEXT_PUBLIC_MANAGEMENT_CONSOLE_URL || ""} 
                  className="block py-2 text-sm hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Management Console
                </Link>
              ) : (
                <div className="flex gap-2 text-muted-foreground items-center py-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Management Console</span>
                </div>
              )}
              <Link 
                href={process.env.NEXT_PUBLIC_SERVICE_PORTAL_URL || ""} 
                className="block py-2 text-sm hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Service Portal
              </Link>
            </div>

            {/* Company Switcher */}
            <div className="py-2 border-t">
              <CompanySwitcher />
            </div>

            {/* User Indicator */}
            <div className="py-2 border-t">
              <UserIndicator />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { Menu, X, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isLoggedIn = false; // Mock auth state

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Reports', path: '/reports' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  // Purple/Lavender palette from HomePage
  const navStyle = {
    backgroundColor: 'rgba(240,238,250,0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(124,58,237,0.08)',
  };

  const textColor = '#1a0a3c';
  const textMuted = '#6b7280';
  const accent = '#7c3aed';

  return (
    <nav className="border-b sticky top-0 z-50" style={navStyle}>
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl flex items-center gap-2" style={{ color: textColor, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'inline-block' }}></span>
          UniActs
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:opacity-80 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? textColor : textMuted,
              })}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
             <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="icon" className="rounded-full">
                 <User className="h-5 w-5" />
                 <span className="sr-only">Toggle user menu</span>
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent align="end">
               <DropdownMenuLabel>My Account</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem>Profile</DropdownMenuItem>
               <DropdownMenuItem>Settings</DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem>Logout</DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4" style={{ backgroundColor: 'rgba(240,238,250,0.98)', borderColor: 'rgba(124,58,237,0.08)' }}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block text-sm font-medium hover:opacity-80"
              style={{ color: textMuted }}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t flex flex-col gap-2">
             {isLoggedIn ? (
               <Button variant="outline" className="w-full justify-start">Logout</Button>
             ) : (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/register" onClick={() => setIsOpen(false)}>Sign up</Link>
                </Button>
              </>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}

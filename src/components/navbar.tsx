"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Menu, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User as SupabaseUser } from "@supabase/supabase-js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const menuItems = [
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Community", href: "/community" },
];

export function Navbar() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();
        
        // Check active session
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        window.location.href = "/auth/login";
    };

    return (
        <header>
            <nav className="bg-white dark:bg-black fixed z-20 w-full border-b border-slate-200 dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
                    <div className="relative flex items-center justify-between py-3 lg:py-4">
                        
                        {/* Mobile Menu Trigger & Logo */}
                        <div className="flex items-center gap-4 lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="-ml-2">
                                        <Menu className="h-6 w-6" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                    <div className="flex flex-col gap-6 py-6">
                                        <Link href="/" className="flex items-center space-x-2">
                                            <Logo />
                                        </Link>
                                        <div className="flex flex-col gap-4">
                                            {menuItems.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    className="text-lg font-medium text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-auto border-t pt-4">
                                            {user ? (
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <Avatar>
                                                             <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                                                            <AvatarFallback className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white">
                                                                {user.email?.charAt(0).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{user.user_metadata?.full_name || "User"}</span>
                                                            <span className="text-xs text-muted-foreground text-ellipsis overflow-hidden max-w-[200px]">{user.email}</span>
                                                        </div>
                                                    </div>
                                                     <Link href="/dashboard" className="text-sm font-medium hover:underline">
                                                        Dashboard
                                                    </Link>
                                                    <Link href="/account" className="text-sm font-medium hover:underline">
                                                        Account Settings
                                                    </Link>
                                                    <Button variant="outline" onClick={handleLogout} className="justify-start w-full text-red-600">
                                                        <LogOut className="mr-2 h-4 w-4" />
                                                        Log out
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-2">
                                                     <Button asChild variant="ghost" className="justify-start">
                                                        <Link href="/auth/login">Login</Link>
                                                    </Button>
                                                    <Button asChild className="bg-black text-white dark:bg-white dark:text-black">
                                                        <Link href="/auth/register">Start Free</Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            <Link href="/" aria-label="home">
                                <Logo />
                            </Link>
                        </div>

                        {/* Desktop Logo */}
                        <div className="hidden lg:flex items-center gap-12">
                            <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                <Logo />
                            </Link>
                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm font-medium">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white block duration-150"
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                             <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 whitespace-nowrap">
                                <span>🔥</span> 12 day streak
                            </div>
                            
                            {loading ? (
                                <Button variant="ghost" size="sm" disabled>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </Button>
                            ) : user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full overflow-hidden p-0">
                                            <Avatar className="h-full w-full">
                                                {/* Ensure fallback is rendered if src is missing */}
                                                <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                                                <AvatarFallback className="bg-slate-200 dark:bg-slate-800 text-xs text-black dark:text-white">
                                                    {user.email?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "User"}</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/account">Account Settings</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                                        <Link href="/auth/login">
                                            <span>Login</span>
                                        </Link>
                                    </Button>
                                    <Button asChild size="sm" className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200">
                                        <Link href="/auth/register">
                                            <span>Start Free</span>
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

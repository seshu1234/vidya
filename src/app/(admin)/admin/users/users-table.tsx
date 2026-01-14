"use client";

import { useEffect, useState, useTransition } from "react";
import { getUsers, updateUserRole, deleteUser, updateUserDetails } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Search, Trash2, ShieldCheck, Shield, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type Profile = {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string | null;
    role: string[];
    created_at: string;
};

export function UsersTable() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    
    // Pagination & Sorting State
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortColumn, setSortColumn] = useState("created_at");
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>("desc");
    const [roleFilter, setRoleFilter] = useState("all");

    const [editingUser, setEditingUser] = useState<Profile | null>(null);

    const [, startTransition] = useTransition();

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page, pageSize, sortColumn, sortDirection, roleFilter]);

    // Reset page when search or filters change
    useEffect(() => {
        setPage(1);
    }, [search, roleFilter]);

    async function loadUsers() {
        setLoading(true);
        try {
            const { data, total } = await getUsers(search, page, pageSize, sortColumn, sortDirection, roleFilter);
            setUsers(data as Profile[]);
            setTotalUsers(total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const handleRoleUpdate = (userId: string, newRole: string) => {
        const user = users.find(u => u.id === userId);
        if (!user) return;
        
        let newRoles = Array.isArray(user.role) ? [...user.role] : [user.role].filter(Boolean) as string[];
        
        if (newRole === 'admin') {
             if (newRoles.includes('admin')) {
                 newRoles = newRoles.filter(r => r !== 'admin');
             } else {
                 newRoles.push('admin');
             }
        }

        startTransition(async () => {
            try {
                await updateUserRole(userId, newRoles);
                await loadUsers();
            } catch (e) {
                console.error(e);
            }
        });
    };

    const handleDelete = (userId: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        
        startTransition(async () => {
             try {
                await deleteUser(userId);
                await loadUsers();
            } catch (e) {
                 console.error(e);
            }
        });
    }



    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingUser) return;

        const formData = new FormData(e.currentTarget);
        const full_name = formData.get("full_name") as string;
        const email = formData.get("email") as string;

        startTransition(async () => {
            try {
                await updateUserDetails(editingUser.id, { full_name, email });
                setEditingUser(null);
                await loadUsers();
            } catch (err) {
                console.error(err);
            }
        });
    };

    const totalPages = Math.ceil(totalUsers / pageSize);

    return (
        <div className="space-y-4">
            <Card className="border-slate-200 dark:border-navy-800">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle>All Users ({totalUsers})</CardTitle>
                        <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1">
                                <span className="text-sm text-muted-foreground whitespace-nowrap hidden md:inline">Rows:</span>
                                <select 
                                    className="h-9 w-[70px] rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                             <select 
                                className="h-9 w-[130px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="instructor">Instructor</option>
                            </select>

                            <div className="relative w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                                <Input 
                                    placeholder="Search users..." 
                                    className="pl-8" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('full_name')}>
                                        User {sortColumn === 'full_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                    <TableHead>Roles</TableHead>
                                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('created_at')}>
                                        Joined {sortColumn === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                                    </TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8">Loading...</TableCell>
                                    </TableRow>
                                ) : users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-8">No users found.</TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={user.avatar_url || ""} />
                                                        <AvatarFallback>{user.full_name?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-bold text-navy-900 dark:text-white">{user.full_name || "Unknown"}</div>
                                                        <div className="text-xs text-muted-foreground">{user.email}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {(Array.isArray(user.role) ? user.role : [user.role]).filter(Boolean).map(r => (
                                                        <Badge key={r} variant="secondary" className="text-xs">
                                                            {r}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                                                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleRoleUpdate(user.id, 'admin')}>
                                                            {user.role?.includes('admin') ? (
                                                                <>
                                                                    <Shield className="mr-2 h-4 w-4" /> Remove Admin
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ShieldCheck className="mr-2 h-4 w-4" /> Make Admin
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleDelete(user.id)} className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete User
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalUsers)} of {totalUsers} users
                        </div>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                            >
                                Previous
                            </Button>
                            <div className="text-sm font-medium">
                                Page {page} of {Math.max(1, totalPages)}
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || loading}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Make changes to the user&apos;s profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <form onSubmit={handleUpdateUser}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="full_name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="full_name"
                                        name="full_name"
                                        defaultValue={editingUser.full_name}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        defaultValue={editingUser.email}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

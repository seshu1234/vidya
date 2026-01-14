"use client";

import { useEffect, useState, useTransition } from "react";
import { getCourses, deleteCourse, togglePublishStatus, createCourse } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search, Plus, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";

type Course = {
    id: string;
    title: string;
    slug: string;
    category: string | null;
    price: number;
    is_published: boolean;
    created_at: string;
};

export function CoursesTable() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    useEffect(() => {
        loadCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    async function loadCourses() {
        setLoading(true);
        try {
            const data = await getCourses(search);
            setCourses(data as Course[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        startTransition(async () => {
            try {
                await deleteCourse(id);
                await loadCourses();
            } catch (e) {
                console.error(e);
            }
        });
    }

    const handleTogglePublish = (id: string, currentStatus: boolean) => {
        startTransition(async () => {
            try {
                await togglePublishStatus(id, currentStatus);
                await loadCourses();
            } catch (e) {
                console.error(e);
            }
        });
    }

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(async () => {
            const result = await createCourse(formData);
            if(result?.error) {
                alert(result.error);
            } else {
                setIsCreateOpen(false);
                await loadCourses();
            }
        });
    }

    return (
        <Card className="border-slate-200 dark:border-navy-800">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <CardTitle>Course List</CardTitle>
                    <div className="flex w-full sm:w-auto items-center gap-2">
                         <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                            <Input 
                                placeholder="Search courses..." 
                                className="pl-8" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" /> Create
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleCreateSubmit}>
                                    <DialogHeader>
                                    <DialogTitle>Create Course</DialogTitle>
                                    <DialogDescription>
                                        Start by giving your course a title. You can edit details later.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="title" className="text-right">
                                            Title
                                            </Label>
                                            <Input id="title" name="title" className="col-span-3" required />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={isPending}>
                                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Create Course
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Uniq Slug</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {loading ? (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : courses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">No courses found.</TableCell>
                            </TableRow>
                        ) : (
                            courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium text-navy-900 dark:text-white">
                                        {course.title}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs">{course.slug}</TableCell>
                                    <TableCell>
                                        <Badge variant={course.is_published ? "default" : "secondary"} className={course.is_published ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                                            {course.is_published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{course.price > 0 ? `₹${course.price}` : 'Free'}</TableCell>
                                    <TableCell>{new Date(course.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleTogglePublish(course.id, course.is_published)}>
                                                    {course.is_published ? (
                                                        <>
                                                            <EyeOff className="mr-2 h-4 w-4" /> Unpublish
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye className="mr-2 h-4 w-4" /> Publish
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(course.id)} className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

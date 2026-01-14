"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { getTools, deleteTool, createTool, updateTool, fetchCategories, fetchCourses } from "./tool-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Search, Plus, Trash2, Loader2, Edit2, Link as LinkIcon } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Tool = {
    id: string;
    name: string;
    slug: string;
    category_name: string | null;
    category_id: string | null;
    description: string | null;
    course_id: string | null;
    created_at: string;
};

type Category = { id: string; name: string; };
type Course = { id: string; title: string; slug: string; type?: string; }; // Partial course type

export function ToolsTable() {
    const [tools, setTools] = useState<Tool[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [courses, setCourses] = useState<Course[]>([]); // New state for courses
    
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingTool, setEditingTool] = useState<Tool | null>(null);

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedCourseId, setSelectedCourseId] = useState<string>("none"); // New state for course selection

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [toolsData, reqCategories, reqCourses] = await Promise.all([
                getTools(search),
                fetchCategories(),
                fetchCourses(true) // Include hidden tool courses
            ]);
            
            setTools(toolsData as Tool[]);
            setCategories(reqCategories as Category[]);
            setCourses(reqCourses as Course[]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        loadData();
    }, [loadData]);
    
    async function loadTools() {
         try {
            const data = await getTools(search);
            setTools(data as Tool[]);
        } catch (error) { console.error(error); }
    }

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure you want to delete this tool?")) return;
        startTransition(async () => {
            try {
                await deleteTool(id);
                toast.success("Tool deleted");
                await loadTools();
            } catch (e) {
                console.error(e);
                toast.error("Failed to delete tool");
            }
        });
    }

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const selectedCat = categories.find(c => c.id === selectedCategoryId);
        if (selectedCat) {
            formData.append("category_id", selectedCat.id);
            formData.append("category_name", selectedCat.name);
        }
        
        if (selectedCourseId && selectedCourseId !== "none") {
            formData.append("course_id", selectedCourseId);
        }

        startTransition(async () => {
            try {
                const result = await createTool(formData);
                if(result?.error) {
                    toast.error(result.error);
                } else {
                    setIsCreateOpen(false);
                    setSelectedCategoryId("");
                    setSelectedCourseId("none");
                    toast.success("Tool added successfully");
                    await loadTools();
                }
            } catch (e) {
                console.error(e);
                toast.error("Something went wrong");
            }
        });
    }

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingTool) return;

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        
        const updateData: Partial<Tool> = { name, description };
        
        const selectedCat = categories.find(c => c.id === selectedCategoryId);
        if (selectedCat) {
            updateData.category_id = selectedCat.id;
            updateData.category_name = selectedCat.name;
        }
        
        if (selectedCourseId && selectedCourseId !== "none") {
            updateData.course_id = selectedCourseId;
        } else {
            updateData.course_id = null;
        }

        startTransition(async () => {
            try {
                await updateTool(editingTool.id, updateData);
                setEditingTool(null);
                setSelectedCategoryId("");
                setSelectedCourseId("none");
                toast.success("Tool updated");
                await loadTools();
            } catch (e) {
                console.error(e);
                toast.error("Failed to update tool");
            }
        });
    }

    const openEdit = (tool: Tool) => {
        setEditingTool(tool);
        setSelectedCategoryId(tool.category_id || "");
        setSelectedCourseId(tool.course_id || "none");
    }
    const renderCourseSelect = () => (
        <div className="space-y-2">
            <Label htmlFor="course">Linked Course</Label>
            <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Course (Optional)" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">No Course Linked</SelectItem>
                    {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                            {course.title} {course.type === 'tool' ? '(Tool)' : ''}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <p className="text-[10px] text-muted-foreground">
                Link this tool to a hidden &quot;Tool Guide&quot; course.
            </p>
        </div>
    );

    return (
        <Card className="border-slate-200 dark:border-navy-800">
             {/* ... Header ... */}
             <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <CardTitle>Tools Library Management</CardTitle>
                    <div className="flex w-full sm:w-auto items-center gap-2">
                         <div className="relative flex-1 sm:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                            <Input 
                                placeholder="Search tools..." 
                                className="pl-8" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" /> Add Tool
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={handleCreateSubmit}>
                                    <DialogHeader>
                                    <DialogTitle>Add New Tool</DialogTitle>
                                    <DialogDescription>
                                        Add a new developer tool to the library.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" name="name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {renderCourseSelect()}
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea id="description" name="description" className="h-20" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={isPending}>
                                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Add Tool
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
                            <TableHead>Tool Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Linked Course</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {loading ? (
                             <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-slate-400" />
                                </TableCell>
                            </TableRow>
                        ) : tools.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No tools found.</TableCell>
                            </TableRow>
                        ) : (
                            tools.map((tool) => (
                                <TableRow key={tool.id}>
                                    <TableCell className="font-medium text-navy-900 dark:text-white">
                                        {tool.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal text-[10px] uppercase tracking-wider bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                            {tool.category_name || "Uncategorized"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {tool.course_id ? (
                                             <Badge variant="default" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0 flex w-fit items-center gap-1">
                                                <LinkIcon className="h-3 w-3" /> Linked
                                             </Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs font-mono">{tool.slug}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEdit(tool)}>
                                                    <Edit2 className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(tool.id)} className="text-red-600">
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

             {/* Edit Dialog */}
             <Dialog open={!!editingTool} onOpenChange={(open) => !open && setEditingTool(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    {editingTool && (
                         <form onSubmit={handleEditSubmit}>
                            <DialogHeader>
                            <DialogTitle>Edit Tool</DialogTitle>
                            <DialogDescription>
                                Update developer tool details.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input id="edit-name" name="name" defaultValue={editingTool.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {renderCourseSelect()}
                                <div className="space-y-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea id="edit-description" name="description" defaultValue={editingTool.description || ""} className="h-20" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={isPending}>
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}

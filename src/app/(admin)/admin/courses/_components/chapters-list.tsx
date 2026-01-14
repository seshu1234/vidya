"use client";

import { useState, useTransition } from "react";
import { createChapter, reorderChapters, deleteChapter } from "../actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Grip, Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Chapter = {
    id: string;
    title: string;
    position: number;
    is_published: boolean;
    is_free: boolean;
    video_url: string | null;
};

interface ChapterListProps {
    courseId: string;
    chapters: Chapter[];
}

export function ChapterList({ courseId, chapters }: ChapterListProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;

        startTransition(async () => {
            try {
                await createChapter(courseId, title);
                setIsCreateOpen(false);
                router.refresh();
            } catch (error) {
                console.error(error);
                alert("Failed to create chapter");
            }
        });
    };

    const handleDelete = (chapterId: string) => {
        if (!confirm("Are you sure? This will delete the chapter and all its content.")) return;
        startTransition(async () => {
            try {
                await deleteChapter(chapterId, courseId);
                router.refresh();
            } catch (error) {
                console.error(error);
            }
        });
    };

    return (
        <Card className="border-slate-200 dark:border-navy-800">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Chapters</CardTitle>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Plus className="h-4 w-4" /> Add Chapter
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <form onSubmit={handleCreateSubmit}>
                            <DialogHeader>
                                <DialogTitle>Add New Chapter</DialogTitle>
                                <DialogDescription>
                                    Create a new chapter for this course.
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
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                {chapters.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No chapters yet. Start adding content!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {chapters.map((chapter) => (
                            <div
                                key={chapter.id}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border bg-card text-card-foreground shadow-sm",
                                    "border-slate-200 dark:border-navy-800"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="cursor-grab text-slate-500 hover:text-slate-800">
                                        <Grip className="h-5 w-5" />
                                    </div>
                                    <div className="font-medium">
                                        {chapter.title}
                                    </div>
                                    {chapter.is_free && <Badge variant="secondary" className="text-xs">Free Preview</Badge>}
                                    {chapter.is_published ? (
                                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-0">Published</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-slate-500 border-slate-200">Draft</Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`./pages/${chapter.id}`}> 
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                     <Button variant="ghost" size="icon" onClick={() => handleDelete(chapter.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

"use client";

import { useTransition } from "react";
import { updateCourse } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Define strict type for Course to match database
type Course = {
    id: string;
    title: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_published: boolean;
    slug: string;
};

export function CourseEditForm({ course }: { course: Course }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const data = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            image_url: formData.get("image_url") as string || null,
            is_published: formData.get("is_published") === "on",
        };

        startTransition(async () => {
            try {
                await updateCourse(course.id, data);
                toast.success("Course updated successfully");
                router.refresh(); 
            } catch (error) {
                console.error(error);
                toast.error("Failed to update course");
            }
        });
    };

    return (
        <Card className="border-slate-200 dark:border-navy-800">
            <CardHeader>
                <CardTitle>Course Details</CardTitle>
                <CardDescription>Update the basic information for this course.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Course Title</Label>
                        <Input id="title" name="title" defaultValue={course.title} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description" 
                            name="description" 
                            defaultValue={course.description || ""} 
                            placeholder="What will students learn?"
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (₹)</Label>
                            <Input 
                                id="price" 
                                name="price" 
                                type="number" 
                                min="0"
                                defaultValue={course.price} 
                            />
                            <p className="text-xs text-muted-foreground">Set to 0 for free courses.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image_url">Thumbnail URL</Label>
                            <Input 
                                id="image_url" 
                                name="image_url" 
                                defaultValue={course.image_url || ""} 
                                placeholder="https://..." 
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="is_published" name="is_published" defaultChecked={course.is_published} />
                        <Label htmlFor="is_published">Publish Course</Label>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { courses } from "@/lib/course-data"; // Use real data
import { MoreHorizontal, Plus } from "lucide-react";

export default function AdminCoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">Courses</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your course catalog.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Create Course
                </Button>
            </div>

            <Card className="border-slate-200 dark:border-navy-800">
                <CardHeader>
                    <CardTitle>Course List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.slice(0, 10).map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium text-navy-900 dark:text-white">{course.title}</TableCell>
                                    <TableCell>{course.category}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{course.level}</Badge>
                                    </TableCell>
                                    <TableCell>{course.students.toLocaleString()}</TableCell>
                                    <TableCell>{course.rating} ★</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

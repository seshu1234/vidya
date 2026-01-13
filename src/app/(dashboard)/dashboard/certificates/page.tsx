import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Award, Share2 } from "lucide-react";

export default function CertificatesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-display text-navy-900 dark:text-white">My Certificates</h1>
                <p className="text-slate-500 dark:text-slate-400">View and download your earned credentials.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-slate-200 dark:border-navy-800 shadow-sm overflow-hidden group">
                    <div className="h-48 bg-slate-100 dark:bg-slate-900 relative flex items-center justify-center bg-[url('https://placehold.co/600x400/EEE/31343C?text=Certificate')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        <Award className="h-16 w-16 text-white drop-shadow-lg" />
                    </div>
                    <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-4">
                             <div>
                                 <h3 className="text-lg font-bold text-navy-900 dark:text-white">Python for Data Science</h3>
                                 <p className="text-sm text-muted-foreground">Issued on Dec 15, 2025</p>
                             </div>
                             <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                         </div>
                         <div className="flex gap-3">
                             <Button variant="outline" className="flex-1 gap-2">
                                 <Download className="h-4 w-4" /> PDF
                             </Button>
                             <Button variant="outline" className="flex-1 gap-2">
                                 <Share2 className="h-4 w-4" /> Share
                             </Button>
                         </div>
                    </CardContent>
                </Card>

                 <Card className="border-slate-200 dark:border-navy-800 shadow-sm overflow-hidden opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="h-48 bg-slate-50 dark:bg-slate-900 relative flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                        <Award className="h-16 w-16 text-slate-300 dark:text-slate-700" />
                    </div>
                    <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-4">
                             <div>
                                 <h3 className="text-lg font-bold text-navy-900 dark:text-white">Advanced React Patterns</h3>
                                 <p className="text-sm text-muted-foreground">In Progress... (85%)</p>
                             </div>
                         </div>
                         <Button disabled className="w-full">
                             Complete to Unlock
                         </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

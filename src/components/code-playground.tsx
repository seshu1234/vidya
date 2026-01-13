"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Terminal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePlaygroundProps {
    defaultLanguage?: string;
    defaultValue?: string;
    theme?: "vs-dark" | "light";
}

// Map common languages to Piston runtimes
const RUNTIME_MAP: Record<string, { language: string; version: string }> = {
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "c++", version: "10.2.0" },
    python: { language: "python", version: "3.10.0" },
    javascript: { language: "javascript", version: "18.15.0" },
    typescript: { language: "typescript", version: "5.0.3" },
    java: { language: "java", version: "15.0.2" },
};

export function CodePlayground({ defaultLanguage = "c", defaultValue = "// Write your code here", theme = "vs-dark" }: CodePlaygroundProps) {
    const [code, setCode] = useState(defaultValue);
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(false);

    const handleRun = async () => {
        setIsRunning(true);
        setOutput("");
        setError(false);

        const runtime = RUNTIME_MAP[defaultLanguage] || RUNTIME_MAP.c;

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: runtime.language,
                    version: runtime.version,
                    files: [{ content: code }],
                }),
            });

            const data = await response.json();

            if (data.run) {
                setOutput(data.run.output);
                if (data.run.stderr) {
                    setError(true);
                }
            } else {
                setOutput("Error: Failed to execute code.");
                setError(true);
            }
        } catch {
            setOutput("Error: Failed to connect to execution server.");
            setError(true);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-slate-800">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 bg-[#1e1e1e] border-b border-slate-800">
                <div className="text-xs font-mono text-slate-400 px-3">
                    main.{defaultLanguage}
                </div>
                <div className="flex items-center gap-2">
                     <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setOutput("")}
                        className="h-7 px-2 text-slate-400 hover:text-white hover:bg-white/10"
                        title="Clear Output"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                        size="sm" 
                        onClick={handleRun}
                        disabled={isRunning}
                        className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-xs gap-1.5"
                    >
                        {isRunning ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                        Run Code
                    </Button>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 relative min-h-[300px]">
                <Editor
                    height="100%"
                    defaultLanguage={defaultLanguage === "c" ? "c" : defaultLanguage} // Monaco uses 'c' for C
                    theme={theme}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                        fontFamily: "JetBrains Mono, Menlo, Monaco, 'Courier New', monospace",
                        padding: { top: 16 },
                    }}
                />
            </div>

            {/* Output Panel */}
            <div className="h-1/3 min-h-[150px] bg-[#1a1a1a] border-t border-slate-800 flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-black/20">
                    <Terminal className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Output</span>
                </div>
                <div className={cn(
                    "flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap",
                    error ? "text-red-400" : "text-slate-300",
                    !output && "text-slate-600 italic"
                )}>
                    {output || "Run code to see output..."}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function VernacularToggle({ minimal = false }: { minimal?: boolean }) {
  const [isHinglish, setIsHinglish] = useState(true);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-8">
      {!minimal && (
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight md:text-3xl lg:text-4xl">Experience the Hinglish Magic</h2>
        <p className="text-muted-foreground text-base md:text-lg">Toggle karo aur dekho kaise complex concepts simple ho jaate hain!</p>
        
        <div className="flex items-center space-x-4 bg-muted/50 p-2 rounded-full border">
          <span className={`text-sm font-medium ${!isHinglish ? "text-primary font-bold" : "text-muted-foreground"}`}>Technical English</span>
          <button
            role="switch"
            aria-checked={isHinglish}
            onClick={() => setIsHinglish(!isHinglish)}
            className={`
              peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
              ${isHinglish ? "bg-black dark:bg-white" : "bg-input"}
            `}
          >
            <span
              className={`
                pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform 
                ${isHinglish ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
          <span className={`text-sm font-medium ${isHinglish ? "text-black dark:text-white font-bold" : "text-muted-foreground"}`}>✨ Hinglish</span>
        </div>
      </div>
      )}

      {minimal && (
         <div className="flex justify-end mb-4">
             <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-md p-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className={`text-xs font-medium ${!isHinglish ? "text-black dark:text-white font-bold" : "text-slate-500"}`}>English</span>
                <button
                    role="switch"
                    aria-checked={isHinglish}
                    onClick={() => setIsHinglish(!isHinglish)}
                    className={`
                    peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50
                    ${isHinglish ? "bg-black dark:bg-white" : "bg-slate-200 dark:bg-slate-700"}
                    `}
                >
                    <span
                    className={`
                        pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform 
                        ${isHinglish ? "translate-x-4" : "translate-x-0"}
                    `}
                    />
                </button>
                <span className={`text-xs font-medium ${isHinglish ? "text-black dark:text-white font-bold" : "text-slate-500"}`}>Hinglish</span>
            </div>
         </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Code Editor */}
        <div className="w-full overflow-hidden rounded-xl border bg-[#1e1e1e] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 bg-[#252526]">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="ml-2 text-xs text-zinc-400 font-mono">python_basics.py</span>
          </div>
          <div className="p-4 font-mono text-sm leading-relaxed text-zinc-300 overflow-x-auto">
            {isHinglish ? (
              <>
                <div className="text-zinc-500"># 🛒 Variables are like Dabba in Kitchen</div>
                <div><span className="text-[#9cdcfe]">sugar_dabba</span> = <span className="text-[#ce9178]">&quot;Cheeni&quot;</span></div>
                <div><span className="text-[#9cdcfe]">rice_dabba</span> = <span className="text-[#ce9178]">&quot;Chawal&quot;</span></div>
                <br />
                <div className="text-zinc-500"># 🔄 Loop = Repeat karo</div>
                <div><span className="text-[#c586c0]">for</span> item <span className="text-[#c586c0]">in</span> kitchen:</div>
                <div className="pl-4"><span className="text-[#dcdcaa]">print</span>(f<span className="text-[#ce9178]">&quot;Dabba: &#123;item&#125;&quot;</span>)</div>
              </>
            ) : (
              <>
                <div className="text-zinc-500"># Standard Variable Declaration</div>
                <div><span className="text-[#9cdcfe]">sugar_container</span> = <span className="text-[#ce9178]">&quot;Sugar&quot;</span></div>
                <div><span className="text-[#9cdcfe]">rice_container</span> = <span className="text-[#ce9178]">&quot;Rice&quot;</span></div>
                <br />
                <div className="text-zinc-500"># Standard Loop Iteration</div>
                <div><span className="text-[#c586c0]">for</span> item <span className="text-[#c586c0]">in</span> pantry:</div>
                <div className="pl-4"><span className="text-[#dcdcaa]">print</span>(f<span className="text-[#ce9178]">&quot;Item: &#123;item&#125;&quot;</span>)</div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Explanation Card */}
        <Card className="h-full border-slate-200 shadow-lg dark:bg-navy-950/50 flex flex-col justify-center dark:border-slate-800">
            {isHinglish ? (
                 <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
                        🍽️ Real-world Analogy
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white">
                        API = Restaurant ka Waiter
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        API ek waiter jaisa hai! Jaise tum waiter ko order dete ho aur wo kitchen se khana laata hai, waise hi API tumhari app ko server se data laake deta hai.
                    </p>
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm text-muted-foreground mt-4 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400">{"// Waiter ko bolo:"}</span> &apos;Bhaiya users ka list laao&apos; <br/>
                        <span className="text-black dark:text-white">fetch</span>(&apos;/api/users&apos;)
                    </div>
                 </CardContent>
            ) : (
                <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        📚 Technical Definition
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-blue-400">
                        Application Programming Interface
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        An API is a set of rules and protocols/definitions that allows different software entities to communicate with each other. It acts as an intermediary layer.
                    </p>
                    <div className="rounded-lg bg-muted p-4 font-mono text-sm text-muted-foreground mt-4">
                         <span className="text-slate-500">{"// HTTP GET Request"}</span> <br/>
                         <span className="text-navy-700 dark:text-blue-300">fetch</span>(&apos;/api/users&apos;)
                    </div>
                 </CardContent>
            )}
        </Card>
      </div>
    </div>
  );
}

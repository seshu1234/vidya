"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const explanations = {
  english: {
    title: "What is an API?",
    content: "An API (Application Programming Interface) is a set of rules that allows different software entities to communicate with each other.",
    analogy: "Technical Definition",
  },
  hinglish: {
    title: "API Kya Hai?",
    content: "Socho ek Restaurant hai. Tum (Client) Kitchen (Server) se direct baat nahi kar sakte. Tumhe 'Waiter' chahiye jo tumhara Order le aur Khana laye. API wahi Waiter hai!",
    analogy: "Waiter Analogy",
  },
  tanglish: {
    title: "API na Enna?",
    content: "Oru Restaurant ninaichukonga. Neenga (Client) Kitchen (Server) kitta neradiya kekka mudiyathu. Unga Order edukka oru 'Waiter' venum. API than antha Waiter!",
    analogy: "Waiter Analogy",
  },
  benglish: {
    title: "API Ki?",
    content: "Dhorun ekta Restaurant. Apni (Client) sorasori Kitchen (Server) theke khabar চাইতে paren na. Apnar order newar jonno ekjon 'Waiter' lage. API holo shei Waiter!",
    analogy: "Waiter Analogy",
  },
};

export function VernacularToggle() {
  const [activeTab, setActiveTab] = useState("hinglish");

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">No Jargon. Just Logic.</h2>
        <p className="text-muted-foreground">Switch languages to see how we explain complex tech.</p>
      </div>

      <Tabs defaultValue="hinglish" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="english">🇺🇸 English</TabsTrigger>
          <TabsTrigger value="hinglish">🇮🇳 Hinglish</TabsTrigger>
          <TabsTrigger value="tanglish">🐯 Tanglish</TabsTrigger>
          <TabsTrigger value="benglish">🐟 Benglish</TabsTrigger>
        </TabsList>
        
        {Object.entries(explanations).map(([key, data]) => (
          <TabsContent key={key} value={key}>
            <Card className="border-saffron-400/20 shadow-lg dark:bg-navy-950/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl text-navy-900 dark:text-saffron-400">
                    {data.title}
                  </CardTitle>
                  <Badge variant="outline" className="border-saffron-500 text-saffron-600">
                    {data.analogy}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {data.content}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

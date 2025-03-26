"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { mockEntries } from "@/lib/mock-data"; // For testing, replace with API call later
import { formatDate/*, createExcerpt */} from "@/lib/utils";
import { JournalEntry, getJournalEntries } from "@/services/journal.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function RecentEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real implementation, fetch entries from API
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // For development, use mock data
        if (process.env.NODE_ENV === "development") {
          // Simulate API delay
          setTimeout(() => {
            setEntries(mockEntries);
            setIsLoading(false);
          }, 500);
          return;
        }

        // For production, use real API
        const response = await getJournalEntries(1, 5);
        setEntries(response.entries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <Skeleton className="h-6 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">No journal entries yet</p>
          <Link href="/entries/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create your first entry
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Get the 5 most recent entries
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    .slice(0, 5);

  return (
    <div className="grid gap-4">
      {recentEntries.map((entry) => (
        <Link key={entry.id} href={`/entries/${entry.id}`}>
          <Card className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{entry.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{formatDate(entry.entryDate)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {/* {createExcerpt(entry.content, 120)} */}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 ml-4">
                  {entry.categories.map((category) => (
                    <Badge 
                      key={category.id} 
                      style={{ backgroundColor: category.color }} 
                      className="text-white text-xs"
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}


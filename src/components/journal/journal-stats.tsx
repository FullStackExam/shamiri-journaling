"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockEntries, mockCategories } from "@/lib/mock-data"; // For testing, replace with API call later
// import { getWordCount } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { JournalEntry, getJournalEntries } from "@/services/journal.service";

export default function JournalStats() {
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
        const response = await getJournalEntries(1, 1000); // Get all entries for stats
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-40 mb-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-8" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="w-3 h-3 rounded-full mr-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate some basic stats
  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum /*+ getWordCount(entry.content)*/, 0); // check
  const avgWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;

  // Count entries per category
  const categoryCounts = mockCategories.map((category) => {
    const count = entries.filter((entry) => 
      entry.categories.some((cat) => cat.id === category.id)
    ).length;
    
    return {
      name: category.name,
      count,
      color: category.color,
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Writing Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Entries</span>
              <span className="font-medium">{totalEntries}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Words</span>
              <span className="font-medium">{totalWords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Avg. Words per Entry</span>
              <span className="font-medium">{avgWordsPerEntry}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Top Categories</h3>
          <div className="space-y-2">
            {categoryCounts
              .sort((a, b) => b.count - a.count)
              .slice(0, 5)
              .map((category) => (
                <div key={category.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                    <span className="text-gray-500">{category.name}</span>
                  </div>
                  <span className="font-medium">{category.count}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
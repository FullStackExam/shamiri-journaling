"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, PenLine, Plus } from "lucide-react";
import Link from "next/link";
import RecentEntries from "@/components/journal/recent-entries";
import JournalStats from "@/components/journal/journal-stats";
import WritingFrequency from "@/components/analytics/writing-frequency";
import { mockEntries, mockCategories } from "@/lib/mock-data"; // For testing, replace with API call later
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEntries: 0,
    thisMonthEntries: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    // In a real implementation, fetch stats from API
    const fetchStats = async () => {
      try {
        // For development, use mock data
        if (process.env.NODE_ENV === "development") {
          // Simulate API delay
          setTimeout(() => {
            // Calculate stats from mock data
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            const totalEntries = mockEntries.length;
            const thisMonthEntries = mockEntries.filter(entry => {
              const entryDate = new Date(entry.entryDate);
              return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
            }).length;
            const totalCategories = mockCategories.length;
            
            setStats({
              totalEntries,
              thisMonthEntries,
              totalCategories,
            });
            
            setIsLoading(false);
          }, 500);
        } else {
          // For production, use real API
          // const response = await getDashboardStats();
          // setStats(response);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/entries/new">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Entries</CardTitle>
            <CardDescription>All journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="flex items-center">
                <PenLine className="h-8 w-8 text-purple-500 mr-3" />
                <span className="text-3xl font-bold">{stats.totalEntries}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">This Month</CardTitle>
            <CardDescription>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-teal-500 mr-3" />
                <span className="text-3xl font-bold">{stats.thisMonthEntries}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Categories</CardTitle>
            <CardDescription>Total categories</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-12 w-24" />
            ) : (
              <div className="flex items-center">
                <svg
                  className="h-8 w-8 text-amber-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span className="text-3xl font-bold">{stats.totalCategories}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="mb-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Entries</TabsTrigger>
          <TabsTrigger value="stats">Journal Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <RecentEntries />
        </TabsContent>
        <TabsContent value="stats">
          <JournalStats />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Writing Frequency</CardTitle>
          <CardDescription>Your journaling activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <WritingFrequency />
        </CardContent>
      </Card>
    </div>
  );
}
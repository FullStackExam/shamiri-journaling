"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { mockEntries } from "@/lib/mock-data"; // For testing, replace with API call later
import { JournalEntry, getJournalEntries } from "@/services/journal.service";
import { Skeleton } from "@/components/ui/skeleton";

// Used for tooltip content
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-sm">
        <p className="font-medium">{label}</p>
        <p className="text-sm">
          <span className="text-purple-600">{payload[0].value}</span> entries
        </p>
      </div>
    );
  }
  return null;
};

export default function WritingFrequency() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [data, setData] = useState<{ date: string; entries: number }[]>([]);
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
        } else {
          // For production, use real API
          const response = await getJournalEntries(1, 1000); // Get all entries for frequency data
          setEntries(response.entries);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Generate frequency data when entries are loaded
  useEffect(() => {
    if (entries.length > 0) {
      setData(generateFrequencyData(entries));
    }
  }, [entries]);

  function generateFrequencyData(entries: JournalEntry[]) {
    const today = new Date();
    const frequencyData = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const dateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Count entries for this date
      const count = entries.filter((entry) => {
        const entryDate = new Date(entry.entryDate);
        return entryDate.toDateString() === date.toDateString();
      }).length;

      frequencyData.push({
        date: dateString,
        entries: count,
      });
    }

    return frequencyData;
  }

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.split(" ")[0]}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="entries"
            radius={[4, 4, 0, 0]}
            fill="#9333EA" // Purple to match the design
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
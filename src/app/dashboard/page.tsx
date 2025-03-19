import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Dashboard | Personal Journal',
  description: 'Your personal journal dashboard',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Journal Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title="Journal Entries" 
          description="View, create, and manage your journal entries"
          link="/entries"
          linkText="View Entries"
        />
        
        <DashboardCard 
          title="Categories" 
          description="Organize your entries with custom categories"
          link="/categories"
          linkText="Manage Categories"
        />
        
        <DashboardCard 
          title="Insights" 
          description="Discover patterns and trends in your journal"
          link="/insights"
          linkText="View Insights"
        />
      </div>
      
      <div className="bg-card rounded-lg shadow-sm p-6 border">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-x-4">
          <Button asChild>
            <Link href="/entries/new">New Journal Entry</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ 
  title, 
  description, 
  link, 
  linkText 
}: { 
  title: string; 
  description: string; 
  link: string; 
  linkText: string 
}) {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button asChild variant="outline">
        <Link href={link}>{linkText}</Link>
      </Button>
    </div>
  );
}
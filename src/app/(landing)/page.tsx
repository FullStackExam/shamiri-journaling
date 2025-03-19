import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, BarChart2, Tag, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">Journaling App</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-purple-600 hover:bg-purple-700">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Capture your thoughts, <span className="text-purple-600 dark:text-purple-400">gain insights</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                A personal journaling application that helps you document your thoughts, track patterns, and gain
                meaningful insights through advanced analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 cursor-pointer">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="cursor-pointer">
                    Log in to your account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full bg-purple-200 dark:bg-purple-900 rounded-lg transform rotate-3"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-6 w-16 bg-purple-200 dark:bg-purple-800 rounded-full"></div>
                      <div className="h-6 w-16 bg-teal-200 dark:bg-teal-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our journaling app provides everything you need to document, organize, and gain insights from your
              personal writing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 cursor-pointer" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Journal Entries</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create, edit, and organize your thoughts with our intuitive journaling interface.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-teal-600 dark:text-teal-400 cursor-pointer" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Categorization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Organize your entries with custom categories and tags for easy retrieval.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-amber-600 dark:text-amber-400 cursor-pointer" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gain insights from your writing patterns with powerful analytics and visualizations.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400 cursor-pointer" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your journal entries are secure and private with our robust security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from people who have transformed their journaling practice with our app.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-200 dark:bg-purple-700 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Atieno M.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "This app has transformed how I reflect on my experiences. The insights feature helped me identify
                patterns in my behavior I never noticed before."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-200 dark:bg-teal-700 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Kamau J.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Project Manager</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The categorization system is perfect for keeping my work and personal reflections organized. I can
                quickly find past entries when I need them."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-amber-200 dark:bg-amber-700 rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Wanjiku T.</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Therapist</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a therapist, I recommend this app to my clients. The sentiment analysis helps them understand their
                emotional patterns over time."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 dark:bg-purple-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Your Journaling Journey Today</h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
            Join thousands of users who have improved their self-awareness and personal growth through journaling.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 cursor-pointer">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">Journaling App</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                © 2025 Journaling App. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="mb-6">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">We'll send you a link to reset your password</p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {isSubmitted ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Check your email</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <div className="space-y-4">
              <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                Try another email
              </Button>
              <Link href="/login">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Back to login</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
            
            <div className="mt-6">
              <Alert>
                <AlertDescription>
                  If your email is registered with us, you'll receive a password reset link shortly.
                </AlertDescription>
              </Alert>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
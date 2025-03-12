"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LetterForm() {
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the letter to your backend
    setIsSent(true)
  }

  if (isSent) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">Letter Sent!</h3>
        <p className="text-gray-600">Your letter has been sent. You'll receive a letter from someone else soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Enter the subject of your letter" />
      </div>
      <div>
        <Label htmlFor="content">Your Letter</Label>
        <Textarea id="content" placeholder="Write your letter here..." className="min-h-[200px]" />
      </div>
      <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
        Send Letter
      </Button>
    </form>
  )
}


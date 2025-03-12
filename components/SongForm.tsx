"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Share2, Music } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

type FormState = "writing" | "sent" | "received"

interface Letter {
  name: string
  origin: string
  song: string
  artist: string
}

export default function SongForm() {
  const [formState, setFormState] = useState<FormState>("writing")
  const [formData, setFormData] = useState<Letter>({
    name: "",
    origin: "",
    song: "",
    artist: "",
  })
  const [receivedLetter, setReceivedLetter] = useState<Letter | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormState("sent")

    try {
      // Save the letter
      const saveResponse = await fetch("/api/letters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!saveResponse.ok) {
        throw new Error("Failed to save letter")
      }

      // Retrieve a letter from someone else
      const getResponse = await fetch(`/api/letters?currentUser=${encodeURIComponent(formData.name)}`)

      if (getResponse.ok) {
        const receivedLetter: Letter = await getResponse.json()
        setReceivedLetter(receivedLetter)
        setFormState("received")
      } else if (getResponse.status === 404) {
        // No other letters available
        setReceivedLetter(null)
        setFormState("received")
      } else {
        throw new Error("Failed to retrieve letter")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
      setFormState("writing")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleWriteNewLetter = () => {
    setFormState("writing")
    setFormData({
      name: "",
      origin: "",
      song: "",
      artist: "",
    })
    setReceivedLetter(null)
  }

  return (
    <AnimatePresence mode="wait">
      {formState === "writing" && (
        <motion.form
          onSubmit={handleSubmit}
          className="font-handwriting text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="space-y-4">
            <div className="flex items-baseline space-x-2">
              <label className="text-gray-800 whitespace-nowrap">My name is</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border-b border-gray-400 bg-transparent focus:border-[#1DB954] transition-colors duration-200 px-0 flex-grow w-48 text-2xl"
                style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
                required
              />
            </div>
            <div className="flex items-baseline space-x-2">
              <label className="text-gray-800 whitespace-nowrap">I come from</label>
              <Input
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                placeholder="Your Origin"
                className="border-b border-gray-400 bg-transparent focus:border-[#1DB954] transition-colors duration-200 px-0 flex-grow w-48 text-2xl"
                style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
                required
              />
            </div>
            <div className="flex items-baseline space-x-2">
              <label className="text-gray-800 whitespace-nowrap">I like the song</label>
              <Input
                name="song"
                value={formData.song}
                onChange={handleChange}
                placeholder="Song Title"
                className="border-b border-gray-400 bg-transparent focus:border-[#1DB954] transition-colors duration-200 px-0 flex-grow w-64 text-2xl"
                style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
                required
              />
            </div>
            <div className="flex items-baseline space-x-2">
              <label className="text-gray-800 whitespace-nowrap">made by</label>
              <Input
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                placeholder="Artist Name"
                className="border-b border-gray-400 bg-transparent focus:border-[#1DB954] transition-colors duration-200 px-0 flex-grow w-64 text-2xl"
                style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold group transition-all duration-300"
            >
              Share Song
              <Share2 className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </motion.form>
      )}
      {formState === "sent" && (
        <motion.div
          className="text-center py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <h3 className="text-2xl font-handwriting text-gray-800 mb-2">Letter Sent!</h3>
          <p className="text-gray-600 font-handwriting text-lg">
            Your letter is on its way. You'll receive a letter from someone else soon.
          </p>
        </motion.div>
      )}
      {formState === "received" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-full" // Make it full width
        >
          <div className="font-handwriting">
            {receivedLetter ? (
              <>
                <h3 className="text-3xl font-handwriting text-gray-800 mb-4 flex items-center gap-2">
                  <Music className="text-[#1DB954] w-6 h-6" />
                  You've Received a Letter from {receivedLetter.name}!
                </h3>
                <div className="space-y-5 text-gray-700 text-2xl">
                  {" "}
                  {/* Increased spacing and text size */}
                  <p>My name is {receivedLetter.name}</p>
                  <p>I come from {receivedLetter.origin}</p>
                  <p>I like the song "{receivedLetter.song}"</p>
                  <p>made by {receivedLetter.artist}</p>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Music className="mx-auto mb-2 text-[#1DB954] w-6 h-6" />
                <h3 className="text-2xl font-handwriting text-gray-800 mb-2">No Letters Available</h3>
                <p className="text-gray-700 mb-2">You're the first one here! Your letter has been saved.</p>
              </div>
            )}
            <Button
              onClick={handleWriteNewLetter}
              className="w-full mt-6 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold group transition-all duration-300 text-lg py-3" // Larger button
            >
              Write a New Letter
              <Share2 className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


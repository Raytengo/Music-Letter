import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Envelope } from "@/components/Decorations"
import Link from "next/link"

export default function ReceiveLetter() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-amber-800 mb-8">Your Received Letter</h1>
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-amber-700">A Letter for You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Envelope className="absolute -top-8 -left-8 w-16 h-16 text-amber-300 opacity-50 transform -rotate-12" />
            <p className="text-gray-700 mb-4">
              Dear friend,
              <br />
              <br />
              This is a sample letter you've received. In a real application, this content would be dynamically
              populated with a letter from another user.
              <br />
              <br />I hope this letter finds you well and brings a smile to your face.
              <br />
              <br />
              Best wishes,
              <br />A fellow letter writer
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button className="w-full bg-amber-500 hover:bg-amber-600">Write a Reply</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}


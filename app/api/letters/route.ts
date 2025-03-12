import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "letters.json")

interface Letter {
  name: string
  origin: string
  song: string
  artist: string
}

async function getLetters(): Promise<Letter[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const data = await fs.readFile(DATA_FILE, "utf8")
    return JSON.parse(data)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // File doesn't exist, return an empty array
      return []
    }
    console.error("Error reading file:", error)
    throw error
  }
}

async function saveLetters(letters: Letter[]): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(letters, null, 2))
  } catch (error) {
    console.error("Error writing file:", error)
    throw error
  }
}

export async function POST(request: Request) {
  const letter: Letter = await request.json()
  const letters = await getLetters()
  letters.push(letter)
  await saveLetters(letters)
  return NextResponse.json({ message: "Letter saved successfully" })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const currentUser = searchParams.get("currentUser")
  const letters = await getLetters()
  const otherLetters = letters.filter((letter) => letter.name !== currentUser)

  if (otherLetters.length > 0) {
    const randomLetter = otherLetters[Math.floor(Math.random() * otherLetters.length)]
    return NextResponse.json(randomLetter)
  } else {
    return NextResponse.json({ message: "No other letters available" }, { status: 404 })
  }
}


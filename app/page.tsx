"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { languages } from "@/lib/languages"

export default function HomePage() {
  const [greeting, setGreeting] = useState("")
  const [copied, setCopied] = useState(false)
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [senderName, setSenderName] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [selectedLang, setSelectedLang] = useState("en")

  const handleGenerate = () => {
    if (greeting.trim()) {
      const baseUrl = `${window.location.origin}/${encodeURIComponent(greeting.trim().toLowerCase())}`
      const params = new URLSearchParams()

      if (selectedLang !== "en") {
        params.append("lang", selectedLang)
      }
      if (senderName.trim()) {
        params.append("sender", senderName.trim())
      }
      if (receiverName.trim()) {
        params.append("receiver", receiverName.trim())
      }

      const queryString = params.toString()
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl
      setGeneratedUrl(url)
    }
  }

  const handleCopy = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const popularGreetings = ["hello", "hi", "hey", "yo", "sup", "ping"]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-serif leading-tight">
            no{" "}
            <span className="relative inline-block">
              greeting
              <span className="absolute left-0 right-0 top-1/2 h-1 bg-red-600 -rotate-6" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="text-gray-500 text-xl">Generate a custom page for any greeting</p>
        </header>

        <div className="bg-gray-50 rounded-lg p-8 shadow-sm space-y-6">
          <div className="space-y-3">
            <label htmlFor="greeting" className="text-lg font-medium block">
              Enter a greeting to discourage:
            </label>
            <div className="flex gap-3">
              <Input
                id="greeting"
                type="text"
                placeholder="e.g., hello, hi, yo..."
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="flex-1 text-lg px-4 py-6 bg-white border-gray-300"
              />
              <Button
                onClick={handleGenerate}
                disabled={!greeting.trim()}
                className="px-8 py-6 text-lg bg-gray-900 hover:bg-gray-800 text-white"
              >
                Generate
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              Advanced Options
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="language" className="text-sm font-medium block text-gray-700">
                    Language (optional)
                  </label>
                  <select
                    id="language"
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">The language for the generated page</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="sender" className="text-sm font-medium block text-gray-700">
                    Sender Name (optional)
                  </label>
                  <Input
                    id="sender"
                    type="text"
                    placeholder="e.g., Dawn"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="bg-white border-gray-300"
                  />
                  <p className="text-xs text-gray-500">The person sending messages in the "Instead try this" example</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="receiver" className="text-sm font-medium block text-gray-700">
                    Receiver Name (optional)
                  </label>
                  <Input
                    id="receiver"
                    type="text"
                    placeholder="e.g., Kuber"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="bg-white border-gray-300"
                  />
                  <p className="text-xs text-gray-500">The person receiving messages in the examples</p>
                </div>
              </div>
            )}
          </div>

          {generatedUrl && (
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <label className="text-lg font-medium block">Your custom link:</label>
              <div className="flex gap-3">
                <Input
                  value={generatedUrl}
                  readOnly
                  className="flex-1 font-mono text-sm px-4 py-3 bg-white border-gray-300"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  className="shrink-0 border-gray-300 hover:bg-gray-100 p-3 bg-transparent"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
              <Link
                href={generatedUrl.replace(window.location.origin, "")}
                className="text-blue-600 hover:underline inline-block text-lg"
              >
                Preview your page →
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-center text-gray-600 text-lg">Try these popular greetings:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {popularGreetings.map((g) => (
              <Link key={g} href={`/${g}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:bg-gray-100 text-base bg-transparent"
                >
                  {g}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <footer className="text-center text-gray-500 pt-12 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            another{" "}
            <a
              href="https://kuber.studio/#/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              dumb project
            </a>{" "}
            by{" "}
            <a
              href="https://x.com/kuberwastaken"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              kuber mehta
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

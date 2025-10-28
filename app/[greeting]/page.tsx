import { notFound } from "next/navigation"
import Link from "next/link"
import { getTranslation, getLanguage, languages } from "@/lib/languages"

interface PageProps {
  params: Promise<{ greeting: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GreetingPage({ params, searchParams }: PageProps) {
  const { greeting } = await params
  const search = await searchParams

  const langCode = typeof search.lang === "string" ? search.lang : "en"
  const t = getTranslation(langCode)
  const currentLang = getLanguage(langCode)

  const senderName = typeof search.sender === "string" ? search.sender : "Dawn"
  const receiverName = typeof search.receiver === "string" ? search.receiver : "Tim"

  if (!greeting) {
    notFound()
  }

  const decodedGreeting = decodeURIComponent(greeting)
  const capitalizedGreeting = decodedGreeting.charAt(0).toUpperCase() + decodedGreeting.slice(1)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <header className="space-y-2">
          <h1 className="text-6xl font-serif leading-tight">
            no{" "}
            <span className="relative inline-block">
              {decodedGreeting}
              <span className="absolute left-0 right-0 top-1/2 h-1 bg-red-600 -rotate-6" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="text-gray-500 text-lg">{t.tagline.replace("{greeting}", decodedGreeting)}</p>
        </header>

        <section className="space-y-6">
          <p className="text-2xl leading-relaxed">{t.phoneAnalogy.replace("{greeting}", decodedGreeting)}</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <span className="text-red-600 text-4xl">✕</span> {t.dontDoThis}
          </h2>

          <div className="bg-gray-50 rounded-lg p-8 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">Keith</span>
                  <span className="text-sm text-gray-500">2:15 PM</span>
                </div>
                <p>{decodedGreeting}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{receiverName}</span>
                  <span className="text-sm text-gray-500">2:19 PM</span>
                </div>
                <p>{t.chatWaiting}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">Keith</span>
                  <span className="text-sm text-gray-500">2:20 PM</span>
                </div>
                <p>{t.chatQuestion}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{receiverName}</span>
                  <span className="text-sm text-gray-500">2:20 PM</span>
                </div>
                <p>{t.chatAnswer}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p>{t.noteText(receiverName)}</p>
            <p>{t.politenessText}</p>
            <p>{t.sameGoesFor}</p>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">✕</span>
                <span>"{t.areYouAround.replace("{greeting}", capitalizedGreeting)}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">✕</span>
                <span>"{t.quickQuestion.replace("{greeting}", decodedGreeting)}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">✕</span>
                <span>"{t.gotASec}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">✕</span>
                <span>"yt?"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">✕</span>
                <span>"ping"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">✕</span>
                <span>{t.etc}</span>
              </li>
            </ul>
            <p className="text-xl font-semibold">{t.justAskQuestion}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <span className="text-green-600 text-4xl">✓</span> {t.insteadTryThis}
          </h2>

          <div className="bg-gray-50 rounded-lg p-8 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{senderName}</span>
                  <span className="text-sm text-gray-500">2:15 PM</span>
                </div>
                <p>{t.chatGreetingQuestion(capitalizedGreeting)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{receiverName}</span>
                  <span className="text-sm text-gray-500">2:15 PM</span>
                </div>
                <p>{t.chatQuickAnswer}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{senderName}</span>
                  <span className="text-sm text-gray-500">2:15 PM</span>
                </div>
                <p>{t.chatThanks}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{receiverName}</span>
                  <span className="text-sm text-gray-500">2:16 PM</span>
                </div>
                <p>{t.chatAcknowledge}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-lg leading-relaxed">
            <p>{t.ifBrusque(capitalizedGreeting)}</p>
            <p>{t.forExample}</p>
            <ul className="space-y-2 pl-6">
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span>"{t.exampleMedium(decodedGreeting)}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span>"{t.exampleLong(capitalizedGreeting)}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span>"{t.exampleShort(decodedGreeting)}"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 flex-shrink-0">✓</span>
                <span>{t.etc}</span>
              </li>
            </ul>
            <p>{t.asyncText(capitalizedGreeting)}</p>
            <p className="text-xl font-semibold">{t.everyoneHappy}</p>
          </div>
        </section>

        <footer className="text-center text-gray-500 pt-8 border-t border-gray-200 space-y-6">
          <div>
            <p className="text-sm">
              {t.halfSerious}{" "}
              <a
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                {t.madLink}
              </a>{" "}
              at the person who sent you here.
            </p>
            <p className="text-sm mt-2">{t.statusWarning(capitalizedGreeting)}</p>
            <p className="text-sm mt-4">
              {t.createYourOwn}{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                nogreeting.kuber.studio
              </Link>
              {" · "}
              {t.openSource}{" "}
              <a
                href="http://github.com/kuberwastaken/nogreeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {t.availableIn}{" "}
              {languages.map((lang, index) => (
                <span key={lang.code}>
                  <Link
                    href={`/${greeting}?lang=${lang.code}${senderName !== "Dawn" ? `&sender=${senderName}` : ""}${receiverName !== "Tim" ? `&receiver=${receiverName}` : ""}`}
                    className={`hover:underline ${lang.code === langCode ? "font-bold text-blue-600" : "text-blue-600"}`}
                  >
                    {lang.nativeName}
                  </Link>
                  {index < languages.length - 1 && <span className="text-gray-400"> · </span>}
                </span>
              ))}
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              {t.anotherProject}{" "}
              <a
                href="https://kuber.studio/#/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {t.dumbProject}
              </a>{" "}
              {t.by}{" "}
              <a
                href="https://x.com/kuberwastaken"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                kuber mehta
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

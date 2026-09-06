import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Scissors, Sparkles, WandSparkles } from "lucide-react";
import BookAClassSelector from "@/components/home/BookAClass";
import VideoBanner from "@/components/home/VideoHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const focusAreas = [
  { href: "/beauty-schools",
    title: "Beauty Schools",
    description: "Build the systems behind a healthier beauty business.",
    image: "beauty_school_icon2.png",
    icon: BriefcaseBusiness,
    topics: ["Curriculum Support", "Professional Development", "Career Readiness", "Hands-On Workshops"]
  },
  { href: "/apprenticeships",
    title: "Beauty Apprenticeships",
    description: "Turn expertise into education people remember.",
    image: "beauty_apprenticeship_icon1.png",
    icon: GraduationCap,
    topics: ["Stylist Resources", "State Board Prep", "Professional Development", "Hands-On Training"]
  },
  { href: "/licensed-professionals",
    title: "Licensed Professionals",
    description: "Create consistent, confident results behind the chair.",
    image: "licensed_professional_icon1.png",
    icon: Scissors,
    topics: ["Cosmetologists", "Estheticians", "Business Building", "Hands-On Training"]
  },
  { href: "/educators",
    title: "Educators",
    description: "Elevate the full client experience—from skin to lashes.",
    image: "educator_icon.png",
    icon: Sparkles,
    topics: ["Educator Empowerment", "Facilitation", "Methodology", "Industry Focused Workshops"]
  },
];

export default function Home() {
  return (
    <main>
      <section className="qbg-container grid min-h-[calc(100svh-4.5rem)] items-center gap-12 py-16 grid-cols-1 lg:py-24">
        <div className="max-w-7xl">
          <h1 className="text-balance text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Beauty education that moves <span className="text-pink-400">with you.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            The Quantum Beauty Group is where beauty education meets innovation.
            We create smarter, more engaging learning experiences that help beauty professionals, educators, schools, and apprentices thrive.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#focus-points">Book a class 
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/blend-iq">
                Explore BlendIQ
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-6">
            <div>
              <p className="text-2xl font-bold text-primary">42+</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Years of combined experience
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Education focus areas
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Ways to learn
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/55 py-8"><VideoBanner /></section>

      <section id="who-we-are" className="qbg-section scroll-mt-24">
        <div className="qbg-container grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="qbg-eyebrow">
              Who we are
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              We do the studying. You keep your passion.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-muted-foreground">
            <p>
              Quantum Beauty Group is a team of licensed instructors who believe education should evolve as quickly as the beauty industry does.
            </p>
            <p>
              We turn research, experience, and real salon challenges into learning that fits your life—in person, virtually, and through BlendIQ.
            </p>
            <Button asChild variant="outline" className="mt-3">
              <Link href="/about">
                Meet the team
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="focus-points" className="qbg-section scroll-mt-8 md:scroll-mt-0 border-y border-border bg-card/55">
        <div className="qbg-container">
          <div className="mx-auto max-w-2xl text-center"><p className="qbg-eyebrow">What we teach</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Grow the craft and the career.</h2><p className="mt-5 text-lg text-muted-foreground">Choose a focus area and shape a class around the skills your team needs next.</p></div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <Link key={area.href} href={area.href} className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Card className="h-full border-transparent py-0 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/25 group-hover:shadow-xl group-hover:shadow-primary/10">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <Image 
                        src={`https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/focus-points/${area.image}`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <span className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                        <Icon className="size-5" />
                      </span>
                      <CardTitle className="text-xl">
                        {area.title}
                      </CardTitle>
                      <CardDescription className="leading-6">
                        {area.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-5">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {area.topics.map((topic) => (
                          <li key={topic} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-primary" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary">
                        Explore classes <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blend-iq" className="qbg-section scroll-mt-24 overflow-hidden">
        <div className="qbg-container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline">
              Pre-release
            </Badge>
            <p className="qbg-gradient-text mt-5 text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              BLEND IQ
            </p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Salon software without the clutter.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Booking, client notes, formulas, finances, inventory, and reminders—designed around the way independent beauty professionals actually work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/blend-iq">
                  See what’s inside <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/blend-iq/get-beta-access">
                  Apply for beta access
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-3 sm:gap-5" aria-label="BlendIQ product previews">{["header-finance.png", "header-scheduler.png", "header-vault.png"].map((image, index) => <Image key={image} src={`https://srsntfksbi7e9pli.public.blob.vercel-storage.com/images/blendiq/${image}`} alt={["Finance tracker", "Appointment scheduler", "Client vault"][index]} width={360} height={640} className={`rounded-2xl border border-border shadow-xl ${index === 1 ? "-translate-y-5" : ""}`} />)}</div>
        </div>
      </section>

      <section id="book-a-class" className="qbg-section scroll-mt-24 border-t border-border bg-card/60">
        <div className="qbg-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="qbg-eyebrow">Let’s learn together</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Book a class
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Tell us what your team needs. We’ll help shape the right virtual or in-person experience.
            </p>
            <Button asChild variant="link" className="mt-2">
              <Link href="/class-pricing-guide">
                View pricing overview <ArrowRight />
              </Link>
            </Button>
          </div>
          <BookAClassSelector />
        </div>
      </section>
    </main>
  );
}

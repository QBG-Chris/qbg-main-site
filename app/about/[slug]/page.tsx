import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { getTeamMember, team } from "@/components/team/team";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() { return team.map((member) => ({ slug: member.slug })); }
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return createPageMetadata({
      title: "Team Member Not Found",
      description: "The requested Quantum Beauty Group team profile could not be found.",
      path: `/about/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${member.name}, ${member.title}`,
    description: `Meet ${member.name}, ${member.title} at Quantum Beauty Group, and learn about ${member.education.slice(0, 2).join(" and ").toLowerCase() || "their role on the team"}.`,
    path: `/about/${member.slug}`,
    noIndex: member.bio.trim().length < 80,
  });
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return notFound();

  return (
    <main className="qbg-section min-h-[75vh]">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Button asChild variant="ghost" className="mb-8"><Link href="/about"><ArrowLeft />Back to the team</Link></Button>
        <div className="grid gap-10 md:grid-cols-[240px_1fr]">
          <div>
            <div className="relative aspect-4/5 bg-transparent">
              <Image
                src={member.img}
                alt={`${member.name} headshot`}
                fill
                sizes="(min-width: 768px) 240px, 100vw"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {member.name}
            </h1>
            <p className="mt-2 font-medium text-primary">{member.title}</p>

            <p className="mt-6 whitespace-pre-line text-lg leading-8 text-muted-foreground">
              {member.bio}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-1 relative z-0">
              <Card><CardContent className="p-5"><section>
                <h2 className="font-semibold">Qualifications</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {member.education.map((e) => (
                    <li key={e} className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{e}</li>
                  ))}
                </ul>
              </section></CardContent></Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

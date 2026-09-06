import TeamCard from "@/components/team/team_card";
import { team } from "@/components/team/team";

const teamSections = ["Beauty Ambassadors", "Technical Operations"];

export default function About() {
  return (
    <main className="qbg-section min-h-screen">
      <div className="qbg-container">
        <div className="mx-auto max-w-3xl text-center"><p className="qbg-eyebrow">The people behind QBG</p><h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">Meet your team.</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">A small crew with big energy, here to help you navigate an ever-changing industry, work smarter, and keep your craft at the center.</p></div>

        {teamSections.map((section) => {
          const members = team.filter((member) => member.team === section);

          return (
            <div
              key={section}
              className="mt-20 text-center"
            >
              <h2 className="text-2xl font-bold">{section}</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member, i) => {
                  const offsetClass = i % 3 === 1 ? "sm:translate-y-12" : "";
                  return (
                    <TeamCard
                      key={member.name}
                      member={member}
                      offsetClass={offsetClass}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

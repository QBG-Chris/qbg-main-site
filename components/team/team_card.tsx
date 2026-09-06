"use client";
import Image from "next/image";
import Link from "next/link";

function TeamCard({
  member,
  offsetClass,
}: {
  member: {
    name: string;
    title: string;
    img: string;
    slug: string;
  };
  offsetClass?: string;
}) {
  return (
    <Link
      href={`/about/${member.slug}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
      className={`group relative isolate block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${offsetClass ?? ""}`}>
      <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-4/5 bg-transparent">
          <Image
            src={member.img}
            alt={`${member.name} headshot`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        {/* Basic Info */}
        <div className="relative rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border transition-shadow duration-300 group-hover:shadow-xl">
          <div className="text-base font-semibold text-foreground">
            {member.name}
          </div>
          <div className="mt-1 text-sm font-normal text-muted-foreground">
            {member.title}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TeamCard;

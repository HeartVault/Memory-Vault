"use client";

import { useMemo, useState } from "react";

type Tab = "posts" | "media" | "likes" | "about" | "tagged";

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>("posts");

  const user = useMemo(
    () => ({
      name: "Abiel Asimiea",
      username: "abielasimiea",
      verified: true,
      avatarUrl: "/images/avatar.png",
      coverUrl: "/images/cover.jpg",
      bio: "Building futuristic apps. Next.js • Mobile • AI • 3D. Turning ideas into products.",
      pronouns: "he/him",
      location: "Lagos, Nigeria",
      website: "https://example.com",
      joined: "Joined June 2024",
      stats: {
        posts: 218,
        followers: 14520,
        following: 401,
        likes: 88600,
      },
      isOwnProfile: true,
      isPrivate: false,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Glow background */}
      <div className="pointer-events-none fixed inset-0 opacity-50">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-green-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-14">
        <ProfileCover coverUrl={user.coverUrl} />

        <div className="mt-[-52px] grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main */}
          <div className="space-y-6">
            <ProfileHeaderCard user={user} />

            {user.isPrivate ? (
              <ProfilePrivacyBanner />
            ) : (
              <>
                <ProfileTabs tab={tab} setTab={setTab} />

                <div className="rounded-2xl border border-green-500/15 bg-black/40 backdrop-blur-xl">
                  <div className="p-4 sm:p-6">
                    <ProfileTabPanels tab={tab} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Sidebar (desktop) */}
          <aside className="hidden lg:block space-y-6">
            <GlowCard title="About">
              <AboutMini user={user} />
            </GlowCard>

            <GlowCard title="Mutuals">
              <MutualsPreview />
            </GlowCard>

            <GlowCard title="Featured">
              <FeaturedMedia />
            </GlowCard>

            <GlowCard title="Suggested">
              <SuggestedProfiles />
            </GlowCard>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Components ------------------------------ */

function ProfileCover({ coverUrl }: { coverUrl: string }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-green-500/15 bg-black/40">
      <div className="h-[220px] w-full bg-gradient-to-br from-[#0b0b12] via-[#06060b] to-[#02170d]">
        {/* cover image */}
        <div
          className="h-full w-full bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_55%)]" />
      </div>
    </div>
  );
}

function ProfileHeaderCard({ user }: any) {
  return (
    <div className="rounded-3xl border border-green-500/15 bg-black/40 p-4 sm:p-6 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <AvatarWithStatus src={user.avatarUrl} />

          <div className="space-y-2">
            <UserIdentity name={user.name} username={user.username} verified={user.verified} />
            <BioBlock bio={user.bio} pronouns={user.pronouns} location={user.location} />
            <ExternalLinks website={user.website} joined={user.joined} />
            <ProfileStats stats={user.stats} />
          </div>
        </div>

        {/* Right actions */}
        <ProfileActionBar isOwnProfile={user.isOwnProfile} />
      </div>
    </div>
  );
}

function AvatarWithStatus({ src }: { src: string }) {
  return (
    <div className="relative -mt-14 h-[104px] w-[104px] shrink-0">
      <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />
      <div className="relative h-full w-full rounded-full border-4 border-[#050508] bg-gradient-to-br from-green-500/40 to-transparent p-[3px]">
        <div className="h-full w-full rounded-full bg-[#07070b]">
          <div
            className="h-full w-full rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      </div>

      {/* online dot */}
      <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-400 ring-4 ring-[#050508]" />
    </div>
  );
}

function UserIdentity({
  name,
  username,
  verified,
}: {
  name: string;
  username: string;
  verified: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{name}</h1>
        {verified && (
          <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs text-green-300 border border-green-500/25">
            Verified
          </span>
        )}
      </div>
      <p className="text-sm text-white/60">@{username}</p>
    </div>
  );
}

function BioBlock({
  bio,
  pronouns,
  location,
}: {
  bio: string;
  pronouns?: string;
  location?: string;
}) {
  return (
    <div className="max-w-xl space-y-2">
      <p className="text-sm text-white/85 leading-relaxed line-clamp-3">{bio}</p>

      <div className="flex flex-wrap gap-2 text-xs text-white/60">
        {pronouns && <Chip label={pronouns} />}
        {location && <Chip label={location} />}
      </div>
    </div>
  );
}

function ExternalLinks({ website, joined }: { website?: string; joined?: string }) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {website && (
        <a
          href={website}
          className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-green-200 hover:bg-green-500/15"
        >
          {website.replace("https://", "")}
        </a>
      )}
      {joined && <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">{joined}</span>}
    </div>
  );
}

function ProfileStats({ stats }: any) {
  return (
    <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4">
      <Stat label="Posts" value={stats.posts} />
      <Stat label="Followers" value={stats.followers} />
      <Stat label="Following" value={stats.following} />
      <Stat label="Likes" value={stats.likes} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-[11px] text-white/55">{label}</p>
      <p className="text-sm font-semibold text-white">{Intl.NumberFormat().format(value)}</p>
    </div>
  );
}

function ProfileActionBar({ isOwnProfile }: { isOwnProfile: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 sm:justify-end">
      {isOwnProfile ? (
        <>
          <ButtonGhost label="Edit profile" />
          <ButtonGhost label="Share" />
          <KebabMenu />
        </>
      ) : (
        <>
          <ButtonPrimary label="Follow" />
          <ButtonGhost label="Message" />
          <KebabMenu />
        </>
      )}
    </div>
  );
}

function ProfileTabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "posts", label: "Posts" },
    { key: "media", label: "Media" },
    { key: "likes", label: "Likes" },
    { key: "about", label: "About" },
    { key: "tagged", label: "Tagged" },
  ];

  return (
    <div className="sticky top-0 z-10 rounded-2xl border border-green-500/15 bg-black/55 backdrop-blur-xl">
      <div className="flex overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={[
              "relative px-5 py-3 text-sm whitespace-nowrap transition",
              tab === t.key ? "text-green-200" : "text-white/60 hover:text-white",
            ].join(" ")}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bg-green-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfileTabPanels({ tab }: { tab: Tab }) {
  if (tab === "posts")
    return (
      <div className="space-y-5">
        <PinnedPosts />
        <FeedFilterBar />
        <PostsFeed />
      </div>
    );

  if (tab === "media") return <MediaGrid />;
  if (tab === "likes") return <LikesGrid />;
  if (tab === "about") return <AboutPanel />;
  if (tab === "tagged") return <TaggedPanel />;

  return null;
}

/* --------------------------- Tab Implementations -------------------------- */

function PinnedPosts() {
  return (
    <div className="rounded-2xl border border-green-500/15 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Pinned</p>
        <button className="text-xs text-green-300 hover:text-green-200">Manage</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <PostCard pinned />
        <PostCard pinned />
      </div>
    </div>
  );
}

function FeedFilterBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2">
        <ButtonPill label="Latest" active />
        <ButtonPill label="Top" />
      </div>

      <div className="flex gap-2">
        <ButtonPill label="Grid" />
        <ButtonPill label="Feed" active />
      </div>
    </div>
  );
}

function PostsFeed() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <PostCard key={i} />
      ))}
      <div className="py-6 text-center text-sm text-white/60">
        Loading more…
      </div>
    </div>
  );
}

function PostCard({ pinned }: { pinned?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-500/15 border border-green-500/25" />
          <div>
            <p className="text-sm font-semibold text-white">
              Abiel Asimiea {pinned && <span className="ml-2 text-xs text-green-300">• Pinned</span>}
            </p>
            <p className="text-xs text-white/55">2h • Public</p>
          </div>
        </div>
        <button className="text-white/60 hover:text-white">⋯</button>
      </div>

      <p className="mt-3 text-sm text-white/85 leading-relaxed">
        Building out the new profile UI — black & green aesthetic. Smooth, clean, futuristic.
      </p>

      {/* Media placeholder */}
      <div className="mt-3 h-[220px] w-full rounded-2xl bg-gradient-to-br from-green-500/15 via-black to-emerald-500/10 border border-green-500/10" />

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between text-xs text-white/60">
        <div className="flex gap-4">
          <button className="hover:text-green-200">❤ Like</button>
          <button className="hover:text-green-200">💬 Comment</button>
          <button className="hover:text-green-200">↗ Share</button>
        </div>
        <button className="hover:text-green-200">🔖 Save</button>
      </div>
    </div>
  );
}

function MediaGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-2xl border border-green-500/15 bg-gradient-to-br from-green-500/10 via-black to-emerald-500/10"
        />
      ))}
    </div>
  );
}

function LikesGrid() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <PostCard key={i} />
      ))}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="space-y-4">
      <Section title="Bio">
        <p className="text-sm text-white/80 leading-relaxed">
          Long-form bio goes here. This section supports full profile overview with work, education,
          interests, contact options, and achievements.
        </p>
      </Section>

      <Section title="Work">
        <ListItem title="Full-Stack Engineer" subtitle="Memory Vault • 2024 — Present" />
        <ListItem title="Mobile Engineer" subtitle="Freelance • 2023 — 2024" />
      </Section>

      <Section title="Education">
        <ListItem title="Mechatronics Engineering" subtitle="University • 2023 — Present" />
      </Section>

      <Section title="Interests">
        <div className="flex flex-wrap gap-2">
          {["AI", "Mobile", "3D", "Health Tech", "Design", "Startups"].map((x) => (
            <Chip key={x} label={x} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function TaggedPanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <p className="text-sm text-white/70">No tagged posts yet.</p>
      <p className="mt-2 text-xs text-white/50">When users tag this profile, it’ll show here.</p>
    </div>
  );
}

/* ------------------------------ Sidebar bits ----------------------------- */

function GlowCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-black/40 p-5 backdrop-blur-xl">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
      <p className="relative mb-4 text-sm font-semibold text-white">{title}</p>
      <div className="relative">{children}</div>
    </div>
  );
}

function AboutMini({ user }: any) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-white/80 line-clamp-3">{user.bio}</div>
      <div className="text-xs text-white/60">
        <p>📍 {user.location}</p>
        <p>🗓 {user.joined}</p>
      </div>
    </div>
  );
}

function MutualsPreview() {
  return (
    <div className="space-y-3">
      <div className="flex -space-x-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 w-9 rounded-full border-2 border-[#050508] bg-green-500/15" />
        ))}
      </div>
      <p className="text-xs text-white/60">Followed by <span className="text-white">3 mutuals</span></p>
    </div>
  );
}

function FeaturedMedia() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10" />
      ))}
    </div>
  );
}

function SuggestedProfiles() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-500/15 border border-green-500/25" />
            <div>
              <p className="text-sm font-semibold">User {i + 1}</p>
              <p className="text-xs text-white/55">@handle{i + 1}</p>
            </div>
          </div>
          <ButtonPill label="Follow" active />
        </div>
      ))}
    </div>
  );
}

function ProfilePrivacyBanner() {
  return (
    <div className="rounded-3xl border border-green-500/15 bg-black/40 p-8 text-center backdrop-blur-xl">
      <p className="text-base font-semibold text-white">This account is private</p>
      <p className="mt-2 text-sm text-white/60">
        Follow to see posts, media and full profile content.
      </p>
      <div className="mt-5 flex justify-center">
        <ButtonPrimary label="Request to follow" />
      </div>
    </div>
  );
}

/* ------------------------------ UI Primitives ---------------------------- */

function ButtonPrimary({ label }: { label: string }) {
  return (
    <button className="rounded-2xl bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-400 transition">
      {label}
    </button>
  );
}

function ButtonGhost({ label }: { label: string }) {
  return (
    <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition">
      {label}
    </button>
  );
}

function ButtonPill({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={[
        "rounded-full px-4 py-2 text-xs font-semibold transition",
        active
          ? "bg-green-500/15 text-green-200 border border-green-500/25"
          : "bg-white/5 text-white/65 border border-white/10 hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
      {label}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="mb-3 text-sm font-semibold text-white">{title}</p>
      {children}
    </div>
  );
}

function ListItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-3">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-white/55">{subtitle}</p>
      </div>
      <span className="text-green-300 text-xs">•</span>
    </div>
  );
}

function KebabMenu() {
  return (
    <button className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 text-white/75 hover:bg-white/10 transition">
      ⋯
    </button>
  );
}

"use client";

import { useMemo, useState } from "react";

type SocialLink = { id: string; label: string; url: string };

export default function EditProfilePage() {
  const initial = useMemo(
    () => ({
      avatarUrl: "/images/avatar.png",
      coverUrl: "/images/cover.jpg",

      name: "Abiel Asimiea",
      username: "abielasimiea",
      bio: "Building futuristic apps. Next.js • Mobile • AI • 3D.",
      pronouns: "he/him",
      location: "Lagos, Nigeria",
      website: "https://example.com",

      socials: [
        { id: "1", label: "X (Twitter)", url: "https://x.com/abiel" },
        { id: "2", label: "GitHub", url: "https://github.com/abiel" },
      ] as SocialLink[],

      interests: ["AI", "Mobile", "3D", "Startups"],

      privacy: {
        privateAccount: false,
        showActivityStatus: true,
        allowMentions: true,
        allowTagging: true,
      },
    }),
    []
  );

  const [form, setForm] = useState(initial);
  const [dirty, setDirty] = useState(false);

  const setField = (key: string, value: any) => {
    setDirty(true);
    setForm((p) => ({ ...p, [key]: value }));
  };

  const setPrivacy = (key: string, value: boolean) => {
    setDirty(true);
    setForm((p) => ({ ...p, privacy: { ...p.privacy, [key]: value } }));
  };

  const maxBio = 160;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 opacity-45">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-green-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 pb-28">
        <Header />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Main */}
          <main className="space-y-6">
            <GlowSection title="Profile media">
              <ProfileMediaEditor
                avatarUrl={form.avatarUrl}
                coverUrl={form.coverUrl}
                onChangeAvatar={(url) => setField("avatarUrl", url)}
                onChangeCover={(url) => setField("coverUrl", url)}
              />
            </GlowSection>

            <GlowSection title="Basic info">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  value={form.name}
                  onChange={(v) => setField("name", v)}
                  placeholder="Your name"
                />
                <TextField
                  label="Username"
                  value={form.username}
                  onChange={(v) => setField("username", v)}
                  placeholder="username"
                  prefix="@"
                  hint="This is your public handle."
                />
                <TextField
                  label="Pronouns"
                  value={form.pronouns}
                  onChange={(v) => setField("pronouns", v)}
                  placeholder="e.g. he/him"
                  hint="Optional"
                />
                <TextField
                  label="Location"
                  value={form.location}
                  onChange={(v) => setField("location", v)}
                  placeholder="City, Country"
                  hint="Optional"
                />

                <div className="sm:col-span-2">
                  <TextField
                    label="Website"
                    value={form.website}
                    onChange={(v) => setField("website", v)}
                    placeholder="https://..."
                    hint="Displayed on your profile."
                  />
                </div>

                <div className="sm:col-span-2">
                  <TextArea
                    label="Bio"
                    value={form.bio}
                    onChange={(v) => setField("bio", v.slice(0, maxBio))}
                    placeholder="Tell people who you are..."
                    counter={`${form.bio.length}/${maxBio}`}
                    hint="Keep it short and sharp."
                  />
                </div>
              </div>
            </GlowSection>

            <GlowSection title="Social links">
              <SocialLinksEditor
                links={form.socials}
                onChange={(links) => {
                  setDirty(true);
                  setForm((p) => ({ ...p, socials: links }));
                }}
              />
            </GlowSection>

            <GlowSection title="Interests">
              <InterestsEditor
                selected={form.interests}
                onChange={(arr) => setField("interests", arr)}
              />
            </GlowSection>

            <GlowSection title="Privacy & safety">
              <div className="space-y-3">
                <ToggleRow
                  title="Private account"
                  desc="Only approved followers can see your posts."
                  checked={form.privacy.privateAccount}
                  onChange={(v) => setPrivacy("privateAccount", v)}
                />
                <ToggleRow
                  title="Show activity status"
                  desc="Let others see when you’re online."
                  checked={form.privacy.showActivityStatus}
                  onChange={(v) => setPrivacy("showActivityStatus", v)}
                />
                <ToggleRow
                  title="Allow mentions"
                  desc="Users can mention you in posts/comments."
                  checked={form.privacy.allowMentions}
                  onChange={(v) => setPrivacy("allowMentions", v)}
                />
                <ToggleRow
                  title="Allow tagging"
                  desc="Users can tag you in media."
                  checked={form.privacy.allowTagging}
                  onChange={(v) => setPrivacy("allowTagging", v)}
                />
              </div>
            </GlowSection>

            <GlowSection title="Danger zone" danger>
              <div className="space-y-3">
                <DangerRow
                  title="Deactivate account"
                  desc="Temporarily disable your account. You can come back anytime."
                  action="Deactivate"
                />
                <DangerRow
                  title="Delete account"
                  desc="Permanently delete your account and data. This can’t be undone."
                  action="Delete"
                />
              </div>
            </GlowSection>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            <GlowCard title="Preview">
              <ProfilePreviewCard form={form} />
            </GlowCard>

            <GlowCard title="Account">
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-center justify-between">
                  <span>Email</span>
                  <span className="text-white/90">test@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone</span>
                  <span className="text-white/90">Not set</span>
                </div>
                <button className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">
                  Manage login & security
                </button>
              </div>
            </GlowCard>
          </aside>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <SaveBar dirty={dirty} onReset={() => { setForm(initial); setDirty(false); }} />
    </div>
  );
}

/* ------------------------------ Page Header ------------------------------ */

function Header() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit profile</h1>
        <p className="mt-1 text-sm text-white/60">
          Update how your profile looks to others.
        </p>
      </div>

      <div className="flex gap-2">
        <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition">
          Cancel
        </button>
        <button className="rounded-2xl bg-green-500 px-4 py-2 text-sm font-semibold text-black hover:bg-green-400 transition">
          Save changes
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Sections ------------------------------ */

function GlowSection({
  title,
  children,
  danger,
}: {
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <section
      className={[
        "rounded-3xl border bg-black/40 p-4 sm:p-6 backdrop-blur-xl",
        danger ? "border-red-500/20" : "border-green-500/15",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{title}</p>
        {!danger && (
          <span className="rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-[11px] text-green-200">
            Settings
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function GlowCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-black/40 p-5 backdrop-blur-xl">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-green-500/15 blur-3xl" />
      <p className="relative mb-4 text-sm font-semibold text-white">{title}</p>
      <div className="relative">{children}</div>
    </div>
  );
}

/* --------------------------- Profile Media Editor -------------------------- */

function ProfileMediaEditor({
  avatarUrl,
  coverUrl,
  onChangeAvatar,
  onChangeCover,
}: {
  avatarUrl: string;
  coverUrl: string;
  onChangeAvatar: (url: string) => void;
  onChangeCover: (url: string) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Cover */}
      <div className="relative overflow-hidden rounded-3xl border border-green-500/15 bg-black/50">
        <div
          className="h-[190px] w-full bg-cover bg-center opacity-75"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={() => onChangeCover("/images/cover.jpg")}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
          >
            Change cover
          </button>
          <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">
            Remove
          </button>
        </div>
      </div>

      {/* Avatar row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl" />
            <div className="relative h-full w-full rounded-full border border-green-500/25 bg-green-500/10 p-1">
              <div
                className="h-full w-full rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${avatarUrl})` }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Profile photo</p>
            <p className="text-xs text-white/60">
              Recommended: square image, at least 400×400.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onChangeAvatar("/images/avatar.png")}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Upload new
          </button>
          <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Fields -------------------------------- */

function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  prefix?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between">
        <label className="text-xs font-semibold text-white/80">{label}</label>
        {hint && <span className="text-[11px] text-white/45">{hint}</span>}
      </div>

      <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-3 focus-within:border-green-500/30">
        {prefix && <span className="mr-2 text-sm text-white/40">{prefix}</span>}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </div>
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  counter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  counter?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between">
        <label className="text-xs font-semibold text-white/80">{label}</label>
        <div className="flex items-center gap-2">
          {hint && <span className="text-[11px] text-white/45">{hint}</span>}
          {counter && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] text-white/55">
              {counter}
            </span>
          )}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[110px] w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-green-500/30"
      />
    </div>
  );
}

/* -------------------------- Social Links Editor -------------------------- */

function SocialLinksEditor({
  links,
  onChange,
}: {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}) {
  const addLink = () => {
    const id = crypto.randomUUID();
    onChange([...links, { id, label: "Website", url: "" }]);
  };

  const updateLink = (id: string, key: "label" | "url", value: string) => {
    onChange(links.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const removeLink = (id: string) => onChange(links.filter((l) => l.id !== id));

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <div
          key={link.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr_auto] sm:items-center">
            <select
              value={link.label}
              onChange={(e) => updateLink(link.id, "label", e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-green-500/30"
            >
              <option>Website</option>
              <option>X (Twitter)</option>
              <option>Instagram</option>
              <option>TikTok</option>
              <option>LinkedIn</option>
              <option>GitHub</option>
              <option>YouTube</option>
            </select>

            <input
              value={link.url}
              onChange={(e) => updateLink(link.id, "url", e.target.value)}
              placeholder="https://..."
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-green-500/30"
            />

            <button
              onClick={() => removeLink(link.id)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-white hover:bg-white/10"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addLink}
        className="w-full rounded-2xl border border-green-500/25 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-200 hover:bg-green-500/15 transition"
      >
        + Add social link
      </button>
    </div>
  );
}

/* ---------------------------- Interests Editor --------------------------- */

function InterestsEditor({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (arr: string[]) => void;
}) {
  const all = [
    "AI",
    "Mobile",
    "3D",
    "Design",
    "Health Tech",
    "Startups",
    "Photography",
    "Basketball",
    "Anime",
    "Gaming",
    "Fintech",
  ];

  const toggle = (item: string) => {
    if (selected.includes(item)) onChange(selected.filter((x) => x !== item));
    else onChange([...selected, item]);
  };

  return (
    <div>
      <p className="text-xs text-white/60 mb-3">
        Pick a few interests — helps with discovery and suggestions.
      </p>

      <div className="flex flex-wrap gap-2">
        {all.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              onClick={() => toggle(item)}
              className={[
                "rounded-full px-4 py-2 text-xs font-semibold transition border",
                active
                  ? "bg-green-500/15 text-green-200 border-green-500/25"
                  : "bg-white/5 text-white/65 border-white/10 hover:bg-white/10",
              ].join(" ")}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Toggles -------------------------------- */

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-white/60">{desc}</p>
      </div>

      <button
        onClick={() => onChange(!checked)}
        className={[
          "relative h-7 w-12 rounded-full border transition",
          checked
            ? "bg-green-500/20 border-green-500/30"
            : "bg-white/10 border-white/10",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-5 w-5 rounded-full transition",
            checked ? "left-6 bg-green-400" : "left-1 bg-white/60",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

/* ------------------------------ Danger Zone ------------------------------ */

function DangerRow({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/60">{desc}</p>
      </div>
      <button className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/15">
        {action}
      </button>
    </div>
  );
}

/* ------------------------------ Preview Card ----------------------------- */

function ProfilePreviewCard({ form }: any) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div
        className="h-24 w-full bg-cover bg-center opacity-85"
        style={{ backgroundImage: `url(${form.coverUrl})` }}
      />
      <div className="px-4 pb-4">
        <div className="-mt-8 flex items-end justify-between">
          <div className="h-16 w-16 rounded-full border-4 border-[#050508] bg-green-500/15" />
          <span className="rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-[11px] text-green-200">
            Preview
          </span>
        </div>

        <p className="mt-3 text-sm font-semibold">{form.name}</p>
        <p className="text-xs text-white/55">@{form.username}</p>

        <p className="mt-2 text-xs text-white/70 line-clamp-3">{form.bio}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {form.interests.slice(0, 4).map((x: string) => (
            <span
              key={x}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
            >
              {x}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Save Bar ------------------------------ */

function SaveBar({
  dirty,
  onReset,
}: {
  dirty: boolean;
  onReset: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div
          className={[
            "rounded-3xl border backdrop-blur-xl px-4 py-4 sm:px-6",
            dirty
              ? "border-green-500/20 bg-black/55"
              : "border-white/10 bg-black/35 opacity-70",
          ].join(" ")}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold">
                {dirty ? "Unsaved changes" : "All changes saved"}
              </p>
              <p className="text-xs text-white/60">
                {dirty
                  ? "Save your updates or discard them."
                  : "Your profile is up to date."}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={onReset}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Discard
              </button>
              <button
                disabled={!dirty}
                className={[
                  "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                  dirty
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-white/10 text-white/40 cursor-not-allowed",
                ].join(" ")}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Regenerates data/fleet.json from the warden's fleet-health.md.
// Usage: node gen-data.mjs [path-to-fleet-health.md]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2] || path.join(process.env.USERPROFILE || process.env.HOME, '.claude/state/fleet-health.md');
const text = fs.readFileSync(src, 'utf8');

const DEPTS = [
  { id: 'revenue',  label: 'REVENUE',  hue: 42,  tagline: 'money in, fires staged' },
  { id: 'content',  label: 'CONTENT',  hue: 320, tagline: 'channels, reels, the diary' },
  { id: 'hunt',     label: 'HUNT',     hue: 190, tagline: 'jobs, grants, luck, rooms' },
  { id: 'senses',   label: 'SENSES',   hue: 150, tagline: 'screen, phone, city, weather' },
  { id: 'self',     label: 'SELF',     hue: 45,  tagline: 'the loop that sharpens the loop' },
  { id: 'empire',   label: 'EMPIRE',   hue: 265, tagline: 'goals, oaths, discoveries' },
  { id: 'bridge',   label: 'BRIDGE',   hue: 12,  tagline: 'the two-way line to Marco' },
  { id: 'markets',  label: 'MARKETS',  hue: 220, tagline: 'odds watched, never fired' },
];

// name-pattern → dept
const MAP = [
  [/Affiliate|Merch|Money|Profit|WarPlan|Spend|Hundred|Aurum|Bursary|StageBatch|LiveFire|FiresGrade|FloorGuard|FinanceHQ/i, 'revenue'],
  [/Channel|Content|Diary|IgStory|IgVoice|IgLocal|IgDeep|IgHealth|IgDmTriage|SocialWatch|NycTechWeekly|PublishPublic|StoryFire|GpuTranscribe|ConvoDaily/i, 'content'],
  [/JobHunt|AtsHunt|BoardScan|ApplyQueue|HuntTick|LinkedInJobs|Luck|EVRoom|ScoutRefresh|MarketCatalog/i, 'hunt'],
  [/ScreenActivity|PocketSentinel|NycScout|Weather|MorningBrief|PhoneLedger|HotPot|Wifi/i, 'senses'],
  [/SelfTick|SelfEval|FleetWarden|OutcomeWitness|Entropy|ResearchTick|ForgetSweep|LedgerRotate|Reaper$|RelayReap|KeepAlive|Liveness|WakeLock|CrowResident|CrowUnsealed|GoalMatrix|Strategist$|SkillForge|SharpEngine|BotEvolve|AlwaysOn|LaptopResident|OmniLoop|Daily0800/i, 'self'],
  [/Empire|Eden|Oath|Discovery|Oracle|Sovereign/i, 'empire'],
  [/Telegram|Hermes|18M24|Iadola|MarcoOperator|SubBridge|JarvisMiniLoop|Relay|CdpRelay|OpenClaw|AgentControlPlane/i, 'bridge'],
  [/WC|Poly|Parlay|Crypto|JumpScalper|MarketWatch|Clv/i, 'markets'],
];

// hand-written "replaces" lines for the flagships; the card hides the line when absent
const REPLACES = {
  ClaudeFleetWarden: 'an SRE on-call — audits, heals and restarts 144 scheduled lanes every 15 minutes',
  ClaudeSelfTick: 'a weekly retro — reads its own telemetry and ships one self-improvement daily at 05:20',
  ClaudeOutcomeWitness: 'a project manager checking claims — verifies each "shipped" against commits, deploys and Stripe',
  ClaudeIgDmTriage: 'a social media assistant — triages Instagram DMs every morning, drafts gated replies',
  ClaudeSocialWatch: 'a social analyst — snapshots five platforms every 6 hours',
  ClaudeMorningBrief: 'a chief of staff — one 08:30 brief with everything that moved overnight',
  ClaudeNycScout: 'a city concierge — an 11pm email with tomorrow’s NYC itinerary',
  ClaudeJobHunt: 'a recruiter working nights — finds, scores and queues applications 24/7',
  ClaudeBoardScan: 'a job-board crawler — 801 boards on a 30-minute tick, ATS JSON not LinkedIn',
  ClaudeContentEngine: 'a content team — drafts, schedules and grades platform-native posts',
  ClaudeWarPlanLoop: 'a founder’s conscience — stages armed launches, never sends without Marco',
  ClaudeAffiliateTick: 'a growth intern — keeps the affiliate funnel measured and warm',
  CrowResident: 'presence — a resident process that answers as the house AI every 10 minutes',
  ClaudeTelegramBridge: 'a pocket assistant — the phone-side line into everything here',
  HermesBot: 'a peer operator — a second AI with its own memory who takes positions',
  ClaudeResearchTick: 'a research week — one self-directed experiment every Sunday, verdict required',
  ClaudeEntropyScan: 'a janitor with taste — archives orphans before they rot the workspace',
  ClaudeEmpireTick: 'an ops director — drives a 20-goal life portfolio forward daily',
  ClaudeMerchBridge: 'a store manager — watches the merch reserve rail',
  ClaudeLuckScanner: 'a scholarship office — 100+ keyless opportunities a day',
  ClaudePocketSentinel: 'attention triage — perceives every 30 min, taps Marco only at signal ≥ 7',
  ClaudeWeatherOracle: 'looking out the window, but at 6am and in writing',
};

const CADENCE = {
  ClaudeFleetWarden: 'every 15 min', ClaudeSelfTick: 'daily 05:20', CrowResident: 'every 10 min',
  ClaudeSocialWatch: 'every 6 h', ClaudeIgDmTriage: 'daily 07:45', ClaudeMorningBrief: 'daily 08:30',
  ClaudeNycScout: 'daily 22:45', ClaudeResearchTick: 'weekly Sun 06:00', ClaudeBoardScan: 'every 30 min',
  ClaudeIgLocalTick: 'every 15 min',
};

const lines = text.split('\n').filter(l => /^- [✓·] /.test(l.trim()) || /^- \*\*/.test(l.trim()));
const nodes = [];
for (const raw of lines) {
  const m = raw.trim().match(/^- ([✓·]) (\S[^—]*?) — (.+)$/);
  if (!m) continue;
  const [, mark, name, result] = m;
  const dept = (MAP.find(([re]) => re.test(name)) || [null, 'self'])[1];
  let status;
  if (/STILL_RUNNING|\(running\)/.test(result)) status = 'running';
  else if (mark === '✓' && /^OK/.test(result)) status = 'ok';
  else if (mark === '✓') status = 'flag';
  else if (/TERMINATED|NEVER_RAN/.test(result)) status = 'dormant';
  else status = 'flag';
  nodes.push({
    id: name.trim(),
    label: name.trim().replace(/^Claude/, '').replace(/([a-z])([A-Z])/g, '$1 $2'),
    dept, status,
    detail: result.trim(),
    ...(CADENCE[name.trim()] ? { cadence: CADENCE[name.trim()] } : {}),
    ...(REPLACES[name.trim()] ? { replaces: REPLACES[name.trim()] } : {}),
    mass: REPLACES[name.trim()] ? 3 : status === 'dormant' ? 1 : 2,
  });
}

const exported = (text.match(/Fleet health — ([0-9T:.\-Z]+)/) || [])[1] || null;
const fleet = {
  meta: {
    title: 'ORRERY',
    subtitle: 'a live map of a one-person AI company',
    operator: 'Marco Hergi · NYC',
    exported,
    source: 'warden fleet-health',
  },
  departments: DEPTS,
  nodes,
};
fs.writeFileSync(path.join(here, 'data/fleet.json'), JSON.stringify(fleet, null, 1));
const c = s => nodes.filter(n => n.status === s).length;
console.log(`nodes ${nodes.length} · ok ${c('ok')} · running ${c('running')} · flag ${c('flag')} · dormant ${c('dormant')}`);

// Regenerates data/fleet.json from the warden's fleet-health.md.
// Usage: node gen-data.mjs [path-to-fleet-health.md]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2] || path.join(process.env.USERPROFILE || process.env.HOME, '.claude/state/fleet-health.md');
const text = fs.readFileSync(src, 'utf8');

const DEPTS = [
  { id: 'revenue',  label: 'REVENUE',        hue: 28,  tagline: 'money in, fires staged' },
  { id: 'content',  label: 'MARKETING',      hue: 285, tagline: 'channels, reels, the diary' },
  { id: 'hunt',     label: 'GROWTH',         hue: 175, tagline: 'jobs, grants, luck, rooms' },
  { id: 'senses',   label: 'DATA',           hue: 150, tagline: 'screen, phone, city, weather' },
  { id: 'self',     label: 'OPERATIONS',     hue: 48,  tagline: 'the loop that sharpens the loop' },
  { id: 'empire',   label: 'STRATEGY',       hue: 260, tagline: 'goals, oaths, discoveries' },
  { id: 'bridge',   label: 'COMMUNICATIONS', hue: 12,  tagline: 'the two-way line to Marco' },
  { id: 'markets',  label: 'FINANCE',        hue: 210, tagline: 'odds watched, never fired' },
];

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

// checkpoints: real functional groups inside each zone, matched on lane names.
// order matters — first match wins; 'field' is the catch-all per zone.
const GROUPS = {
  revenue: [
    ['war-room',   /WarPlan|StageBatch|LiveFire|FiresGrade|FloorGuard/i, 'stages armed launches; nothing sends itself'],
    ['storefronts',/Merch|Affiliate|Aurum|Bursary/i,                     'the shops and funnels that face the world'],
    ['treasury',   /Spend|Money|Profit|Hundred|FinanceHQ/i,             'watches every dollar in and out'],
  ],
  content: [
    ['instagram',  /Ig[A-Z]/,                                            'the IG operation — triage, stories, health, analytics'],
    ['the-diary',  /Channel|Diary|Content|Story|GpuTranscribe/i,         'A NEW YORK DIARY and the channels around it'],
    ['newsroom',   /NycTechWeekly|PublishPublic|SocialWatch|Convo/i,     'publications and the social listening desk'],
  ],
  hunt: [
    ['job-engine', /JobHunt|AtsHunt|BoardScan|ApplyQueue|HuntTick|LinkedInJobs/i, '801 boards on a 30-minute tick'],
    ['fortune',    /Luck|EVRoom|ScoutRefresh|MarketCatalog/i,            'grants, contests, rooms, found money'],
  ],
  senses: [
    ['eyes',       /ScreenActivity|PocketSentinel/i,                     'watches the screen and taps only at signal'],
    ['the-city',   /NycScout|Weather/i,                                  'NYC itineraries and the sky above them'],
    ['the-pocket', /PhoneLedger|MorningBrief/i,                          'the phone-side pulse and the 08:30 brief'],
    ['the-house',  /HotPot|Wifi/i,                                       'keeps the home network breathing'],
  ],
  self: [
    ['healing',    /FleetWarden|Reaper|RelayReap|KeepAlive|Liveness|WakeLock|AlwaysOn|Daily0800/i, 'audits, restarts, resurrects — the immune system'],
    ['learning',   /SelfTick|SelfEval|ResearchTick|SkillForge|SharpEngine|BotEvolve/i, 'reads its own telemetry and ships improvements'],
    ['memory',     /Entropy|Forget|LedgerRotate/i,                       'archives, forgets, rotates — hygiene of the mind'],
    ['presence',   /Crow|LaptopResident|OmniLoop/i,                      'the resident that answers as the house AI'],
    ['truth',      /OutcomeWitness|GoalMatrix|Strategist/i,              'verifies claims against reality'],
  ],
  empire: [
    ['portfolio',  /Empire/i,                                            'drives the 20-goal life portfolio'],
    ['civilizations', /Eden|Oath|Discovery/i,                            'EDEN, OATH — the invented worlds lane'],
    ['oracles',    /Oracle|Sovereign/i,                                  'graded predictions and the frozen sovereign'],
  ],
  bridge: [
    ['telegram',   /Telegram/i,                                          'the pocket line — brief, watchdog, two-way'],
    ['hermes',     /Hermes/i,                                            'the peer operator with his own memory'],
    ['operators',  /18M24|Iadola|MarcoOperator|Jarvis/i,                 'always-on operators with faces and ledgers'],
    ['relays',     /Relay|Cdp|SubBridge|OpenClaw|AgentControlPlane/i,    'the plumbing every hand reaches through'],
  ],
  markets: [
    ['world-cup',  /WC/i,                                                'WC26 edges — watched, never auto-fired'],
    ['polymarket', /Poly|Parlay|Clv/i,                                   'odds scanners and graded closes'],
    ['crypto',     /Crypto|JumpScalper/i,                                'paper swarms and a retired scalper'],
  ],
};

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
  ClaudeIgStoryPost: 'a stories editor — keeps the story slot warm from a graded pool',
  ClaudeIadolaBriefs: 'an IG growth analyst — daily briefs from real per-post follow data',
  ClaudeNycTechWeekly: 'a newsletter staff — the NYC tech index, sourced and probed before send',
};

const CADENCE = {
  ClaudeFleetWarden: 'every 15 min', ClaudeSelfTick: 'daily 05:20', CrowResident: 'every 10 min',
  ClaudeSocialWatch: 'every 6 h', ClaudeIgDmTriage: 'daily 07:45', ClaudeMorningBrief: 'daily 08:30',
  ClaudeNycScout: 'daily 22:45', ClaudeResearchTick: 'weekly Sun 06:00', ClaudeBoardScan: 'every 30 min',
  ClaudeIgLocalTick: 'every 15 min',
};

const lines = text.split('\n').filter(l => /^- [✓·✗] /.test(l.trim()));
const nodes = [];
for (const raw of lines) {
  const m = raw.trim().match(/^- ([✓·✗]) (\S[^—]*?) — (.+)$/);
  if (!m) continue;
  const [, mark, name, result] = m;
  const id = name.trim();
  const dept = (MAP.find(([re]) => re.test(id)) || [null, 'self'])[1];
  const groupDef = (GROUPS[dept] || []).find(([, re]) => re.test(id));
  const group = groupDef ? groupDef[0] : 'field';
  let status;
  if (mark === '✗') status = 'flag';
  else if (/STILL_RUNNING|\(running\)/.test(result)) status = 'running';
  else if (mark === '✓' && /^OK/.test(result)) status = 'ok';
  else if (mark === '✓') status = 'flag';
  else if (/TERMINATED|NEVER_RAN/.test(result)) status = 'dormant';
  else status = 'flag';
  nodes.push({
    id,
    label: id.replace(/^Claude/, '').replace(/([a-z])([A-Z])/g, '$1 $2'),
    dept, group, status,
    detail: result.trim(),
    ...(CADENCE[id] ? { cadence: CADENCE[id] } : {}),
    ...(REPLACES[id] ? { replaces: REPLACES[id] } : {}),
    mass: REPLACES[id] ? 3 : status === 'dormant' ? 1 : 2,
  });
}

// group directory with blurbs (only groups that actually have members)
const groups = [];
for (const d of DEPTS) {
  const defs = GROUPS[d.id] || [];
  const present = new Set(nodes.filter(n => n.dept === d.id).map(n => n.group));
  for (const [gid, , blurb] of defs) if (present.has(gid)) groups.push({ id: gid, dept: d.id, label: gid.replace(/-/g, ' '), blurb });
  if (present.has('field')) groups.push({ id: 'field', dept: d.id, label: 'field', blurb: 'unassigned lanes doing their own quiet work' });
}

const exported = (text.match(/Fleet health — ([0-9T:.\-Z]+)/) || [])[1] || null;
const fleet = {
  meta: {
    title: 'AI COMMAND CENTER',
    subtitle: 'one company · run live by autonomous AI agents',
    operator: 'Marco Hergi · NYC',
    exported,
    source: 'warden fleet-health',
  },
  departments: DEPTS,
  groups,
  nodes,
};
fs.writeFileSync(path.join(here, 'data/fleet.json'), JSON.stringify(fleet, null, 1));
const c = s => nodes.filter(n => n.status === s).length;
console.log(`nodes ${nodes.length} · groups ${groups.length} · ok ${c('ok')} · running ${c('running')} · flag ${c('flag')} · dormant ${c('dormant')}`);

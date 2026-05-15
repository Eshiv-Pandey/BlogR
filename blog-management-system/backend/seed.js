/**
 * BlogR Seed Script
 * Usage: node seed.js
 * Make sure MONGODB_URI is set in backend/.env before running.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not set in .env');
  process.exit(1);
}

// Reliable Unsplash image URLs (pre-sized, no API key needed)
const posts = [
  {
    title: 'The Future of AI in Everyday Software Development',
    authorName: 'Arjun Mehta',
    email: 'arjunmehta@techblog.com',
    category: 'Technology',
    tags: ['AI', 'machine learning', 'development', 'future'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    shortDescription: 'Artificial intelligence is no longer a distant concept. From code completion to automated testing, AI tools are rewriting how developers build software in 2025.',
    content: `Artificial intelligence has quietly become one of the most transformative forces in modern software development. Just a few years ago, the idea of an AI writing production-ready code seemed like science fiction. Today, tools like GitHub Copilot, Cursor, and dozens of others have become standard fixtures in developer workflows.

The shift is not just about autocomplete. AI systems now assist with architecture decisions, generate test cases, spot security vulnerabilities, and even explain complex legacy code in plain English. This changes the kind of skills developers need to cultivate.

The most effective engineers today are not those who memorize syntax, but those who can direct AI tools with precision, review outputs critically, and understand the underlying systems deeply enough to catch errors.

Looking ahead, the integration will only deepen. Models trained on entire codebases will be able to reason across files, understand business logic, and make holistic refactoring suggestions. The developer's role is evolving from author to editor, from coder to architect.

The future belongs to developers who embrace this shift rather than resist it. Learning to collaborate with AI effectively may become the single most important skill a programmer can develop in the coming decade.`,
  },
  {
    title: 'Design Systems That Scale: Lessons from Building at 10x',
    authorName: 'Priya Sharma',
    email: 'priyasharma@designcraft.io',
    category: 'Design',
    tags: ['design system', 'UI', 'scalability', 'component library'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    shortDescription: 'Building a design system is easy. Building one that survives rapid team growth, multiple products, and shifting brand guidelines is an entirely different challenge.',
    content: `A design system is only as good as the team that maintains it. Many organizations discover this truth the hard way, after investing months building a comprehensive component library, only to find it crumbling under the weight of rapid scale.

The first mistake most teams make is building for today rather than for tomorrow. A system designed for a single product with one team quickly becomes a liability when a second product launches, when the brand refreshes, or when the team doubles in size.

Successful design systems share three qualities: they are built on strong foundations, they are relentlessly documented, and they have a dedicated owner or team.

Strong foundations mean tokens before components. Color, typography, spacing, and motion defined as variables create a single source of truth that can propagate changes instantly across an entire product. Skipping this step means every brand update requires manual changes across hundreds of components.

Documentation is where most systems fail. A component that exists without clear guidance on when and how to use it creates inconsistency rather than solving it. The best systems treat documentation as a product in itself, with examples, do/don't comparisons, and rationale for decisions.

Finally, a design system without an owner dies. Someone must champion its adoption, triage issues, coordinate with engineering, and communicate changes. Treating the system as a shared responsibility often means it becomes no one's responsibility.`,
  },
  {
    title: 'Building a Profitable SaaS in 12 Weeks: A Founder Blueprint',
    authorName: 'Rohan Kapoor',
    email: 'rohan@founderspath.com',
    category: 'Business',
    tags: ['SaaS', 'startup', 'entrepreneurship', 'product'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    shortDescription: 'Most SaaS advice focuses on raising funding. This post is about building something people pay for before you write a single line of code.',
    content: `The most common mistake first-time SaaS founders make is building before validating. They spend three months building a product, launch it, and then discover that nobody wants what they built. The solution is deceptively simple: validate before you build.

Week one through two should be entirely research. Talk to potential customers. Not surveys, not forms, but actual conversations. Ask about their current workflows, where they lose time, what they have tried to solve the problem, and what they currently pay for adjacent tools.

By week three, you should have a clear problem statement and a list of people who have expressed genuine interest. A waiting list of fifty people who leave their email willingly is worth more than a thousand survey responses.

Weeks four through six are for a minimum sellable product. Not a minimum viable product. Something you can charge for on day one. This constraint forces clarity. You cannot hide behind features that are coming soon.

From week seven onward, your only job is to get those waitlist users to pay. Charge before the product is fully polished. Early customers who pay through early friction become your most loyal advocates.

Revenue before product-market fit sounds counterintuitive. It is actually the fastest feedback loop available. Money tells you whether you have solved something real in a way that nothing else can.`,
  },
  {
    title: 'Slow Mornings: The Productivity Ritual Nobody Talks About',
    authorName: 'Sneha Iyer',
    email: 'snehaiyer@mindfulbytes.com',
    category: 'Lifestyle',
    tags: ['productivity', 'morning routine', 'mindfulness', 'habits'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    shortDescription: 'In a world obsessed with 5 AM wake-ups and packed morning routines, there is a compelling case for doing less in your first hour and achieving more for the rest of the day.',
    content: `Every productivity influencer will tell you to wake up at 5 AM, exercise, journal, meditate, read, and cold plunge before your first meeting. What they rarely discuss is the anxiety that comes from failing to execute this perfect morning every single day.

The slow morning is a different philosophy. It begins with the simple acknowledgment that your brain requires time to shift from sleep to peak cognitive function, and that forcing that transition artificially may actually impair the deep thinking you need later.

A slow morning looks different for everyone, but it shares a few qualities. There are no screens for at least thirty minutes after waking. There is no checking of email, messages, or news. There is something warm to drink, consumed without multitasking.

The first thirty to sixty minutes belong entirely to low-stakes activity. Walking without headphones. A few pages of a physical book. Sitting on a porch. Writing in a notebook without a specific goal.

What happens in this space is the mind naturally begins to process and organize. Problems that felt stuck the night before often resolve themselves. Creative connections form without effort. Priorities clarify.

By the time you sit down to work, you are not exhausted by your own routine. You arrive at your work rested, clear, and genuinely ready. That quality of arrival turns out to matter far more than how many habits you completed before 7 AM.`,
  },
  {
    title: 'Web Performance in 2025: Core Web Vitals and Beyond',
    authorName: 'Karthik Balasubramanian',
    email: 'karthik@perfmatters.dev',
    category: 'Technology',
    tags: ['performance', 'web vitals', 'LCP', 'optimization'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    shortDescription: 'Google keeps raising the bar on web performance metrics. Here is what actually matters in 2025 and how to optimize for real user experience, not just lighthouse scores.',
    content: `Core Web Vitals have moved from recommendation to ranking signal, and the ecosystem of tooling around them has matured significantly. But many teams are still optimizing for the wrong things, chasing lighthouse scores rather than addressing the actual experience of real users on real devices.

The distinction matters enormously. A lighthouse score is measured on a simulated mid-range device on a simulated network. Real users span a spectrum from the latest iPhone on WiFi to a three-year-old Android on a congested 4G connection. Optimizing for the former while ignoring the latter is common and costly.

Largest Contentful Paint remains the most impactful metric to optimize for user perception. Images are almost always the culprit. The combination of next-generation formats like AVIF and WebP, responsive srcset attributes, and proper lazy loading strategies addresses the majority of LCP problems.

Interaction to Next Paint replaced First Input Delay as a metric because FID only captured a single interaction. INP measures every interaction throughout the session. Long tasks on the main thread are the primary enemy here. Code splitting, deferred non-critical JavaScript, and moving computation off the main thread using workers all contribute meaningfully.

The overlooked metric is Cumulative Layout Shift. Nothing breaks user trust faster than content jumping as they are about to tap. Explicit dimensions on images and embeds, font-display strategies, and avoiding late-loading dynamic content solve most CLS issues.

Performance is not a one-time project. It requires ongoing monitoring, clear ownership, and a culture that treats user experience metrics as first-class concerns alongside feature velocity.`,
  },
  {
    title: 'Typography in UI Design: The Rules You Can Break',
    authorName: 'Ananya Krishnan',
    email: 'ananyak@typecraft.com',
    category: 'Design',
    tags: ['typography', 'fonts', 'UI design', 'readability'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    shortDescription: 'Typography has rules. It also has conventions that look dated, constraints that stifle creativity, and assumptions about reading behavior that modern research has overturned.',
    content: `Every junior designer learns the rules of typography early. Use a type scale. Limit your palette to two typefaces. Keep body text between 16 and 18 pixels. Never set text in all caps for long passages. Maintain a minimum contrast ratio of 4.5 to 1.

These rules exist for good reasons. They encode decades of research into readability, legibility, and visual hierarchy. Following them consistently produces work that is competent and accessible.

But competent is not always the goal. Memorable, distinctive, and expressive sometimes demand breaking the rules deliberately and skillfully.

Mixing more than two typefaces is a rule worth reconsidering. The constraint made sense when typeface menus were short and navigating them was cumbersome. Today, with variable fonts and large libraries, combining three or even four typefaces with genuine intentionality can create richness and personality that two-typeface combinations cannot achieve.

The 16 pixel minimum for body text was calibrated for desktop screens with lower pixel density. On modern high-DPI displays and particularly on mobile, 15 pixels rendered at high resolution is often more legible than 16 pixels on an older screen.

All-caps has a legitimate place beyond short labels and buttons. Editorial design has used all-caps body text for pullquotes, introductory paragraphs, and architectural elements in layouts where rhythm and formality matter more than raw reading speed.

The rules are a starting point, not a ceiling. The best typographers understand them deeply enough to know exactly which ones to break and why.`,
  },
  {
    title: 'Remote Team Culture: Building Trust Across Time Zones',
    authorName: 'Vikram Nair',
    email: 'vikramnair@remoteworks.io',
    category: 'Business',
    tags: ['remote work', 'team culture', 'leadership', 'async'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1200&q=80',
    shortDescription: 'Trust is the foundation of every high-performing team. Building it across different time zones, cultures, and communication styles requires intentionality that office environments provide by default.',
    content: `Office culture creates trust as a byproduct of proximity. You see how your colleagues operate under pressure. You overhear conversations that give you context. You share meals, hallways, and small moments that compound into genuine relationships. Remote teams get none of this for free.

This does not mean trust cannot form in remote teams. It means it must be engineered rather than assumed.

The first principle is documentation as culture. In offices, context lives in the heads of people who walk the same floor. In distributed teams, context must live in written documents that anyone can access at any time. Teams that document decisions, reasoning, and outcomes create a shared memory that transcends individual availability.

The second principle is over-communication of intent. In-person communication carries tone, expression, and gesture that defuse ambiguity. Text communication strips all of that away. Remote-first teams learn to explicitly communicate not just what they are doing but why, what they are uncertain about, and what they need from others.

Structured async rituals replace the watercooler. Weekly written updates that teams read on their own schedule replace the standing meeting. Persistent channels organized around topics rather than teams allow people to participate when it makes sense for their day.

Video calls reserved for moments that genuinely require synchronous presence, rather than defaulted to as a substitute for all communication, become more valuable and more focused when they do occur.

Trust in remote teams is slower to build and faster to erode than in co-located settings. The investment in the systems and rituals that create it pays dividends measured in retention, performance, and genuine collaboration that transcends geography.`,
  },
  {
    title: 'Learning to Rest: Why Doing Nothing Is a Skill',
    authorName: 'Meera Pillai',
    email: 'meera@restfullife.in',
    category: 'Lifestyle',
    tags: ['rest', 'burnout', 'mental health', 'wellbeing'],
    status: 'Draft',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80',
    shortDescription: 'Modern culture has turned rest into a luxury and busyness into a badge of honor. Reclaiming the ability to genuinely rest may be the most productive thing you can do.',
    content: `Rest has an image problem. In a culture that celebrates hustle, treats busyness as a proxy for importance, and frames leisure as something you earn rather than something you need, the ability to genuinely rest feels almost transgressive.

The result is a population that is exhausted but not resting. Scrolling through a phone is not rest. Watching television while checking messages is not rest. Even sleep, when anxiety-ridden and fragmented, is not the restorative experience the brain requires.

True rest is active in its way. It requires the deliberate disengagement from productivity, the willingness to let time pass without output or achievement, and the tolerance of the discomfort that comes from stillness for minds trained to constant stimulation.

The science on this is unambiguous. The default mode network, the brain system most active during rest and mind-wandering, is responsible for creativity, empathy, perspective-taking, and the consolidation of memory. Depriving this system of activation time does not increase cognitive output. It decreases it.

Learning to rest looks like scheduling time where nothing is scheduled. It looks like taking walks without a podcast. It looks like sitting in a garden and allowing the mind to wander without redirecting it. It looks like sleeping eight hours without guilt about the hours that could have been spent working.

The productive case for rest, if you need one, is that the insights, connections, and clarity that emerge from genuine downtime consistently outperform the marginal output of the extra hour worked. But perhaps the stronger case is simply that rest is what a human life requires, independent of what it produces.`,
  },
  {
    title: 'React Server Components: What They Actually Change',
    authorName: 'Deepak Chaudhary',
    email: 'deepakdev@reactinsider.com',
    category: 'Technology',
    tags: ['React', 'RSC', 'Next.js', 'server components'],
    status: 'Published',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    shortDescription: 'React Server Components have been shipping in Next.js for over a year. Past the initial hype and confusion, here is a clear-eyed look at what actually changes and what does not.',
    content: `React Server Components arrived with substantial fanfare and perhaps even more substantial confusion. The mental model shift they require is genuine, and the early documentation did not always make the implications clear. A year into mainstream adoption via Next.js, the picture is cleaner.

The core idea is simple even if the execution is complex. Server Components render on the server and never execute on the client. Their output is not HTML but a serialized component tree that the client React runtime can hydrate efficiently. This means Server Components can access databases, file systems, and environment variables directly, without an API layer in between.

What this changes concretely is the data fetching story. The waterfall of API calls that client components require, each waiting for the parent to render before fetching its own data, is replaced by parallel server-side fetching that completes before anything reaches the browser.

Bundle size changes dramatically too. A Server Component that imports a large parsing library, a database client, or a complex formatting utility ships none of that JavaScript to the browser. The component runs on the server, produces its output, and the heavy dependencies never touch the client bundle.

What Server Components do not change is interactivity. Any component that uses state, effects, event handlers, or browser APIs remains a Client Component. The architecture creates a clear boundary between the static and the interactive, which most applications discover is actually a helpful forcing function for thinking about which parts of the UI need to be dynamic.

The practical result for most Next.js applications is smaller bundles, faster initial loads, simplified data access patterns, and a more explicit separation of concerns. The learning curve is real, but the destination is a better default.`,
  },
  {
    title: 'Color Theory for UI Designers: Beyond the Basics',
    authorName: 'Ishaan Bose',
    email: 'ishaanbose@colorstudio.com',
    category: 'Design',
    tags: ['color', 'UI design', 'accessibility', 'branding'],
    status: 'Draft',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&q=80',
    shortDescription: 'Every designer learns the color wheel. Far fewer understand how color behaves in digital interfaces, how cultural context changes perception, and how accessibility constraints can improve rather than limit palette design.',
    content: `The color wheel is where color education begins and, for many designers, where it ends. Complementary colors sit opposite each other. Analogous colors sit adjacent. Triadic schemes use three equidistant points. These relationships are real and useful, but they describe color in a vacuum that interfaces never occupy.

Digital color is experienced in context. A blue that reads as calm and trustworthy on a white background becomes cold and clinical on a dark one. The same orange that energizes on a neutral surface can feel aggressive against red. Designing with color means designing with relationships, not picking hues in isolation.

The HSL model serves interface designers better than the hex codes that most tools default to. Hue, saturation, and lightness map more directly to the perceptual qualities we care about. A color palette built on a consistent hue with varied saturation and lightness creates visual harmony in a way that arbitrary hex selection cannot.

Cultural context is where most international products stumble. White communicates purity in Western contexts and mourning in parts of East Asia. Green carries different associations in Islamic and Western contexts. Red signals danger in some markets and celebration in others. A global product requires deliberate thought about which color associations are load-bearing and which can flex by market.

Accessibility constraints, rather than limiting palette design, often improve it. The discipline of ensuring sufficient contrast between text and background, of not relying on color alone to communicate status, and of testing designs in various colorblindness simulations consistently produces palettes with more intentional relationships than those designed without those constraints.

Color is the first thing people perceive and the last thing they consciously analyze. Getting it right is invisible. Getting it wrong is immediately felt, even when users cannot articulate why.`,
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing existing posts...');
    await Post.deleteMany({});

    console.log(`Inserting ${posts.length} seed posts...`);
    const inserted = await Post.insertMany(posts);
    console.log(`Done! Inserted ${inserted.length} posts.\n`);

    inserted.forEach((p, i) => {
      console.log(`  ${i + 1}. [${p.status}] ${p.title}`);
    });
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected. Seed complete.');
  }
}

seed();

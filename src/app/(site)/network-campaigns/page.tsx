import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollReveal, StaggerReveal } from '@/components/scroll-reveal'
import { client } from '@/sanity/lib/client'
import { MOVEMENT_WINS_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Network Campaigns',
  description:
    'Explore coordinated campus campaigns for fossil-free futures including Fossil Free Research, divestment, and ending fossil fuel sponsorships.',
}

interface MovementWin {
  _id: string
  title: string
  date: string
  description?: string
  campaign?: string
  link?: string
  memberOrg: {
    _id: string
    name: string
    logoUrl?: string
  }
}

const campaigns = [
  {
    slug: 'fossil-free-research',
    title: 'Fossil Free Research',
    description:
      "For decades, the fossil fuel industry has sought to mislead the public on the realities of climate change and obstruct climate action. Fossil fuel funded research provides Big Oil with undue legitimacy, bolsters industry greenwashing, and skews the research we need to inform a just energy transition. It&apos;s time to end fossil fuel-funded research at our schools.",
  },
  {
    slug: 'campus-decarbonization',
    title: 'Campus decarbonization',
    description:
      'Universities cannot be true climate leaders while continuing to rely on oil and gas for energy. We are fighting back against performative carbon neutrality plans that lack transparency and rely on greenwashing solutions such as carbon offsets. We demand genuine campus decarbonization.',
  },
  {
    slug: 'green-new-deal',
    title: 'Green New Deal for campuses',
    description:
      "To achieve a just energy transition, we will have to change everything. Let&apos;s start with our universities.",
  },
  {
    slug: 'fossil-free-careers',
    title: 'Fossil free careers',
    description:
      'We envision a future with just, green, good jobs for all. Fossil fuel industry recruitment on our campuses must stop.',
  },
  {
    slug: 'fossil-fuel-divestment',
    title: 'Fossil fuel divestment',
    description:
      'Our planet is burning and our schools are investing in the fire. Our endowments must not be used to fuel the climate crisis.',
  },
]

async function getMovementWins(): Promise<MovementWin[]> {
  return client.fetch(MOVEMENT_WINS_QUERY)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

export default async function NetworkCampaignsPage() {
  const allWins = await getMovementWins()

  // Group wins by campaign
  const winsByCampaign = campaigns.reduce(
    (acc, campaign) => {
      acc[campaign.slug] = allWins
        .filter((win) => win.campaign === campaign.slug)
        .slice(0, 3) // Get only the 3 most recent
      return acc
    },
    {} as Record<string, MovementWin[]>,
  )

  return (
    <div className="page-wrapper">
      <section className="bg-brand-primary/10 section-hero">
        <div className="page-container stack stack-tight text-left">
          <p className="eyebrow text-xs sm:text-sm text-brand-secondary">
            Campaigns
          </p>
          <h1 className="text-3xl font-semibold text-brand-primary sm:text-4xl">
            Coordinated campus campaigns for fossil-free futures.
          </h1>
          <p className="text-base text-slate-700">
            Our member organizations run powerful local campaigns and come
            together for national moments that spotlight fossil fuel influence.
            Here&apos;s a snapshot of the work underway.
          </p>
        </div>
      </section>

      <section className="page-container stack stack-relaxed">
        <ScrollReveal variant="fade-up">
          <div className="stack stack-dense text-left">
            <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              Current priorities
            </h2>
            <p className="text-base text-slate-600">
              Each campus adapts these pillars to their local context, sharing
              playbooks, messaging, and wins through CCN.
            </p>
          </div>
        </ScrollReveal>
        <StaggerReveal
          staggerDelay={100}
          variant="blossom"
          className="grid gap-6 md:grid-cols-2"
        >
          {campaigns.map((campaign) => {
            const campaignWins = winsByCampaign[campaign.slug] || []
            return (
              <div
                key={campaign.slug}
                className="flex flex-col rounded-3xl border border-brand-secondary/20 bg-white p-6"
              >
                <div className="stack stack-dense flex-1">
                  <h3 className="text-lg font-semibold text-brand-primary">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-slate-600">{campaign.description}</p>
                </div>

                {/* Recent Wins Section */}
                {campaignWins.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                      Recent Wins
                    </p>
                    <div className="space-y-2">
                      {campaignWins.map((win) => (
                        <div
                          key={win._id}
                          className="flex items-center gap-3 text-sm"
                        >
                          {win.memberOrg.logoUrl ? (
                            <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded bg-white shadow-sm">
                              <Image
                                src={win.memberOrg.logoUrl}
                                alt={`${win.memberOrg.name} logo`}
                                fill
                                className="object-contain p-0.5"
                                sizes="24px"
                              />
                            </div>
                          ) : (
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-brand-primary/10">
                              <span className="text-[10px] font-bold text-brand-primary">
                                {win.memberOrg.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-700 truncate leading-tight">
                              {win.title}
                            </p>
                            <p className="text-xs text-slate-400">
                              {formatDate(win.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Link */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href={`/network-campaigns/${campaign.slug}`}
                    className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                  >
                    View all wins
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            )
          })}
        </StaggerReveal>
      </section>

      <section className="bg-slate-900 section-dark">
        <div className="page-container stack text-left text-white">
          <ScrollReveal variant="fade-up">
            <div className="stack stack-dense">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                What we offer campaign teams
              </h2>
              <p className="text-sm text-slate-200">
                Infrastructure that helps student organizers move fast and stay
                connected.
              </p>
            </div>
          </ScrollReveal>
          <StaggerReveal
            staggerDelay={120}
            variant="blossom"
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: 'Strategy labs',
                body: 'Monthly campaign labs and peer coaching to refine demands, escalation plans, and power maps.',
              },
              {
                title: 'Messaging & media',
                body: "Shared talking points, media trainings, and amplification through CCN's communications channels.",
              },
              {
                title: 'Rapid-response support',
                body: 'Mini-grants and mobilization infrastructure for actions, digital storms, and high-impact escalations.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="stack stack-dense rounded-3xl bg-white/10 p-6"
              >
                <h3 className="text-lg font-semibold text-brand-accent">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-100">{item.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="page-container text-left">
        <ScrollReveal variant="fade-up">
          <div className="stack stack-cozy">
            <div className="stack stack-dense">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Get your campaign started today
              </h2>
              <p className="text-base text-slate-600">
                Whether you are just starting out or looking to scale your
                campaign, we can help you get started.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                className="inline-flex items-center rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-secondary"
                href="/take-action"
              >
                Schedule an onboarding call
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { ComingSoon } from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Resource Library',
  description:
    'Organizing guides, downloadable materials, and campaign support resources for student climate justice campaigns.',
}

export default function ResourceLibraryPage() {
  return (
    <ComingSoon
      title="Resource library in progress"
      description="We’re curating toolkits, training decks, and campaign templates to publish here."
      ctas={[
        {
          label: 'Get updates',
          href: 'mailto:info@campusclimatenetwork.org',
          variant: 'outline',
        },
        {
          label: 'Explore campaigns',
          href: '/network-campaigns',
        },
      ]}
    >
      We’ll share organizing guides and downloadable materials soon. In the
      meantime, reach out if you need support for your campus campaign.
    </ComingSoon>
  )
}

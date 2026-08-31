import { useTranslations, useMessages } from 'next-intl';

export default function MythsSection() {
  const t = useTranslations('myths');
  const messages = useMessages() as any;
  const items = (messages?.myths?.items || []) as Array<{
    myth: string;
    fact: string;
  }>;

  return (
    <section id="myths" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-sm sm:text-base mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 sm:p-7"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                    style={{ background: 'rgba(239,68,68,0.12)', color: '#dc2626' }}
                  >
                    {t('mythLabel')}
                  </span>
                  <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                    {item.myth}
                  </p>
                </div>
                <div>
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    {t('factLabel')}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.fact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

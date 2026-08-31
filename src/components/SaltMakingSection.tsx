import { useTranslations, useMessages } from 'next-intl';

export default function SaltMakingSection() {
  const t = useTranslations('saltMaking');
  const messages = useMessages() as any;
  const steps = (messages?.saltMaking?.steps || []) as Array<{
    title: string;
    content: string;
  }>;

  return (
    <section id="salt-making" className="section-padding">
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

        <p
          className="mb-8 rounded-xl px-5 py-4 text-sm leading-relaxed"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
        >
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {index + 1}
                </div>
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {step.content}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}

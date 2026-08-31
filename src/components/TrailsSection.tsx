import { useTranslations, useMessages } from 'next-intl';

export default function TrailsSection() {
  const t = useTranslations('trails');
  const messages = useMessages() as any;
  const trails = (messages?.trails?.trails || []) as Array<{
    name: string;
    length: string;
    time: string;
    difficulty: string;
    desc: string;
  }>;
  const difficulty = (messages?.trails?.difficulty || {}) as Record<string, string>;

  const difficultyColor: Record<string, { bg: string; color: string }> = {
    easy: { bg: 'rgba(34,197,94,0.15)', color: '#16a34a' },
    moderate: { bg: 'rgba(234,179,8,0.15)', color: '#ca8a04' },
  };

  return (
    <section id="trails" className="section-padding">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trails.map((trail, index) => {
            const dColor = difficultyColor[trail.difficulty] || difficultyColor.easy;
            return (
              <div
                key={index}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {trail.name}
                  </h3>
                  <span
                    className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: dColor.bg, color: dColor.color }}
                  >
                    {difficulty[trail.difficulty] || trail.difficulty}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mb-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>{trail.length}</span>
                  <span>·</span>
                  <span>{trail.time}</span>
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {trail.desc}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}

import { useTranslations, useMessages } from 'next-intl';

const rowKeys = ['birding', 'photography', 'beach', 'crowds', 'weather'] as const;

export default function BestTimeSection() {
  const t = useTranslations('bestTime');
  const messages = useMessages() as any;
  const seasons = (messages?.bestTime?.seasons || []) as Array<
    Record<string, string>
  >;
  const rowLabels = (messages?.bestTime?.rowLabels || {}) as Record<string, string>;

  return (
    <section id="best-time" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        <div
          className="overflow-x-auto rounded-2xl"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('seasonHeader')}
                </th>
                {rowKeys.map((key) => (
                  <th key={key} className="px-5 py-4 text-left font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {rowLabels[key] || key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seasons.map((season, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td
                    className="px-5 py-4 font-medium whitespace-nowrap"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {season.season}
                  </td>
                  {rowKeys.map((key) => (
                    <td key={key} className="px-5 py-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {season[key] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}

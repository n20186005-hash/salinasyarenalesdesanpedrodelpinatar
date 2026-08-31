import { useTranslations, useMessages } from 'next-intl';

const badgeSymbol: Record<string, string> = {
  common: '●',
  rare: '◐',
  absent: '—',
};

export default function BirdingSection() {
  const t = useTranslations('birding');
  const messages = useMessages() as any;
  const species = (messages?.birding?.species || []) as Array<{
    name: string;
    nameLocal: string;
    seasons: string[];
  }>;
  const legend = (messages?.birding?.legend || {}) as Record<string, string>;
  const seasonLabels = (messages?.birding?.seasonLabels || []) as string[];

  return (
    <section id="birding" className="section-padding">
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

        <div
          className="overflow-x-auto rounded-2xl"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th className="text-left px-5 py-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {t('speciesHeader')}
                </th>
                {seasonLabels.map((label) => (
                  <th key={label} className="px-5 py-4 text-center font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {species.map((sp, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td className="px-5 py-4">
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {sp.name}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {sp.nameLocal}
                    </div>
                  </td>
                  {sp.seasons.map((value, j) => (
                    <td key={j} className="px-5 py-4 text-center whitespace-nowrap">
                      <span
                        className="text-base"
                        style={{ color: value === 'common' ? 'var(--accent)' : 'var(--text-muted)' }}
                      >
                        {badgeSymbol[value] || '—'}
                      </span>
                      <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {legend[value] || ''}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-6 mt-6 text-xs" style={{ color: 'var(--text-muted)' }}>
          {Object.entries(legend).map(([key, label]) => (
            <span key={key}>
              <span style={{ color: key === 'common' ? 'var(--accent)' : 'var(--text-muted)' }}>
                {badgeSymbol[key] || '—'}
              </span>{' '}
              {label}
            </span>
          ))}
        </div>

        <p
          className="mt-8 rounded-xl px-5 py-4 text-sm leading-relaxed"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
        >
          {t('tip')}
        </p>
      </div>
    </section>
  );
}

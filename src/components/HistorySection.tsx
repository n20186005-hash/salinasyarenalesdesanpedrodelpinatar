import { useTranslations, useMessages } from 'next-intl';

export default function HistorySection() {
  const t = useTranslations('history');
  const messages = useMessages() as any;
  const eras = (messages?.history?.eras || []) as Array<{
    period: string;
    title: string;
    content: string;
  }>;
  const legend = (messages?.history?.legend || {}) as {
    title: string;
    nameOrigin: string;
    nameOriginContent: string;
    saltLegend: string;
    saltLegendContent: string;
    note: string;
  };

  return (
    <section id="history" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-center text-sm sm:text-base mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-14 mx-auto" style={{ background: 'var(--accent)' }} />

        {/* 历史时间线 */}
        <div className="space-y-6">
          {eras.map((era, index) => (
            <div key={index} className="flex gap-5 items-start">
              <div className="flex flex-col items-center self-stretch">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {index + 1}
                </div>
                {index < eras.length - 1 && (
                  <div className="w-0.5 flex-1 my-2" style={{ background: 'var(--border-color)' }} />
                )}
              </div>
              <div
                className="flex-1 rounded-2xl p-6 sm:p-7 mb-6"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {era.period}
                </span>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {era.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {era.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 地名与传说 */}
        <div className="mt-10">
          <h3
            className="font-display text-2xl font-semibold mb-8 text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            {legend.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <h4 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {legend.nameOrigin}
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {legend.nameOriginContent}
              </p>
            </div>
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <h4 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {legend.saltLegend}
                </h4>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {legend.saltLegendContent}
              </p>
            </div>
          </div>
          <p className="mt-6 text-center text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
            {legend.note}
          </p>
        </div>
      </div>
    </section>
  );
}

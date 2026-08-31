import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';

const { baseUrl, attraction, location, mapsUrl, govtTourismUrl, heroImage } = siteConfig;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf8f4' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1a14' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const esUrl = `${baseUrl}/es`;
  const enUrl = `${baseUrl}/en`;
  const zhUrl = `${baseUrl}/zh`;
  const selfUrl = locale === 'es' ? esUrl : locale === 'en' ? enUrl : zhUrl;
  const imageUrl = `${baseUrl}${heroImage}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    // PWA: Web App Manifest
    manifest: '/manifest.webmanifest',
    icons: {
      icon: '/icons/icon-192.png',
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: attraction.shortName,
    },
    // Canonical + hreflang
    alternates: {
      canonical: selfUrl,
      languages: {
        'es': esUrl,
        'en': enUrl,
        'zh': zhUrl,
        'x-default': esUrl,
      },
    },
    // Open Graph / 社交标签
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: attraction.shortName,
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: `${attraction.fullName} in ${location.city}`,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // 1) 结构化数据：TouristAttraction（含 @id 与 image）
  const attractionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/#attraction`,
    name: attraction.fullName,
    alternateName: [attraction.shortName, `${location.city} ${attraction.fullName}`],
    description: messages.meta.description,
    url: baseUrl,
    image: [`${baseUrl}${heroImage}`],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: attraction.fullName,
      addressLocality: location.city,
      addressRegion: location.region,
      postalCode: location.postalCode,
      addressCountry: location.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.latitude,
      longitude: location.longitude,
    },
    hasMap: mapsUrl,
    sameAs: [mapsUrl, govtTourismUrl],
  };

  // 2) 结构化数据：FAQPage（与正文 FAQ 区块一一对应）
  const faqItems = ((messages as any)?.faq?.items || []) as Array<{ q: string; a: string }>;
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={attraction.shortName} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script id="pwa-register" strategy="afterInteractive">
          {`if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').catch(function(err) {
      console.error('Service worker registration failed:', err);
    });
  });
}`}
        </Script>
      </body>
    </html>
  );
}

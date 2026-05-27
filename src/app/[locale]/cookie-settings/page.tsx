import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://salinasyarenalesdesanpedrodelpinatar.com';
  const esUrl = `${baseUrl}/es/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;
  const zhUrl = `${baseUrl}/zh/cookie-settings`;
  const selfUrl = locale === 'es' ? esUrl : locale === 'en' ? enUrl : zhUrl;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'es': esUrl,
        'en': enUrl,
        'zh': zhUrl,
        'x-default': esUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}

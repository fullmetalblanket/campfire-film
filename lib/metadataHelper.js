export function generateMetadata({
  title,
  url,
  description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  image = process.env.NEXT_PUBLIC_SITE_IMAGE,
  type = "website",
  locale = "en_US",
  structuredData = null
} = {}) {
  const baseTitle = process.env.NEXT_PUBLIC_SITE_NAME;
  const fullTitle = title ? baseTitle + ' - ' + title : baseTitle;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const fullUrl = url ? baseUrl + url : baseUrl;
  const fullImageUrl = baseUrl + image;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: process.env.NEXT_PUBLIC_SITE_NAME,
        },
      ],
      locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImageUrl],
    },
    icons: {
      icon: [
        { url: '/favicon/favicon.ico' },
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/favicon/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/favicon/apple-touch-icon.png',
          color: '#5bbad5',
        },
      ],
    },
    manifest: '/site.webmanifest',
    other: {
      'msapplication-TileColor': '#da532c',
    },
    structuredData,
  };
}
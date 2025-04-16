import { Metadata } from 'next';

// Role-specific titles and descriptions
const roleMetadata = {
  seeker: {
    title: 'You are a Seeker! - Quidditch Quiz Results',
    description:
      'You got Seeker as your Quidditch position! Independent, observant, and quick - discover more about your perfect Quidditch role.',
  },
  chaser: {
    title: 'You are a Chaser! - Quidditch Quiz Results',
    description:
      'You got Chaser as your Quidditch position! Team-oriented, strategic, and goal-focused - discover more about your perfect Quidditch role.',
  },
  beater: {
    title: 'You are a Beater! - Quidditch Quiz Results',
    description:
      'You got Beater as your Quidditch position! Strong, protective, and tactical - discover more about your perfect Quidditch role.',
  },
  keeper: {
    title: 'You are a Keeper! - Quidditch Quiz Results',
    description:
      'You got Keeper as your Quidditch position! Defensive, vigilant, and reliable - discover more about your perfect Quidditch role.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { role: string };
}): Promise<Metadata> {
  // Validate role
  const role = params.role.toLowerCase();
  if (!['seeker', 'chaser', 'beater', 'keeper'].includes(role)) {
    return {
      title: 'Quidditch Quiz Results',
      description: 'Discover your perfect Quidditch position!',
    };
  }

  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return {
    title: roleMetadata[role as keyof typeof roleMetadata].title,
    description: roleMetadata[role as keyof typeof roleMetadata].description,
    openGraph: {
      title: `You are a ${capitalizedRole}! - Quidditch Quiz Results`,
      description: roleMetadata[role as keyof typeof roleMetadata].description,
      images: [
        {
          url: `/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
          alt: `${capitalizedRole} Quidditch Position Result`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `You are a ${capitalizedRole}! - Quidditch Quiz Results`,
      description: roleMetadata[role as keyof typeof roleMetadata].description,
      images: [`/web-app-manifest-512x512.png`],
    },
  };
}

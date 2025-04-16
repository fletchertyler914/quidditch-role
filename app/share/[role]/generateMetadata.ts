import { Metadata } from 'next';

// Role-specific titles and descriptions
const roleMetadata = {
  seeker: {
    title: 'I got Seeker in the Quidditch Quiz!',
    description:
      'I got Seeker as my Quidditch position! Independent, observant, and quick - take the quiz to discover your perfect Quidditch role.',
  },
  chaser: {
    title: 'I got Chaser in the Quidditch Quiz!',
    description:
      'I got Chaser as my Quidditch position! Team-oriented, strategic, and goal-focused - take the quiz to discover your perfect Quidditch role.',
  },
  beater: {
    title: 'I got Beater in the Quidditch Quiz!',
    description:
      'I got Beater as my Quidditch position! Strong, protective, and tactical - take the quiz to discover your perfect Quidditch role.',
  },
  keeper: {
    title: 'I got Keeper in the Quidditch Quiz!',
    description:
      'I got Keeper as my Quidditch position! Defensive, vigilant, and reliable - take the quiz to discover your perfect Quidditch role.',
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
      title: 'Quidditch Quiz - Take the Quiz',
      description:
        'Find out which Quidditch position you are! Take our quiz to discover your perfect role.',
    };
  }

  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return {
    title: roleMetadata[role as keyof typeof roleMetadata].title,
    description: roleMetadata[role as keyof typeof roleMetadata].description,
    openGraph: {
      title: `I got ${capitalizedRole} in the Quidditch Quiz!`,
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
      title: `I got ${capitalizedRole} in the Quidditch Quiz!`,
      description: roleMetadata[role as keyof typeof roleMetadata].description,
      images: [`/web-app-manifest-512x512.png`],
    },
  };
}

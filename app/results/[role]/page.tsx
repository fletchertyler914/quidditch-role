import { Role } from '@/app/types/quiz';
import { redirect } from 'next/navigation';
import ResultScreenWrapper from './ResultScreenWrapper';

export default async function ResultPage({
  params,
}: {
  params: { role: string };
}) {
  // Validate the role parameter
  const validRoles = ['seeker', 'keeper', 'beater', 'chaser'];
  const { role } = await params;

  if (!validRoles.includes(role)) {
    redirect('/');
  }

  return <ResultScreenWrapper role={role.toLowerCase() as Role} />;
}

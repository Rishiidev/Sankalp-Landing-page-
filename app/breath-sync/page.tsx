import { BreathSync } from '@/components/breath-sync';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '60-Second Breath Sync - Sankalp',
  description: 'Sync your breath with thousands of others right now. Find immediate clarity.',
};

export default function BreathSyncPage() {
  return <BreathSync />;
}

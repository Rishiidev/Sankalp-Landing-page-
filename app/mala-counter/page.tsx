import { MalaCounter } from '@/components/mala-counter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Mala Counter - Sankalp',
  description: 'A tactile, rhythmic tool for chanting or breathing. Find your center with 108 digital beads.',
};

export default function MalaCounterPage() {
  return <MalaCounter />;
}

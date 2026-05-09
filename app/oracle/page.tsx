import { OracleGenerator } from '@/components/oracle-generator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Oracle - Sankalp',
  description: 'A deeply immersive psychological quiz to define your vows and reclaim your energy. Receive a stunning digital contract.',
};

export default function OraclePage() {
  return <OracleGenerator />;
}

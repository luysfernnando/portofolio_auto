import { NextResponse } from 'next/server';
import { getCachedProjects, getCachedStats, getCachedUserInfo } from '../../../services/github';

export async function GET() {
  try {
    const [user, projects, stats] = await Promise.all([
      getCachedUserInfo(),
      getCachedProjects(),
      getCachedStats(),
    ]);

    return NextResponse.json({ user, projects, stats });
  } catch (error) {
    console.error('API /api/github Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data from server cache' },
      { status: 500 }
    );
  }
}

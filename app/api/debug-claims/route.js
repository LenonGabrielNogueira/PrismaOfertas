import { auth } from '@clerk/nextjs/server';

export async function GET() {
    const { sessionClaims, userId } = await auth();
    return Response.json({ userId, sessionClaims });
}
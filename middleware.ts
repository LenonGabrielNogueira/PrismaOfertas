import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req)) {
    const authObj = await auth();

    if (!authObj.userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const sessionClaims = authObj.sessionClaims;
    const userEmail =
    (sessionClaims?.email as string) ||
    ((sessionClaims as any)?.primary_email_address as string);

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!userEmail || userEmail !== adminEmail) {
      return NextResponse.redirect(new URL('/', req.url));  // ← só redireciona, sem signOut
    }
}
});

export const config = {
    matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
    ],
};
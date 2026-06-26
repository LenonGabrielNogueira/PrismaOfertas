import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req)) {
    const authObj = await auth.protect();
    
    // Verifica onde o email está no objeto
    console.log('sessionClaims:', JSON.stringify(authObj.sessionClaims));
    console.log('userId:', authObj.userId);

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const userEmail = 
        authObj.sessionClaims?.email as string ||
        authObj.sessionClaims?.['primaryEmail'] as string ||
        (authObj.sessionClaims as any)?.['emailAddresses']?.[0]?.emailAddress;

    console.log('userEmail encontrado:', userEmail);
    console.log('adminEmail:', adminEmail);

    if (!userEmail || userEmail !== adminEmail) {
        return NextResponse.redirect(new URL('/', req.url));
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
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./lib";

if (process.env.client_id === undefined || process.env.client_secret === undefined) {
    throw new Error("Please add your CLIENT_ID and CLIENT_SECRET to .env.local");
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        })
    ],

    callbacks: {
        async session({ user, session }) {
            if (session && user) {
                session.user.id = user.id;
            }
            return session;
        }
    }
})

/*
🔹 1. Home page loads

Your page.tsx calls await auth() (server-side helper).

Since no one is signed in yet, the session is null.

So nothing is shown.

🔹 2. Sign-in button

SignInButton is a client component.

It calls signIn() (from next-auth/react).

🔹 3. What signIn() does

Slight adjustment here:

signIn("github") does not directly call your route.ts.

Instead, it redirects the browser to /api/auth/signin/github.

That hits your GET handler (exported from NextAuth).

So your thought “it will run route.ts → GET handler → GitHub login” is correct.
But: it’s not any GET, it’s specifically the signin route inside NextAuth’s internal router.

🔹 4. GitHub login

GET /api/auth/signin/github → NextAuth builds GitHub OAuth URL → redirects you to GitHub.

🔹 5. Callback from GitHub

After login, GitHub redirects back to /api/auth/callback/github?code=....

This request uses the POST handler (internally NextAuth supports both GET and POST depending on provider).

NextAuth exchanges the code for a GitHub access token.

Then it creates/updates User and Account in your database via PrismaAdapter.

Sets a session cookie in the browser.

🔹 6. Redirect back home

After successful callback, NextAuth redirects you back to / (or your callbackUrl).

🔹 7. Fetch session

Now, when / loads again, await auth() runs.

Since a cookie exists, NextAuth reads the session.

Here your callbacks.session is executed → adds user.id.

Your app renders user info on the page.

*/




/*
1️⃣ The flow right before the callback

User clicks Sign In on your website (browser).

Browser calls signIn("github").

NextAuth redirects the browser to GitHub login page (GET /login/oauth/...). still server gets the request

2️⃣ GitHub redirects back (callback URL)

After login, GitHub redirects the browser back to:

https://yourapp.com/api/auth/callback/github?code=ABC123


The browser sends a GET request to your server at this URL.

This request includes the authorization code from GitHub.

3️⃣ What happens on the server

Now your Next.js server receives that GET request:

Your route.ts exports GET and POST from NextAuth.

NextAuth’s GET (or sometimes POST, depending on provider & flow) runs on the server.

Inside that handler, NextAuth does:

Reads the code parameter from the request.

Sends a POST request from the server to GitHub to exchange the code for an access token. ✅ This is server-to-server, not the browser.

Uses the access token to fetch the user profile from GitHub (server-to-server).

Creates or updates the User/Account in your database (server).

Creates a session and sets the cookie in the response.

Then the server sends a redirect response back to the browser (usually / or the callbackUrl you specified).

4️⃣ What the browser sees

Browser follows the redirect → lands on /.

The cookie (set by the server during the callback request) is now stored in the browser.

Any future requests to your app will include the session cookie automatically.
*/


/*
So when Next.js sees a request then (route.ts) is vulnerable to endpoints and it runs function based on the endpoint methods:

It checks the method (GET/POST).

Calls your exported function.

NextAuth looks at the path (signin, callback, etc.) and runs the right logic.
*/

// [...nextauth] --> Any request to /api/auth/*

/*
In route.ts, the function names must match HTTP methods.
So if you export:

export async function GET(req: Request) { ... }
export async function POST(req: Request) { ... }
export async function PUT(req: Request) { ... }
export async function DELETE(req: Request) { ... }


Then:

A GET /api/foo → Next.js runs your GET() function.

A POST /api/foo → Next.js runs your POST() function.

etc.

If the request comes in with a method that you didn’t export (say PATCH) → Next.js will return 405 Method Not Allowed.

*/
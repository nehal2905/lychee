import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { StoreProvider } from "@/lib/store";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OpeningExperience } from "@/components/OpeningExperience";
import { IdleAnimations } from "@/components/IdleAnimations";
import { CartDrawer } from "@/components/CartDrawer";
import { BottomNav } from "@/components/BottomNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-8 h-24 w-24 animate-flicker">
        <div className="mx-auto h-16 w-2 rounded-b bg-parchment/80" />
        <div className="mx-auto -mt-14 h-8 w-4 rounded-full bg-candle blur-[3px] candle-glow" />
      </div>
      <h1 className="font-display text-4xl italic text-cream">Lost in the Library</h1>
      <p className="mt-3 max-w-md font-hand text-xl text-cream/80">
        This page has been misplaced among the archives.
      </p>
      <Link to="/" className="mt-8 small-caps font-display text-gold underline underline-offset-4">
        Return to the Entrance
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl italic text-cream">A candle went out.</h1>
        <p className="mt-2 text-sm text-haze">Something didn't quite unfold. Try again?</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-sm gold-frame bg-gold px-4 py-2 text-sm small-caps text-panel"
          >
            Try Again
          </button>
          <a href="/" className="rounded-sm border border-gold/40 px-4 py-2 text-sm small-caps text-cream">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lychee Lore — Collect Beautiful Moments" },
      { name: "description", content: "A boutique of one-of-a-kind vintage jewellery. Every piece remembers." },
      { name: "author", content: "Lychee Lore" },
      { property: "og:title", content: "Lychee Lore — Collect Beautiful Moments" },
      { property: "og:description", content: "One-of-a-kind vintage jewellery, dropped in candlelit chapters." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo.png?v=1" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo.png?v=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/logo.png?v=1" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Lora:ital,wght@0,400..600;1,400..500&family=Dancing+Script:wght@500..700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// each room of the archive is dressed in its own cloth
function pageTexture(pathname: string) {
  if (pathname === "/") return "page-crushed";
  if (pathname.startsWith("/lore")) return "page-crushed";
  if (pathname.startsWith("/checkout")) return "page-crushed";
  if (pathname.startsWith("/wishlist")) return "page-crushed"; // Me page — same cloth as home
  if (pathname.startsWith("/faq")) return "page-laid";
  if (pathname.startsWith("/admin")) return "page-laid";
  return "page-velvet"; // mystery jar, product pages
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <OpeningExperience />
        <Nav />
        {/* bottom padding on mobile so the fixed bottom nav never covers content */}
        <div className="pb-[62px] md:pb-0">
          {/* a soft page-turn between routes — opacity only: a transform here
              would break position:fixed for bars and overlays inside pages */}
          <motion.main
            key={pathname}
            className={`min-h-screen ${pageTexture(pathname)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
          <Footer />
        </div>
        <BottomNav />
        <CartDrawer />
        <IdleAnimations />
      </StoreProvider>
    </QueryClientProvider>
  );
}

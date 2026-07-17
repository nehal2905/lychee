import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Loader } from "@/components/Loader";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // wax-seal loading state while a route's code or data is still arriving
    defaultPendingComponent: () => (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader variant="checkout" />
      </div>
    ),
    defaultPendingMs: 300,
    defaultPendingMinMs: 400,
  });

  return router;
};

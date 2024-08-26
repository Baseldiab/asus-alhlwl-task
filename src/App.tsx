import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import ScrollToTop from "./components/global/scrollToTop";
import LoadingLayout from "./components/layout/Loading.layout";

const LazyMainNavbar = lazy(() => import("./components/navbar/mainNavbar"));
const LazyFooter = lazy(() => import("./components/footer/footer"));

function App() {
  return (
    <>
      <div className="min-h-screen m-0 flex flex-col">
        <main className="flex-1">
          <ScrollToTop />

          <Suspense fallback={<LoadingLayout />}>
            <LazyMainNavbar />
          </Suspense>

          <Suspense fallback={<LoadingLayout />}>
            <Outlet />
          </Suspense>
        </main>

        <Suspense fallback={<LoadingLayout />}>
          <LazyFooter />
        </Suspense>
      </div>
    </>
  );
}

export default App;

import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function Songs() {
  const { pathname } = useLocation();

  if (pathname === "/songs" || pathname === "/songs/") {
    return <Navigate to="/songs/lyrics" replace />;
  }

  return (
    <>
      <main className="w-full max-w-[1440px] mx-auto">
        <Outlet />
      </main>
    </>
  );
}

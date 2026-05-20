import { AppHeader } from "../components/AppHeader";
import { PageShell } from "../components/PageShell";

export function AppLayout({ children }) {
  return (
    <PageShell>
      <AppHeader />
      <main className="flex flex-1 items-start justify-center py-6 sm:items-center sm:py-10">{children}</main>
    </PageShell>
  );
}
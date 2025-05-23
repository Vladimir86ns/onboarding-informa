import { Header } from '@informa-onboarding/header';
import { Footer } from '@informa-onboarding/footer';
import { Outlet } from "react-router";

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Header />
      </header>
      <main className="flex-grow overflow-y-auto p-4">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

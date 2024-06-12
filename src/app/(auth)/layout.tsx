import MainLayout from '@/layout/main-layout/main-layout';
import { CookiesProvider } from 'next-client-cookies/server';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return <CookiesProvider>
        <MainLayout>{children}</MainLayout>
    </CookiesProvider>;
}

import ClientLayout from './client-layout';

export const metadata = {
    title: "Kadam-e-Ziyarat | Ground and group packages to Iran, Iraq & Umrah",
    description: "Looking for a trusted Ziyarat tour? Kadam-e-Ziyarat offers customized group & ground packages for Iran, Iraq & Umrah. Book now!",
};

export default function RootLayout({ children }) {
    return <ClientLayout>{children}</ClientLayout>;
}
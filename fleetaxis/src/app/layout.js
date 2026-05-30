import "./globals.css";

export const metadata = {
  title: "FleetAxis AI — AI Operating System for Fleet Intelligence",
  description: "Empowering fleets worldwide to make smarter decisions, reduce costs, and accelerate toward a sustainable future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

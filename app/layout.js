import "../styles/globals.css";

export const metadata = {
  title: {
    default: 'Task Manager(Yardstick)', // Default title
  },
  description: 'Manage your tasks efficiently with Task Manager.',
  icons: {
    icon: '/favicon.ico', // Path to your favicon
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
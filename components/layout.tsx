// components/Layout.tsx
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }
        main {
          padding: 1rem;
        }
      `}</style>
    </>
  );
};

export default Layout;

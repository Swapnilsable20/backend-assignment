export const metadata = {
    title: "Backend Assignment - Next.js Frontend",
    description: "Simple frontend built using Next.js for backend assignment",
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ fontFamily: "sans-serif", padding: "20px" }}>
          <h1>Backend Assignment - Next.js</h1>
          <hr />
          {children}
        </body>
      </html>
    );
  }
  
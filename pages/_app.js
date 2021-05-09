import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  const {theme, setTheme} = useTheme('light');

  useEffect(() => {
      setTheme( localStorage.getItem('theme') || 'light');
  },[]);

  return (
  <ThemeProvider attribute="class">
      <Component {...pageProps} />
  </ThemeProvider>
  )
         
  }

export default MyApp;

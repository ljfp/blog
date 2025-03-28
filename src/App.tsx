import './App.css'
import '@root/global.scss'
import * as React from 'react'
import * as Utilities from '@common/utilities'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RouterActionButton from './components/RouterActionButton'

// Import SRCL components
import DefaultLayout from '@components/page/DefaultLayout'
import Navigation from '@components/Navigation'
import ActionButton from '@components/ActionButton'
import DebugGrid from '@components/DebugGrid'
import SunIcon from '@components/svg/SunIcon'
import MoonIcon from '@components/svg/MoonIcon'

// Import pages
import HomePage from './pages/HomePage'
import ArchivePage from './pages/ArchivePage'
import BlogPostPage from './pages/BlogPostPage'

function App() {
  const [theme, setTheme] = React.useState<string>('');
  
  // Theme handling
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setTheme(savedTheme);
      Utilities.onHandleThemeChange(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'theme-dark' : '';
      setTheme(defaultTheme);
      Utilities.onHandleThemeChange(defaultTheme);
    }
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'theme-dark' ? '' : 'theme-dark';
    setTheme(newTheme);
    Utilities.onHandleThemeChange(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <BrowserRouter>
      <DefaultLayout previewPixelSRC="/favicon.ico">
        <DebugGrid />
        <Navigation
          logo="✎"
          left={<RouterActionButton to="/">HOME</RouterActionButton>}
          right={
            <>
              <RouterActionButton to="/archive">BLOG</RouterActionButton>
              <ActionButton onClick={toggleTheme}>
                {theme === 'theme-dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
              </ActionButton>
            </>
          }
        >
          <ActionButton>LJFP'S BLOG</ActionButton>
        </Navigation>
        <br />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/post/:slug" element={<BlogPostPage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
}

export default App
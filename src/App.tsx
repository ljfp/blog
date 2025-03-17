import './App.css'
import '@root/global.scss'
import * as React from 'react'
import * as Utilities from '@common/utilities'

// Import SRCL components
import DefaultLayout from '@components/page/DefaultLayout'
import Grid from '@components/Grid'
import Badge from '@components/Badge'
import Row from '@components/Row'
import ActionListItem from '@components/ActionListItem'
import CardDouble from '@components/CardDouble'
import Navigation from '@components/Navigation'
import ActionButton from '@components/ActionButton'
import DebugGrid from '@components/DebugGrid'
import BlockLoader from '@components/BlockLoader'

// Import blog utilities
import { getAllPosts, BlogPost } from './utils/blog'
import MarkdownRenderer from './components/MarkdownRenderer'

function App() {
  const [theme, setTheme] = React.useState<string>('');
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  
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
  
  // Load blog posts
  React.useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPosts();
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'theme-dark' ? '' : 'theme-dark';
    setTheme(newTheme);
    Utilities.onHandleThemeChange(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DebugGrid />
      <Navigation
        logo="✎"
        left={<ActionButton>ARCHIVE</ActionButton>}
        right={
          <>
            <ActionButton onClick={toggleTheme}>
              {theme === 'theme-dark' ? 'LIGHT' : 'DARK'}
            </ActionButton>
            <ActionButton>ABOUT</ActionButton>
          </>
        }
      >
        <ActionButton>MY BLOG</ActionButton>
      </Navigation>
      <br />
      <Grid>
        <Row>
          LJFP's BLOG <Badge>1.0.0</Badge>
        </Row>
        <Row>A personal blog with terminal aesthetics using SRCL</Row>
      </Grid>

      <Grid>
        {loading ? (
          <CardDouble title="Loading posts...">
            <Row>
              <BlockLoader mode={9} /> Please wait...
            </Row>
          </CardDouble>
        ) : posts.length > 0 ? (
          <>
            {posts.map((post, index) => (
              <React.Fragment key={post.meta.slug}>
                <MarkdownRenderer post={post} />
                {index < posts.length - 1 && <br />}
              </React.Fragment>
            ))}
          </>
        ) : (
          <CardDouble title="No posts found">
            <Row>
              No blog posts have been created yet. Add Markdown files to the content/posts directory.
            </Row>
          </CardDouble>
        )}
      </Grid>

      <Grid>
        <ActionListItem icon={`⭢`} href="https://github.com/internet-development/www-sacred" target="_blank">
          View SRCL source code
        </ActionListItem>
        <ActionListItem icon={`⭢`} href="https://sacred.computer" target="_blank">
          SRCL demo site
        </ActionListItem>
      </Grid>
    </DefaultLayout>
  );
}

export default App
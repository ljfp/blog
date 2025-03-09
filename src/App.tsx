import './App.css'
import '@root/global.scss'

// Import SRCL components
import DefaultLayout from '@components/page/DefaultLayout'
import Grid from '@components/Grid'
import Badge from '@components/Badge'
import Row from '@components/Row'
import ActionListItem from '@components/ActionListItem'
import CardDouble from '@components/CardDouble'
import Breadcrumbs from '@components/BreadCrumbs'
import Avatar from '@components/Avatar'
import Indent from '@components/Indent'
import Divider from '@components/Divider'
import Navigation from '@components/Navigation'
import ActionButton from '@components/ActionButton'
import DebugGrid from '@components/DebugGrid'
import BlockLoader from '@components/BlockLoader'

function App() {
  return (
    <DefaultLayout previewPixelSRC="/favicon.ico">
      <DebugGrid />
      <Navigation
        logo="✎"
        left={<ActionButton>ARCHIVE</ActionButton>}
        right={<ActionButton>ABOUT</ActionButton>}
      >
        <ActionButton>MY BLOG</ActionButton>
      </Navigation>
      <br />
      <Grid>
        <Row>
          TERMINAL BLOG <Badge>1.0.0</Badge>
        </Row>
        <Row>A personal blog with terminal aesthetics using SRCL</Row>
      </Grid>

      <Grid>
        <CardDouble title="Getting Started with SRCL: Building a Terminal-Themed Blog">
          <Breadcrumbs
            items={[
              {
                name: `Home`,
                url: '/',
              },
              {
                name: `Tutorials`,
                url: '/tutorials',
              },
              {
                name: `Getting Started with SRCL`,
              },
            ]}
          />
          <br />
          <br />
          <Avatar src="https://github.com/github.png" href="https://github.com">
            <Indent>
              JANE DOE
              <br />
              December 5, 2023
            </Indent>
          </Avatar>
          <br />
          <Divider type="DOUBLE" />
          <br />
          <br />
          <br />
          I recently discovered SRCL, an incredible open-source React component library for building applications with terminal aesthetics. In this post, I'll walk you through how I set up this blog.
          <br />
          <br />
          SRCL (Sacred React Component Library) provides a complete set of UI components that mimic the look and feel of classic terminal interfaces. The clean, monospace design gives your site a distinctive retro vibe while maintaining excellent readability.
          <br />
          <br />
          To get started, I added the SRCL repository as a Git submodule and configured my Vite project to use it. The integration was surprisingly smooth, and I was able to create this blog in just a few hours.
          <br />
          <br />
          The components I've found most useful so far are:
          <br />
          <br />
          • CardDouble - For creating post containers<br />
          • Breadcrumbs - For navigation trails<br />
          • Avatar - For author information<br />
          • Divider - For separating content sections
          <br />
          <br />
          I'm still exploring all the possibilities, but I'm already impressed with how flexible and well-designed this system is.
        </CardDouble>
        <br />

        <CardDouble title="The Return of Minimalist Web Design">
          <Breadcrumbs
            items={[
              {
                name: `Home`,
                url: '/',
              },
              {
                name: `Design`,
                url: '/design',
              },
              {
                name: `Minimalism`,
              },
            ]}
          />
          <br />
          <br />
          <Avatar src="https://github.com/github.png" href="https://github.com">
            <Indent>
              JANE DOE
              <br />
              December 2, 2023
            </Indent>
          </Avatar>
          <br />
          <Divider type="DOUBLE" />
          <br />
          <br />
          <br />
          In a world of increasingly cluttered websites, there's something refreshing about the return to minimalist design principles. The terminal aesthetic, in particular, strips away unnecessary visual elements and focuses on what matters most: content.
          <br />
          <br />
          I'm drawn to terminal-inspired interfaces because they evoke a sense of nostalgia while simultaneously feeling timeless. There's a purity to the monospace text, the limited color palette, and the structured layout that creates a distraction-free reading experience.
          <br />
          <br />
          The web has come full circle in some ways. We began with simple text-based designs, moved toward increasingly complex and flashy interfaces, and now many designers are returning to minimalist principles—albeit with modern technological underpinnings.
          <br />
          <br />
          What I appreciate about libraries like SRCL is how they make these aesthetic choices accessible to developers without requiring deep design expertise. The components provide a cohesive visual language out of the box.
          <br />
          <br />
          <Divider />
          <br />
          As we move forward, I expect to see more websites embracing this kind of restrained design approach, focusing on readability, performance, and content rather than flashy animations and complex layouts.
        </CardDouble>
        <br />
        
        <CardDouble title="Work in progress...">
          <Row>
            <BlockLoader mode={9} /> More posts coming soon...
          </Row>
        </CardDouble>
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

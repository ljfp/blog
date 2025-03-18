import * as React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@components/Grid'
import Row from '@components/Row'
import CardDouble from '@components/CardDouble'
import Badge from '@components/Badge'
import Divider from '@components/Divider'
import ActionListItem from '@components/ActionListItem'

const HomePage: React.FC = () => {
  return (
    <>
      <Grid>
        <Row>
          LJFP's BLOG <Badge>1.0.0</Badge>
        </Row>
        <Row>A personal blog with terminal aesthetics using SRCL</Row>
      </Grid>

      <Grid>
        <CardDouble title="ABOUT ME">
          <p>
            Hello! I'm LJFP, a developer with a passion for clean, minimal design and efficient code. 
            This blog is my space to share thoughts on technology, design, and anything else that 
            catches my interest.
          </p>
          <br />

          <p>
            I built this site using SRCL (Sacred React Component Library), which provides these 
            wonderful terminal-inspired components that you see throughout the site.
          </p>
          <br />
          
          <Divider type="GRADIENT" />
          <br />
          
          <p>
            Feel free to explore the different sections of my blog. You'll find my 
            collected writings in the Archive section.
          </p>
        </CardDouble>
      </Grid>

      <Grid>
        <ActionListItem icon={`⭢`} component={Link} to="/archive">
          Browse Post Archive
        </ActionListItem>
        <ActionListItem icon={`⭢`} href="https://github.com/internet-development/www-sacred" target="_blank">
          View SRCL source code
        </ActionListItem>
      </Grid>
    </>
  )
}

export default HomePage
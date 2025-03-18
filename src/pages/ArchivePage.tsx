import * as React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Grid from '@components/Grid'
import Row from '@components/Row'
import CardDouble from '@components/CardDouble'
import BlockLoader from '@components/BlockLoader'
import Divider from '@components/Divider'
import ActionListItem from '@components/ActionListItem'
import { getAllPosts, BlogPost } from '../utils/blog'

const ArchivePage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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

  return (
    <>
      <Grid>
        <Row>ARCHIVE</Row>
        <Row>Browse all blog posts</Row>
      </Grid>

      <Grid>
        {loading ? (
          <CardDouble title="Loading posts...">
            <Row>
              <BlockLoader mode={9} /> Please wait...
            </Row>
          </CardDouble>
        ) : posts.length > 0 ? (
          <CardDouble title="ALL POSTS">
            {posts.map((post, index) => (
              <React.Fragment key={post.meta.slug}>
                <Link 
                  to={`/post/${post.meta.slug}`}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <Row style={{ marginBottom: '4px', fontWeight: 'bold' }}>
                    {post.meta.title}
                  </Row>
                  <Row style={{ opacity: 0.7, fontSize: '0.9em', marginBottom: '6px' }}>
                    {post.meta.date} {post.meta.tags && post.meta.tags.map(tag => `#${tag.toLowerCase()}`).join(' ')}
                  </Row>
                </Link>
                {index < posts.length - 1 && <><Divider /><br /></>}
              </React.Fragment>
            ))}
          </CardDouble>
        ) : (
          <CardDouble title="No posts found">
            <Row>
              No blog posts have been created yet. Add Markdown files to the content/posts directory.
            </Row>
          </CardDouble>
        )}
      </Grid>

      <Grid>
        <ActionListItem icon={`⭠`} component={Link} to="/">
          Back to Home
        </ActionListItem>
      </Grid>
    </>
  )
}

export default ArchivePage
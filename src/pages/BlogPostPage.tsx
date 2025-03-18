import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Grid from '@components/Grid'
import Row from '@components/Row'
import CardDouble from '@components/CardDouble'
import BlockLoader from '@components/BlockLoader'
import ActionListItem from '@components/ActionListItem'

import { getPostBySlug, BlogPost } from '../utils/blog'
import MarkdownRenderer from '../components/MarkdownRenderer'

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      
      try {
        const foundPost = await getPostBySlug(slug);
        setPost(foundPost);
      } catch (error) {
        console.error(`Failed to load post with slug ${slug}:`, error);
      } finally {
        setLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);

  return (
    <>
      <Grid>
        {loading ? (
          <CardDouble title="Loading post...">
            <Row>
              <BlockLoader mode={9} /> Please wait...
            </Row>
          </CardDouble>
        ) : post ? (
          <MarkdownRenderer post={post} />
        ) : (
          <CardDouble title="Post not found">
            <Row>
              The requested post could not be found.
            </Row>
          </CardDouble>
        )}
      </Grid>

      <Grid>
        <ActionListItem icon={`⭠`} component={Link} to="/archive">
          Back to Archive
        </ActionListItem>
        <ActionListItem icon={`⭠`} component={Link} to="/">
          Back to Home
        </ActionListItem>
      </Grid>
    </>
  )
}

export default BlogPostPage
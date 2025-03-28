import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Divider from '@components/Divider'
import Breadcrumbs from '@components/BreadCrumbs'
import CardDouble from '@components/CardDouble'
import Row from '@components/Row'
import { BlogPost } from '../utils/blog'

interface MarkdownRendererProps {
  post: BlogPost;
}

export default function MarkdownRenderer({ post }: MarkdownRendererProps) {
    const { meta, content } = post
    
    const breadcrumbItems = [
      { name: 'Home', url: '/' },
      { name: 'Archive', url: '/archive' },
      ...(meta.category ? [{ name: meta.category, url: `/category/${meta.category.toLowerCase()}` }] : []),
      { name: meta.title }
    ]
  
  return (
    <CardDouble title={meta.title}>
      <Breadcrumbs items={breadcrumbItems} />
      <br />
      <Row>
        <span style={{ opacity: 0.7 }}>{meta.date}</span>
        {meta.tags && meta.tags.length > 0 && (
          <span style={{ marginLeft: '16px', opacity: 0.7 }}>
            {meta.tags.map((tag, i) => (
              <React.Fragment key={tag}>
                #{tag.toLowerCase().replace(/\s+/g, '-')}
                {i < (meta.tags?.length || 0) - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </span>
        )}
      </Row>
      <br />
      <Divider type="DOUBLE" />
      <br />
      <br />
      
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          p: ({children}) => <>{children}<br /><br /></>,
          h1: ({children}) => <><br />{children}<br /><br /></>,
          h2: ({children}) => <><br />{children}<br /><br /></>,
          h3: ({children}) => <>{children}<br /><br /></>,
          ul: ({children}) => <><br />{children}<br /></>,
          ol: ({children}) => <><br />{children}<br /></>,
          li: ({children}) => <>• {children}<br /></>,
          blockquote: ({children}) => (
            <>
              <Divider type="GRADIENT" />
              <br />
              {children}
              <br />
              <Divider type="GRADIENT" />
              <br />
            </>
          ),
          hr: () => <><br /><Divider /><br /></>,
          img: (props) => <img {...props} style={{ maxWidth: '100%' }} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </CardDouble>
  )
}
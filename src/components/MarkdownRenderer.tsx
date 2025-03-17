import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import Divider from '@components/Divider'
import Avatar from '@components/Avatar'
import Indent from '@components/Indent'
import Breadcrumbs from '@components/BreadCrumbs'
import CardDouble from '@components/CardDouble'
import { BlogPost } from '../utils/blog'

interface MarkdownRendererProps {
  post: BlogPost;
}

export default function MarkdownRenderer({ post }: MarkdownRendererProps) {
  const { meta, content } = post
  
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...(meta.category ? [{ name: meta.category, url: `/${meta.category.toLowerCase()}` }] : []),
    { name: meta.title }
  ]
  
  return (
    <CardDouble title={meta.title}>
      <Breadcrumbs items={breadcrumbItems} />
      <br />
      <br />
      <Avatar src={meta.authorImage || "https://github.com/github.png"} href="#">
        <Indent>
          {meta.author?.toUpperCase() || "ANONYMOUS"}
          <br />
          {meta.date}
        </Indent>
      </Avatar>
      <br />
      <Divider type="DOUBLE" />
      <br />
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
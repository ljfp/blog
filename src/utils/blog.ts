import matter from 'gray-matter'

export interface BlogPostMeta {
  title: string;
  date: string;
  author: string;
  authorImage?: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
  slug: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Use the correct format for Vite's glob imports - absolute path (with leading slash)
  const modules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default' })
  const posts: BlogPost[] = []
  
  console.log("Found markdown files:", Object.keys(modules))

  for (const path in modules) {
    try {
      const content = await modules[path]()
      const { data, content: markdownContent } = matter(content)
      
      // Extract slug from filename - adjust path handling
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      
      console.log("Processing file:", path, "with data:", data)
      
      // Only add if we have at least a title
      if (data.title) {
        posts.push({
          meta: { 
            ...data,
            slug,
            date: data.date ? new Date(data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'No date'
          } as BlogPostMeta,
          content: markdownContent
        })
      } else {
        console.warn(`Skipping file ${path} - missing title in frontmatter`)
      }
    } catch (error) {
      console.error(`Error processing markdown file at ${path}:`, error)
    }
  }

  console.log("Processed posts:", posts.length)

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.meta.slug === slug) || null;
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return null;
  }
}
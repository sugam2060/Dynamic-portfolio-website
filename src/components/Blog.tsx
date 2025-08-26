import get_blog_section from '../../actions/blog_section';
import { get_blog_heading } from '../../actions/Headings_class';
import BlogCard from './BlogCard';
import ViewAllPostsButton from './ViewAllPostsButton';

export default async function Blog() {
  const blogPosts = await get_blog_section();
  const blogHeading = await get_blog_heading();

  // Don't render component if no blog posts data
  if (!blogPosts || blogPosts.length === 0) {
    return null;
  }

  const recentPost = blogPosts[0]; // Get the first/most recent post
  
  // Check if the recent post is within 2 days
  const postDate = new Date(recentPost.publishedAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - postDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  
  const isRecentPost = daysDifference <= 2;

  if (!isRecentPost) {
    return null;
  }

  return (
    <section id="blog" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
          Navigating the Future with Technology
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            {blogHeading || 'Thoughts, insights, and tutorials about web development and technology.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <BlogCard post={recentPost} isRecent={true} />
          
          {/* More Posts Preview */}
          {blogPosts.length > 1 && (
            <ViewAllPostsButton postCount={blogPosts.length - 1} />
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  slug: string;
  featuredImage?: string;
}

interface BlogCardProps {
  post: BlogPost;
  isRecent?: boolean;
}

// Helper function to format date consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}/${day}/${year}`;
}

export default function BlogCard({ post, isRecent = false }: BlogCardProps) {
  const handleReadMore = () => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        {/* Blog Image */}
        {post.featuredImage ? (
          <div className="w-full h-64 relative">
            <Image 
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.featuredImage}`}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-portfolio-blue/20 to-blue-400/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-portfolio-blue/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-portfolio-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <p className="text-foreground/60">Blog Post Image</p>
            </div>
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-foreground/60">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-sm text-foreground/60">•</span>
            <span className="text-sm text-foreground/60">{post.readTime}</span>
          </div>
          {isRecent && (
            <span className="text-sm text-portfolio-blue font-medium">Recent Post</span>
          )}
        </div>
        <CardTitle className="text-2xl font-bold text-foreground group-hover:text-portfolio-blue transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-foreground/70 mb-6 leading-relaxed text-lg line-clamp-5">
          {post.excerpt}
        </CardDescription>
        

        
        <Button 
          className="bg-portfolio-blue hover:bg-portfolio-blue/90"
          onClick={handleReadMore}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}

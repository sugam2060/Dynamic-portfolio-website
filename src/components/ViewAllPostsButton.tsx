'use client';

import { Button } from '@/components/ui/button';

interface ViewAllPostsButtonProps {
  postCount: number;
}

export default function ViewAllPostsButton({ postCount }: ViewAllPostsButtonProps) {
  const handleViewAllPosts = () => {
    // Navigate to blog listing page
    window.location.href = '/blog';
  };

  return (
    <div className="mt-12 text-center">
      <p className="text-foreground/60 mb-4">
        {postCount} more blog post{postCount > 1 ? 's' : ''} available...
      </p>
      <Button 
        variant="outline" 
        className="border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white"
        onClick={handleViewAllPosts}
      >
        View All Posts
      </Button>
    </div>
  );
}

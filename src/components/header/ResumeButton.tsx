'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import get_resume from '../../../actions/get_resume';

export default function ResumeButton() {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  // Fetch resume URL on component mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const url = await get_resume();
        setResumeUrl(url);
      } catch {
        // Error fetching resume
      }
    };

    fetchResume();
  }, []);

  const handleResumeClick = () => {
    if (resumeUrl) {
      window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Button 
      className="bg-portfolio-blue hover:bg-portfolio-blue/90"
      onClick={handleResumeClick}
      disabled={!resumeUrl}
    >
      Resume
    </Button>
  );
}

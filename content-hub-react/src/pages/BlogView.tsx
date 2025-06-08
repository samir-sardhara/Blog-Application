
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import { blogAPI } from '../services/api';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogAPI.getBlogById(Number(id)),
    enabled: !!id,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
            <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
            <Link to="/" className="text-primary hover:text-primary/80">
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <article>
          <Card className="shadow-lg">
            <CardContent className="p-8">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{blog.user.firstName} {blog.user.lastName}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(blog.createdDate)}</span>
                  </div>
                  
                  <Badge variant="secondary">
                    {blog.content.length} characters
                  </Badge>
                  
                  {blog.updatedDate !== blog.createdDate && (
                    <Badge variant="outline">
                      Updated: {formatDate(blog.updatedDate)}
                    </Badge>
                  )}
                </div>
              </header>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>

              {/* Footer */}
              <footer className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Written by {blog.user.firstName} {blog.user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Published on {formatDate(blog.createdDate)}
                  </div>
                </div>
              </footer>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
};

export default BlogView;

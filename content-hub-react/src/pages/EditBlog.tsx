
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/Header';
import { blogAPI } from '../services/api';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: blog, isLoading: blogLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogAPI.getBlogById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await blogAPI.updateBlog(Number(id), { title, content });
      toast({
        title: "Blog updated!",
        description: "Your blog post has been updated successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (blogLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading blog post...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-600 mt-1">Update your story</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Your Story</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter an engaging title for your blog post"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Tell your story here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[400px] text-base leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-500">
                  {content.length} characters
                </div>
                <div className="flex space-x-3">
                  <Link to="/dashboard">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Updating...' : 'Update Blog'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditBlog;

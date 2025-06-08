
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { blogAPI } from '../services/api';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      await blogAPI.createBlog({ title, content }, user!.id);
      toast({
        title: "Blog created!",
        description: "Your blog post has been published successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="text-gray-600 mt-1">Share your thoughts with the world</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Write Your Story</CardTitle>
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
                <p className="text-sm text-gray-500">
                  A good title captures attention and summarizes your post
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Tell your story here... Share your thoughts, experiences, or knowledge with your readers."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="min-h-[400px] text-base leading-relaxed"
                />
                <p className="text-sm text-gray-500">
                  Write your complete blog post content. You can edit this later.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-500">
                  {content.length} characters written
                </div>
                <div className="flex space-x-3">
                  <Link to="/dashboard">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Publishing...' : 'Publish Blog'}
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

export default CreateBlog;

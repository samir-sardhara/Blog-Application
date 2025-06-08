
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { blogAPI } from '../services/api';
import { useToast } from '@/hooks/use-toast';
import { PenTool, Eye, Edit, Trash2, Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const { data: blogsData, isLoading, refetch } = useQuery({
    queryKey: ['user-blogs', user?.id, currentPage],
    queryFn: () => blogAPI.getAllBlogsByUserId(user!.id, currentPage, pageSize),
    enabled: !!user,
  });

  const handleDeleteBlog = async (blogId: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(blogId);
        toast({
          title: "Blog deleted",
          description: "Your blog has been deleted successfully.",
        });
        refetch();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete blog. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading your blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your blog posts and create new content
              </p>
            </div>
            <Link to="/create-blog" className="mt-4 sm:mt-0">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Blog Post</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <PenTool className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    {blogsData?.totalElements || 0}
                  </p>
                  <p className="text-gray-600">Total Posts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">
                    {blogsData?.content?.filter(blog => {
                      const blogDate = new Date(blog.createdDate);
                      const today = new Date();
                      return blogDate.toDateString() === today.toDateString();
                    }).length || 0}
                  </p>
                  <p className="text-gray-600">Posts Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-semibold text-gray-900">--</p>
                  <p className="text-gray-600">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Your Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {blogsData?.content && blogsData.content.length > 0 ? (
              <>
                <div className="space-y-4">
                  {blogsData.content.map((blog) => (
                    <div
                      key={blog.id}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {blog.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(blog.createdDate)}
                            </span>
                            <Badge variant="secondary">
                              {blog.content.length} characters
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-4 sm:mt-0 sm:ml-4">
                          <Link to={`/blog/${blog.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Link to={`/edit-blog/${blog.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {blogsData.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    <span className="text-sm text-gray-600">
                      Page {currentPage + 1} of {blogsData.totalPages}
                    </span>
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(blogsData.totalPages - 1, prev + 1))}
                      disabled={currentPage >= blogsData.totalPages - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blog posts yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start writing your first blog post to share your thoughts with the world.
                </p>
                <Link to="/create-blog">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;

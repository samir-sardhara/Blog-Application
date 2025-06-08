
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '../components/Header';
import { PenTool, BookOpen, Users, Zap } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your Stories with the World
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create, publish, and share your thoughts through beautiful blog posts. 
            Join our community of writers and readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Writing Today
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <PenTool className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Writing</h3>
              <p className="text-gray-600">
                Intuitive editor makes it simple to create and format your blog posts.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Organize Content</h3>
              <p className="text-gray-600">
                Manage all your blog posts in one place with our dashboard.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Build Audience</h3>
              <p className="text-gray-600">
                Connect with readers and grow your following through engaging content.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Zap className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Blogging Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of writers who are already sharing their stories.
          </p>
          <Link to="/register">
            <Button size="lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;

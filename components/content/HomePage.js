import Link from 'next/link';
import { Flame, Users, MessageSquare, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import FeatureCard from '@/components/ui/FeatureCard';

export default function HomePage() {
  return (
    <div className="relative">

      {/* Hero Section */}
      <div className="relative flex justify-center">
        {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025')] bg-cover bg-center opacity-10" /> */}
        <div className="relative z-10 container mx-auto px-2 text-center">
          {/* <div className="flex justify-center mb-6">
            <Flame className="h-16 w-16 text-orange-500 animate-pulse" />
          </div> */}
          <h2 className="text-2xl mb-10 text-white/50 text-orange-400/80">
            Campfire Film Cooperative
          </h2>
          <h1 className="text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">
            Gather Around the Campfire
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join a warm community of storytellers and filmmakers. Share your stories,
            find your crew, and bring your vision to life.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Button href="/signup" size="lg" className="bg-orange-500 hover:bg-orange-600">
              {/* <Link href="/signup">Join the Circle</Link> */}
              Join the Circle
            </Button>
            <Button href="/explore" size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
              {/* <Link href="/explore">Explore Stories</Link> */}
              Explore Stories
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Share Your Story with Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Flame className="w-10 h-10 text-orange-500" />}
              title="Light Your Spark"
              description="Share your films, ideas, and behind-the-scenes moments with a community that celebrates creativity."
            />
            <FeatureCard
              icon={<Users className="w-10 h-10 text-orange-500" />}
              title="Find Your Crew"
              description="Connect with passionate filmmakers who share your vision and creative spirit."
            />
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10 text-orange-500" />}
              title="Share Wisdom"
              description="Exchange knowledge and receive guidance from experienced storytellers."
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10 text-orange-500" />}
              title="Fuel Your Growth"
              description="Build meaningful connections that spark opportunities and inspire growth."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
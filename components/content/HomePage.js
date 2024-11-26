import Link from 'next/link';
import { Flame, Users, MessageSquare, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';
import FeatureCard from '@/components/ui/FeatureCard';
import LogoFull from '@/components/icons/LogoFull';

export default function HomePage() {
  return (
    <div className="relative">

      {/* Hero Section */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 container mx-auto py-1 pb-8 text-center">
          {/* <div className="flex justify-center mb-6">
            <Flame className="h-16 w-16 text-orange-500 animate-pulse" />
          </div> */}
          <h2 className="text-2xl mb-14 text-orange-400/90">
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
            <Button size="lg">
              <Link href="/auth/signup">Join the Circle</Link>
            </Button>
            <Button href="/explore" size="lg" variant="outline" className="opacity-80">
              <Link href="/explore">Explore Stories</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="pt-14 pb-10">
        <div className="container mx-auto px-0">
          <h2 className="text-4xl font-bold text-center mb-10 text-white/80">
            Share Your Story with Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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

          <div className="flex flex-col md:flex-row gap-8 justify-center mb-16">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
          <div className="flex justify-center opacity-60 px-2">
            <LogoFull size={400} color="#EA580C" />
          </div>

        </div>
      </div>
    </div>
  )
}
import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navigation/Navbar';
import HeroSection from './HeroSection';
import { Shield, Zap, Heart, Users, Star, ArrowRight } from 'lucide-react';
import firstimg from './firstvirtual.jpg';
import secondimg from './secondvirtual.jpg';
import thirdimg from './thirdvertual.jpg';

const CosmicBackground = React.lazy(() => import('../3D/CosmicBackground'));


const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'End-to-end encryption ensures your conversations remain private and secure.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Advanced machine learning provides personalized mental health recommendations.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Heart,
      title: 'Empathetic Support',
      description: '24/7 emotional support tailored to your unique needs and preferences.',
      color: 'from-pink-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'Connect with others on similar journeys in a safe, moderated environment.',
      color: 'from-green-500 to-teal-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      age: 17,
      text: 'This app helped me understand my anxiety patterns and gave me tools to cope better.',
      rating: 5,
      avatar: '🌟'
    },
    {
      name: 'Alex K.',
      age: 19,
      text: 'Having a digital companion that understands me 24/7 has been life-changing.',
      rating: 5,
      avatar: '✨'
    },
    {
      name: 'Jamie L.',
      age: 16,
      text: 'The mood tracking helped me identify triggers I never noticed before.',
      rating: 5,
      avatar: '💫'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Suspense fallback={<div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading...</div>}>
        <CosmicBackground />
      </Suspense>
      <Navbar />
      
      <div className="relative z-10">
        <HeroSection />
        
        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Revolutionizing Youth Mental Health
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Our AI-powered digital twin creates a personalized mental wellness experience, 
                providing young people with the tools, insights, and support they need to thrive 
                in today's complex world.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Personalized AI Companion',
                  description: 'Your digital twin learns from your interactions and adapts to provide personalized support and guidance.',
                  icon: '🤖'
                },
                {
                  title: 'Real-time Mood Tracking',
                  description: 'Advanced analytics help you understand emotional patterns and triggers for better self-awareness.',
                  icon: '📊'
                },
                {
                  title: 'Crisis Prevention',
                  description: 'Proactive monitoring and alerts help prevent mental health crises before they escalate.',
                  icon: '🛡️'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 bg-gray-900">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center text-white mb-8">
      Our Gallery
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex justify-center">
        <img
          src={firstimg}
          alt="Gallery 1"
          className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex justify-center">
        <img
          src={secondimg}
          alt="Gallery 2"
          className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex justify-center">
        <img
        src={thirdimg}
          alt="Gallery 3"
          className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  </div>
</section>


        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Powerful Features for Mental Wellness
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Comprehensive tools designed to support every aspect of your mental health journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 p-8 group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-white/80 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Real Stories, Real Impact
              </h2>
              <p className="text-xl text-white/80">
                See how we're making a difference in young people's lives
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-white/60 text-sm">Age {testimonial.age}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white/80 italic">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="get-started" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-black/20 backdrop-blur-md rounded-3xl border border-white/20 p-12"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Healing Journey?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of young people who are taking control of their mental health 
                with AI-powered personalized support.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/signup'}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl font-bold px-8 py-4 rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <p className="text-white/60 mt-4">No credit card required • Free forever</p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
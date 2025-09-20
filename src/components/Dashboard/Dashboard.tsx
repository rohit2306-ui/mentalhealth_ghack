import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { MessageCircle, TrendingUp, Book, User, Heart, Brain, Award, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, orderBy, limit, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CosmicBackground from '../3D/CosmicBackground';
import ghack_vedio from './ghack_vedio.mp4'
import usertalk from './usertalk.png'

const Avatar3D: React.FC<{ position: [number, number, number], color: string }> = ({ position, color }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh position={position}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

interface MoodData {
  date: string;
  mood: number;
  timestamp: any;
}

const Dashboard: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [currentMood, setCurrentMood] = useState(5);
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [isSubmittingMood, setIsSubmittingMood] = useState(false);

  const moodEmojis = ['😢', '😟', '😐', '🙂', '😊', '😄', '🤩', '🥳', '😍', '🌟'];
  const moodLabels = ['Terrible', 'Bad', 'Poor', 'Fair', 'Okay', 'Good', 'Great', 'Amazing', 'Fantastic', 'Perfect'];

  useEffect(() => {
    if (!currentUser) return;

    const moodQuery = query(
      collection(db, `users/${currentUser.uid}/moodHistory`),
      orderBy('timestamp', 'desc'),
      limit(30)
    );

    const unsubscribe = onSnapshot(moodQuery, (snapshot) => {
      const moods = snapshot.docs.map(doc => ({
        ...doc.data() as MoodData,
        id: doc.id
      }));
      setMoodHistory(moods.reverse()); // Reverse to show chronological order
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleMoodSubmit = async () => {
    if (!currentUser || isSubmittingMood) return;

    setIsSubmittingMood(true);
    try {
      await addDoc(collection(db, `users/${currentUser.uid}/moodHistory`), {
        mood: currentMood,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setIsSubmittingMood(false);
    }
  };

  const stats = [
    { icon: Heart, label: 'Mood Average', value: moodHistory.length > 0 ? (moodHistory.reduce((sum, m) => sum + m.mood, 0) / moodHistory.length).toFixed(1) : '0', color: 'text-pink-400' },
    { icon: Brain, label: 'Sessions', value: '12', color: 'text-cyan-400' },
    { icon: Award, label: 'Achievements', value: '5', color: 'text-purple-400' },
    { icon: Target, label: 'Goals Met', value: '8/10', color: 'text-green-400' }
  ];

  const quickActions = [
    { icon: MessageCircle, label: 'Continue Chat', action: () => {}, color: 'from-cyan-500 to-blue-600' },
    { icon: TrendingUp, label: 'Progress', action: () => {}, color: 'from-purple-500 to-pink-600' },
    { icon: Book, label: 'Journal', action: () => {}, color: 'from-green-500 to-teal-600' },
    { icon: User, label: 'Profile', action: () => {}, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      
      <div className="relative z-10 min-h-screen p-4 pt-20">
<img 
  src={usertalk} 
  alt="" 
  className="w-4/5 mx-auto object-cover rounded-xl h-50" 
/>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {userProfile?.displayName || 'there'}! 👋
            </h1>
            <p className="text-white/70">How are you feeling today?</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* 3D Avatars Section */}
            {/* Video Section */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.2 }}
  className="lg:col-span-2 w-full h-full md:h-full bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
>
  <video
    src={ghack_vedio}
    autoPlay
    loop
   
    playsInline
    controls
    preload="metadata"
    poster="/path/to/thumbnail.jpg"
    className="w-full h-full object-cover rounded-2xl"
  />
</motion.div>


           

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-black/20 backdrop-blur-md rounded-xl border border-white/20 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white/80 text-sm">{stat.label}</span>
                      </div>
                      <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Mood Tracker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Today's Mood</h2>
              
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">{moodEmojis[currentMood - 1]}</div>
                <p className="text-white/80 text-lg">{moodLabels[currentMood - 1]}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">😢</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentMood}
                    onChange={(e) => setCurrentMood(Number(e.target.value))}
                    className="flex-1 mx-4 accent-cyan-400"
                  />
                  <span className="text-white/60 text-sm">🌟</span>
                </div>
                
                <button
                  onClick={handleMoodSubmit}
                  disabled={isSubmittingMood}
                  className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmittingMood ? 'Saving...' : 'Save Mood'}
                </button>
              </div>
            </motion.div>

            {/* Mood History Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Mood Trend</h2>
              
              {moodHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={moodHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <YAxis 
                      domain={[1, 10]}
                      stroke="rgba(255,255,255,0.5)"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#00ffff" 
                      strokeWidth={3}
                      dot={{ fill: '#00ffff', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-48 text-white/60">
                  Start tracking your mood to see trends!
                </div>
              )}
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className={`bg-gradient-to-r ${action.color} p-6 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2" />
                  <span className="block text-sm">{action.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
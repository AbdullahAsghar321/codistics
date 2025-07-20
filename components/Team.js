"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, Linkedin, Github, Award, Coffee, ChevronLeft, ChevronRight } from "lucide-react"

export default function UniqueTeamSection() {
  const [activeCard, setActiveCard] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch team data from API
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/api/teams')
        if (!response.ok) {
          throw new Error('Failed to fetch team data')
        }
        const data = await response.json()
        setTeamMembers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
        setIsClient(true)
      }
    }

    fetchTeamData()
  }, [])

  // Generate random colors for team members
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
    "#FFEAA7", "#DDA0DD", "#FFB6C1", "#F4A460"
  ]

  // Add default values for missing fields
  const getMemberWithDefaults = (member) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const initials = member.name.split(' ').map(n => n[0]).join('')
    
    return {
      ...member,
      img: `/team/${member.name.toLowerCase().split(' ')[0]}.jpg`,
      color: randomColor,
      hobby: member.hobby || "Professional",
      quote: member.quote || "Passionate about my work",
      skills: member.skills || ["Teamwork", "Communication"]
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  }

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 3)) % Math.ceil(teamMembers.length / 3))
  }

  // Get visible members for carousel
  const getVisibleMembers = () => {
    const membersPerSlide = 3
    const startIndex = currentSlide * membersPerSlide
    return teamMembers.slice(startIndex, startIndex + membersPerSlide)
  }

  const TeamCard = ({ member, index }) => {
    const memberData = getMemberWithDefaults(member)
    
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.05, rotateY: 5 }}
        className="relative group cursor-pointer"
        onClick={() => setActiveCard(activeCard === index ? null : index)}
      >
        <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border-2 border-gray-100 hover:border-[#B6F500]">
          {/* Color accent bar */}
          <div 
            className="absolute top-0 left-0 w-full h-1"
            style={{ backgroundColor: memberData.color }}
          />
          
          {/* Profile image with overlay */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <motion.div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              style={{ backgroundColor: memberData.color }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {memberData.name.split(' ').map(n => n[0]).join('')}
            </motion.div>
            
            {/* Floating elements */}
            {isClient && (
              <motion.div 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#B6F500] shadow-md flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="w-4 h-4 text-black" />
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{memberData.name}</h3>
              <Coffee className="w-4 h-4 text-[#B6F500]" />
            </div>
            <p className="text-[#B6F500] font-medium mb-3">{memberData.role}</p>
            <p className="text-gray-600 text-sm mb-4">{memberData.description}</p>
            
            {/* Skills tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {memberData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-[#B6F500] text-black font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Hobby and quote - only show when active */}
            {isClient && (
              <AnimatePresence>
                {activeCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t pt-4"
                  >
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Hobby:</span> {memberData.hobby}
                    </p>
                    <p className="text-sm italic text-gray-500">"{memberData.quote}"</p>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  if (!isClient || loading) {
    return (
      <section className="py-20 bg-[#FFFADC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="alfa-slab-one-regular text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Meet Our Amazing <span className="text-[#B6F500]">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading our team members...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-[#FFFADC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="alfa-slab-one-regular text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Team Unavailable
          </h2>
          <p className="text-lg text-red-500 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#B6F500] text-black font-medium rounded-md hover:bg-[#A5E000] transition"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#FFFADC] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#B6F500] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="alfa-slab-one-regular text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Meet Our Amazing <span className="text-[#B6F500]">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals who make magic happen every day
            </p>
          </motion.div>

          {/* View mode toggle */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-full transition-all ${
                viewMode === 'grid' 
                  ? 'bg-[#B6F500] text-black' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-6 py-2 rounded-full transition-all ${
                viewMode === 'carousel' 
                  ? 'bg-[#B6F500] text-black' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Carousel View
            </button>
          </div>
        </div>

        {/* Team display */}
        {viewMode === 'grid' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="relative">
            {/* Carousel navigation */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#B6F500] hover:text-black transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(teamMembers.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-[#B6F500]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#B6F500] hover:text-black transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Carousel content */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getVisibleMembers().map((member, index) => (
                <TeamCard key={`${currentSlide}-${index}`} member={member} index={currentSlide * 3 + index} />
              ))}
            </motion.div>
          </div>
        )}

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: teamMembers.length.toString(), label: "Team Members" },
            { number: "50+", label: "Projects Completed" },
            { number: "99%", label: "Client Satisfaction" },
            { number: "5", label: "Years Experience" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-[#B6F500] mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Hiring section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center bg-gradient-to-r from-[#B6F500] to-[#9ED600] rounded-xl p-12 shadow-xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            className="text-6xl mb-6"
          >
            🚀
          </motion.div>
          <h3 className="text-3xl font-bold mb-4 text-gray-900">We're Growing!</h3>
          <p className="text-lg text-gray-900 mb-8 max-w-2xl mx-auto">
            Ready to join our incredible team? We're always looking for talented individuals who share our passion for innovation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition duration-300 shadow-lg"
          >
            View Open Positions
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
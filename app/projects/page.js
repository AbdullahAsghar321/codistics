// app/projects/page.jsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'

const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'web-design', name: 'Web Design' },
  { id: 'graphic-design', name: 'Graphic Design' },
  { id: 'video-editing', name: 'Video Editing' }
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use relative path for API route
        const response = await fetch('/api/projects', {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Validate the received data
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API')
        }
        
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  if (loading) {
    return (
      <div className="bg-[#FFFADC] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B6F500]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-[#FFFADC] min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-500 text-lg mb-4">Error loading projects: {error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="primary"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-[#FFFADC] min-h-screen">
      {/* Hero */}
      <section className="py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Our <span className="text-[#B6F500]">Projects</span>
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our portfolio of creative work and success stories
        </p>
      </section>

      {/* Filter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mb-16 overflow-x-auto"
      >
        <div className="flex space-x-2 px-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-[#B6F500] text-black'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">No projects found in this category.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map(project => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-60">
                  {project.image && project.image.startsWith('http') ? (
                    <Image
                      src={project.image}
                      alt={project.title || 'Project image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags?.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title || 'Untitled Project'}</h3>
                  <p className="text-gray-600 mb-4">{project.description || 'No description available'}</p>
                  {project.link && (
                    <Button 
                      href={project.link.startsWith('http') ? project.link : `/${project.link}`}
                      variant="outline" 
                      className="w-full"
                    >
                      View Case Study
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to start your project?</h3>
          <Button href="/contact" variant="primary" size="lg">
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
import { skills } from "@/data/content";

export function Skills() {
  // Mengambil kategori unik secara otomatis dari data/content.ts
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Core Competencies</h2>
          <p className="text-gray-400 max-w-2xl">
            A balanced skill set blending business process optimization with technical execution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category} 
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-lg font-semibold mb-6 border-b border-white/10 pb-4 text-white">
                {category}
              </h3>
              <ul className="space-y-4">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <li key={skill.name} className="flex items-start text-gray-300">
                      {/* Ikon Centang Elegan */}
                      <svg 
                        className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium leading-relaxed">{skill.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
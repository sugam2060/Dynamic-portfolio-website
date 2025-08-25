import { get_skills_heading } from "../../actions/Headings_class";
import get_skills_section from "../../actions/skills_section";

// This interface matches the SkillResult from the action
interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
}


export default async function Skills() {

  const skills: Skill[] = await get_skills_section()
  const skillsHeading = await get_skills_heading()

  // Don't display component if no skills data
  if (!skills || skills.length === 0) {
    return null;
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case 'expert':
        return 'text-emerald-600 border-emerald-200 bg-emerald-50';
      case 'advanced':
        return 'text-portfolio-blue border-portfolio-blue/20 bg-portfolio-blue/5';
      case 'intermediate':
        return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'beginner':
        return 'text-slate-600 border-slate-200 bg-slate-50';
      default:
        return 'text-portfolio-blue border-portfolio-blue/20 bg-portfolio-blue/5';
    }
  };

  const getProficiencyLabel = (proficiency: string) => {
    switch (proficiency.toLowerCase()) {
      case 'expert':
        return 'Expert';
      case 'advanced':
        return 'Advanced';
      case 'intermediate':
        return 'Intermediate';
      case 'beginner':
        return 'Beginner';
      default:
        return 'Advanced';
    }
  };



  // Group skills by proficiency level
  const skillsByProficiency = skills.reduce((acc, skill) => {
    const proficiency = skill.proficiency.toLowerCase();
    if (!acc[proficiency]) {
      acc[proficiency] = [];
    }
    acc[proficiency].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Sort proficiency levels in order
  const proficiencyLevels: string[] = ['expert', 'advanced', 'intermediate', 'beginner'];

  return (
    <section id="skills" className="section-padding">
      <div className="container-max">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {skillsHeading || "A comprehensive collection of technologies and tools I've mastered to build exceptional digital experiences."}
          </p>
        </div>

        {/* Skills by Proficiency Level */}
        <div className="space-y-8">
          {proficiencyLevels.map((level) => {
            const levelSkills = skillsByProficiency[level];
            if (!levelSkills || levelSkills.length === 0) return null;
            
            return (
              <div key={level} className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-6 ${
                    level === 'expert' ? 'bg-emerald-500' :
                    level === 'advanced' ? 'bg-portfolio-blue' :
                    level === 'intermediate' ? 'bg-amber-500' :
                    'bg-slate-500'
                  }`} />
                  <h3 className="text-xl font-medium text-foreground capitalize tracking-wide">
                    {getProficiencyLabel(level)} Level
                  </h3>
                  <span className="text-xs text-foreground/40 bg-foreground/5 px-2 py-1 rounded-full">
                    {levelSkills.length} skill{levelSkills.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {levelSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group bg-white dark:bg-slate-800/50 rounded-lg p-3 border border-border/50 hover:border-border transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-portfolio-blue transition-colors truncate">
                          {skill.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getProficiencyColor(skill.proficiency)}`}>
                          {getProficiencyLabel(skill.proficiency)}
                        </span>
                      </div>
                      
                      {/* Simple Proficiency Bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            skill.proficiency.toLowerCase() === 'expert' ? 'bg-emerald-500' :
                            skill.proficiency.toLowerCase() === 'advanced' ? 'bg-portfolio-blue' :
                            skill.proficiency.toLowerCase() === 'intermediate' ? 'bg-amber-500' :
                            'bg-slate-400'
                          }`}
                          style={{
                            width: skill.proficiency.toLowerCase() === 'expert' ? '100%' :
                                   skill.proficiency.toLowerCase() === 'advanced' ? '85%' :
                                   skill.proficiency.toLowerCase() === 'intermediate' ? '65%' :
                                   '45%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

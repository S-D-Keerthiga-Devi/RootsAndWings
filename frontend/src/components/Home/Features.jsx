import React from 'react';
import {
    CalendarCheck,
    Sprout,
    ShieldCheck,
    BrainCircuit,
    UsersRound
} from 'lucide-react';

const Features = () => {
    const features = [
        {
            title: "Smart Adoption System",
            description: "Data-driven recommendations highlighting days that need you most. Real-time impact calculations.",
            icon: <CalendarCheck className="w-6 h-6 text-slate-700" strokeWidth={1.5} />,
            highlight: "Algorithms over Inputs"
        },
        {
            title: "Roots of Love (Digital Twin)",
            description: "Adopt a sapling and watch its digital twin grow. Weekly photo updates from the admin.",
            icon: <Sprout className="w-6 h-6 text-slate-700" strokeWidth={1.5} />,
            highlight: "Gamified Philanthropy"
        },
        {
            title: "AI Resource Forecaster",
            description: "Gemini AI predicts shortages. 'Rice will run out in 9 days. Start a drive now.'",
            icon: <BrainCircuit className="w-6 h-6 text-slate-700" strokeWidth={1.5} />,
            highlight: "Generative AI Integration"
        },
        {
            title: "Trust & Safety Dashboard",
            description: "Transparency charts (Meals vs. Needs). AI automatically blurs children's faces for privacy.",
            icon: <ShieldCheck className="w-6 h-6 text-slate-700" strokeWidth={1.5} />,
            highlight: "Ethical AI & Data Viz"
        },

        {
            title: "Collaborative Adoption",
            description: "Pool resources to fund big events. Create teams, track leaderboards, and celebrate impact.",
            icon: <UsersRound className="w-6 h-6 text-slate-700" strokeWidth={1.5} />,
            highlight: "Social Proof & Relations"
        }
    ];

    return (
        // Reduced vertical padding (py-12 -> py-8, lg:py-20 -> lg:py-12)
        <section className="py-8 bg-slate-50 sm:py-10 lg:py-12" id="features">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

                {/* SECTION HEADER - Compacted margins */}
                <div className="text-center">
                    <p className="text-xs font-bold tracking-widest text-cyan-600 uppercase font-pj">
                        Why Roots & Wings?
                    </p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl font-pj">
                        Tech that bridges <span className="text-cyan-600">Generations</span>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 font-pj max-w-2xl mx-auto">
                        We build connections using advanced logic, AI, and gamification to ensure impact is trusted.
                    </p>
                </div>

                {/* FEATURES GRID - Reduced margins and gap */}
                <div className="grid grid-cols-1 mt-8 text-center sm:mt-10 sm:grid-cols-2 sm:gap-x-8 gap-y-8 md:grid-cols-3 md:gap-0">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            // Drastically reduced internal padding (p-14 -> p-6/p-8)
                            className={`md:p-6 lg:p-8 flex flex-col items-center group transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 rounded-xl
                ${index % 3 !== 0 ? 'md:border-l md:border-gray-200' : ''} 
                ${index >= 3 ? 'md:border-t md:border-gray-200' : ''}
              `}
                        >
                            {/* Smaller Icon Container (w-16 -> w-12) */}
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center group-hover:bg-cyan-50 group-hover:border-cyan-100 transition-colors duration-300">
                                {feature.icon}
                            </div>

                            {/* Tighter Text Spacing */}
                            <h3 className="mt-4 text-lg font-bold text-slate-900 font-pj group-hover:text-cyan-600 transition-colors">
                                {feature.title}
                            </h3>

                            <p className="mt-2 text-xs text-cyan-600 font-semibold tracking-wide uppercase bg-cyan-50 px-2 py-0.5 rounded-full">
                                {feature.highlight}
                            </p>

                            <p className="mt-3 text-sm leading-relaxed text-slate-600 font-pj">
                                {feature.description}
                            </p>
                        </div>
                    ))}

                    {/* FILLER SLOT - Compacted */}
                    <div className="md:p-6 lg:p-8 md:border-l md:border-t md:border-gray-200 flex flex-col items-center justify-center">
                        <div className="p-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50">
                            <p className="text-slate-400 text-sm font-medium">More coming soon...</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Features;
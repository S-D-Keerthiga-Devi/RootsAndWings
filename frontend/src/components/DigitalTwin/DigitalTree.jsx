import React from 'react';
import { motion } from 'framer-motion';

// --- CONFIGURATION ---
const TREE_COLORS = {
    trunk: "#8B5A2B", // Brown
    leafDark: "#2E7D32", // Dark Green
    leafLight: "#4CAF50", // Light Green
    pot: "#E0E0E0" // Light Grey
};

// --- PATH DATA FOR GROWTH STAGES ---
const STAGES = {
    // Sprout (Level 1)
    1: {
        trunkPath: "M50 90 Q50 85 50 75",
        leaves: [
            { d: "M50 75 Q40 70 35 75 Q40 85 50 75", delay: 0.5 },
            { d: "M50 75 Q60 70 65 75 Q60 85 50 75", delay: 0.7 }
        ]
    },
    // Sapling (Level 2)
    2: {
        trunkPath: "M50 90 Q55 70 50 50",
        branches: [
            { d: "M50 70 Q40 60 35 55", delay: 0.2 },
            { d: "M50 60 Q60 50 65 45", delay: 0.4 }
        ],
        leaves: [
            { d: "M35 55 Q30 50 25 55 Q30 65 35 55", delay: 0.6 },
            { d: "M65 45 Q70 40 75 45 Q70 55 65 45", delay: 0.8 },
            { d: "M50 50 Q40 40 45 35 Q55 40 50 50", delay: 1.0 }
        ]
    },
    // Young Tree (Level 3)
    3: {
        trunkPath: "M50 90 Q55 70 50 40",
        branches: [
            { d: "M50 70 Q30 60 20 65", delay: 0.2 },
            { d: "M50 60 Q70 50 80 55", delay: 0.3 },
            { d: "M50 50 Q35 40 30 30", delay: 0.4 },
            { d: "M50 45 Q65 35 70 25", delay: 0.5 }
        ],
        leaves: [
            // Cluster 1
            { d: "M20 65 Q15 60 10 65 Q15 75 20 65", delay: 0.6 },
            { d: "M20 65 Q25 60 30 65 Q25 75 20 65", delay: 0.7 },
            // Cluster 2
            { d: "M80 55 Q75 50 70 55 Q75 65 80 55", delay: 0.8 },
            { d: "M80 55 Q85 50 90 55 Q85 65 80 55", delay: 0.9 },
            // Top
            { d: "M50 40 Q40 30 45 20 Q55 30 50 40", delay: 1.1 }
        ]
    },
    // Mature Tree (Level 4) - Using a more complex canopy representation
    4: {
        trunkPath: "M50 90 L50 30",
        isMature: true
    }
};

const DigitalTree = ({ level = 1, actionType }) => {
    const stage = STAGES[level] || STAGES[1];
    const isWatering = actionType === 'water';
    const isSunny = actionType === 'sun';
    const isLove = actionType === 'care' || actionType === 'love';

    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* --- SVG DRAWING LAYER --- */}
            <svg viewBox="0 0 100 100" className="w-full h-full max-w-[300px] overflow-visible">

                {/* Pot Base (Static) */}
                <motion.ellipse
                    cx="50" cy="90" rx="15" ry="5" fill="#3E2723"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                />

                {/* --- DYNAMIC TRUNK --- */}
                <motion.path
                    d={stage.trunkPath}
                    fill="transparent"
                    stroke={TREE_COLORS.trunk}
                    strokeWidth={level >= 3 ? 4 : 2}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* --- BRANCHES (Levels 2 & 3) --- */}
                {stage.branches && stage.branches.map((branch, i) => (
                    <motion.path
                        key={`branch-${i}`}
                        d={branch.d}
                        fill="transparent"
                        stroke={TREE_COLORS.trunk}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: branch.delay }}
                    />
                ))}

                {/* --- LEAVES (All Levels) --- */}
                {stage.leaves && stage.leaves.map((leaf, i) => (
                    <motion.path
                        key={`leaf-${i}`}
                        d={leaf.d}
                        fill={TREE_COLORS.leafDark}
                        stroke="none"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: leaf.delay, type: "spring" }}
                        whileHover={{ scale: 1.2, fill: TREE_COLORS.leafLight }}
                    />
                ))}

                {/* --- MATURE CANOPY (Level 4) --- */}
                {stage.isMature && (
                    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 1 }}>
                        {/* Big Bushy Canopy */}
                        <circle cx="50" cy="30" r="25" fill={TREE_COLORS.leafDark} opacity="0.9" />
                        <circle cx="30" cy="40" r="15" fill={TREE_COLORS.leafDark} opacity="0.8" />
                        <circle cx="70" cy="40" r="15" fill={TREE_COLORS.leafDark} opacity="0.8" />
                        <circle cx="50" cy="15" r="15" fill={TREE_COLORS.leafLight} opacity="0.6" />
                    </motion.g>
                )}

            </svg>

            {/* --- INTERACTION EFFECTS (Particle Overlays) --- */}

            {/* 1. RAIN EFFECT */}
            {isWatering && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-4 bg-blue-400 rounded-full"
                            initial={{ y: -50, x: Math.random() * 300 - 150, opacity: 0 }}
                            animate={{ y: 200, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
            )}

            {/* 2. SUN EFFECT */}
            {isSunny && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                        className="w-40 h-40 rounded-full bg-amber-400 opacity-20 blur-2xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <svg className="absolute w-full h-full animate-[spin_10s_linear_infinite] opacity-50">
                        <path d="M50 50 L50 0" stroke="#FFCA28" strokeWidth="2" strokeDasharray="5,5" />
                        <path d="M50 50 L100 50" stroke="#FFCA28" strokeWidth="2" strokeDasharray="5,5" />
                        <path d="M50 50 L50 100" stroke="#FFCA28" strokeWidth="2" strokeDasharray="5,5" />
                        <path d="M50 50 L0 50" stroke="#FFCA28" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>
                </div>
            )}

            {/* 3. CARE/LOVE EFFECT (Subtle Aura, No Hearts) */}
            {isLove && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <motion.div
                        className="absolute rounded-full border-2 border-pink-300 opacity-50"
                        style={{ width: 100, height: 100 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute rounded-full border-2 border-pink-300 opacity-50"
                        style={{ width: 100, height: 100 }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity }}
                    />
                </div>
            )}

        </div>
    );
};

export default DigitalTree;

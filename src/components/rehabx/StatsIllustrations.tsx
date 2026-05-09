import { motion } from 'framer-motion';

// World map dots illustration
export function WorldMapIllustration() {
  // simplified continents as dot grid
  const dots: { x: number; y: number }[] = [];
  const shape = [
    '..XXXX...XXX....',
    '.XXXXXX.XXXXX...',
    '.XXXX...XXXXXX..',
    '..XX....XXXXXXX.',
    '...X.....XXXXX..',
    '....X....XXXX...',
    '....XX...XXX....',
    '.....XX..XX.....',
  ];
  shape.forEach((row, y) => {
    row.split('').forEach((c, x) => {
      if (c === 'X') dots.push({ x, y });
    });
  });
  return (
    <svg viewBox="0 0 80 40" className="w-full h-full">
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x * 5 + 2}
          cy={d.y * 5 + 2}
          r={1.4}
          fill="hsl(258 90% 66%)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: (i % 12) * 0.08 }}
        />
      ))}
    </svg>
  );
}

// 3D-style people illustration
export function PeopleIllustration() {
  return (
    <svg viewBox="0 0 80 60" className="w-full h-full">
      <defs>
        <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(258 90% 78%)" />
          <stop offset="100%" stopColor="hsl(258 90% 60%)" />
        </linearGradient>
      </defs>
      {/* back person */}
      <motion.g
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <circle cx="20" cy="22" r="7" fill="url(#pgrad)" />
        <path d="M8 50 Q8 36 20 36 Q32 36 32 50 Z" fill="url(#pgrad)" />
      </motion.g>
      <motion.g
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <circle cx="60" cy="22" r="7" fill="url(#pgrad)" />
        <path d="M48 50 Q48 36 60 36 Q72 36 72 50 Z" fill="url(#pgrad)" />
      </motion.g>
      {/* center / front person */}
      <motion.g
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <circle cx="40" cy="18" r="9" fill="url(#pgrad)" />
        <path d="M24 54 Q24 34 40 34 Q56 34 56 54 Z" fill="url(#pgrad)" />
      </motion.g>
    </svg>
  );
}

// Animated bar chart
export function BarChartIllustration() {
  const bars = [30, 50, 40, 65, 80];
  return (
    <svg viewBox="0 0 80 60" className="w-full h-full">
      <defs>
        <linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(258 90% 78%)" />
          <stop offset="100%" stopColor="hsl(258 90% 60%)" />
        </linearGradient>
      </defs>
      {/* trend line */}
      <motion.path
        d="M6 40 Q26 28 46 18 T76 6"
        fill="none"
        stroke="hsl(258 90% 66%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={8 + i * 14}
          width={9}
          rx={2}
          fill="url(#bgrad)"
          initial={{ height: 0, y: 54 }}
          animate={{ height: h * 0.55, y: 54 - h * 0.55 }}
          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
        />
      ))}
    </svg>
  );
}

// Donut / progress ring
export function DonutIllustration({ percent = 94 }: { percent?: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <defs>
        <linearGradient id="dgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(258 90% 70%)" />
          <stop offset="100%" stopColor="hsl(220 85% 60%)" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r={r} stroke="hsl(258 90% 92%)" strokeWidth="6" fill="none" />
      <motion.circle
        cx="30"
        cy="30"
        r={r}
        stroke="url(#dgrad)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-90 30 30)"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * percent) / 100 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      <text
        x="30"
        y="34"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="hsl(258 90% 60%)"
      >
        {percent}%
      </text>
    </svg>
  );
}

// Analytics dashboard mock illustration
export function AnalyticsIllustration() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full">
      <defs>
        <linearGradient id="agrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(0 0% 100%)" />
          <stop offset="100%" stopColor="hsl(258 60% 96%)" />
        </linearGradient>
        <linearGradient id="agrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(258 90% 78%)" />
          <stop offset="100%" stopColor="hsl(258 90% 60%)" />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ y: 4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <rect x="10" y="8" width="80" height="64" rx="6" fill="url(#agrad)" stroke="hsl(258 60% 88%)" strokeWidth="0.8" />
        {/* line chart */}
        <motion.path
          d="M16 40 Q28 28 38 32 T58 22 T82 18"
          fill="none"
          stroke="url(#agrad2)"
          strokeWidth="1.8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
        />
        {/* donut */}
        <circle cx="28" cy="58" r="7" stroke="hsl(258 60% 90%)" strokeWidth="2.5" fill="none" />
        <motion.circle
          cx="28" cy="58" r="7"
          stroke="url(#agrad2)" strokeWidth="2.5" fill="none" strokeLinecap="round"
          transform="rotate(-90 28 58)"
          strokeDasharray={2 * Math.PI * 7}
          initial={{ strokeDashoffset: 2 * Math.PI * 7 }}
          animate={{ strokeDashoffset: (2 * Math.PI * 7) * 0.3 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
        {/* small bars */}
        {[5,8,4,9].map((h,i)=>(
          <motion.rect key={i} x={48+i*7} width={4} rx={1} fill="url(#agrad2)"
            initial={{ height:0, y:64 }}
            animate={{ height:h, y:64-h }}
            transition={{ duration:0.6, delay:0.6+i*0.08 }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

// Team / collaboration illustration
export function TeamIllustration() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full">
      <defs>
        <linearGradient id="tgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(258 90% 78%)" />
          <stop offset="100%" stopColor="hsl(258 90% 60%)" />
        </linearGradient>
      </defs>
      {/* card behind */}
      <motion.g
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <rect x="22" y="44" width="58" height="28" rx="5" fill="hsl(0 0% 100%)" stroke="hsl(258 60% 88%)" strokeWidth="0.8" />
        <rect x="28" y="52" width="32" height="3" rx="1.5" fill="hsl(258 60% 90%)" />
        <rect x="28" y="58" width="22" height="3" rx="1.5" fill="hsl(258 60% 90%)" />
        <circle cx="70" cy="58" r="5" fill="url(#tgrad)" />
        <path d="M67.5 58 l2 2 l3.5 -3.5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </motion.g>
      {/* people group */}
      <motion.g
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <circle cx="38" cy="22" r="6" fill="url(#tgrad)" />
        <path d="M28 42 Q28 32 38 32 Q48 32 48 42 Z" fill="url(#tgrad)" />
        <circle cx="62" cy="22" r="6" fill="url(#tgrad)" />
        <path d="M52 42 Q52 32 62 32 Q72 32 72 42 Z" fill="url(#tgrad)" />
        <circle cx="50" cy="14" r="7" fill="url(#tgrad)" />
        <path d="M38 38 Q38 26 50 26 Q62 26 62 38 Z" fill="url(#tgrad)" />
      </motion.g>
    </svg>
  );
}

// Cloud sync illustration
export function SyncIllustration() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full">
      <defs>
        <linearGradient id="sgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(258 90% 80%)" />
          <stop offset="100%" stopColor="hsl(258 90% 62%)" />
        </linearGradient>
      </defs>
      {/* cloud */}
      <motion.g
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <path d="M30 28 Q30 18 42 18 Q48 10 58 14 Q70 14 72 24 Q82 26 80 36 Q78 44 68 44 L36 44 Q24 44 24 36 Q24 30 30 28 Z" fill="url(#sgrad)" />
        {/* sync arrows */}
        <motion.g
          style={{ transformOrigin: '52px 30px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <path d="M46 30 A6 6 0 0 1 58 30" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          <path d="M58 30 l2 -2 M58 30 l-2 -2" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          <path d="M58 30 A6 6 0 0 1 46 30" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          <path d="M46 30 l-2 2 M46 30 l2 2" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </motion.g>
      </motion.g>
      {/* devices */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <line x1="38" y1="46" x2="28" y2="60" stroke="hsl(258 60% 80%)" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="52" y1="46" x2="52" y2="60" stroke="hsl(258 60% 80%)" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="66" y1="46" x2="76" y2="60" stroke="hsl(258 60% 80%)" strokeWidth="0.8" strokeDasharray="2 2" />
        {/* desktop */}
        <rect x="20" y="60" width="16" height="11" rx="1.5" fill="url(#sgrad)" />
        <rect x="26" y="71" width="4" height="2" fill="url(#sgrad)" />
        {/* tablet */}
        <rect x="46" y="60" width="12" height="14" rx="1.5" fill="url(#sgrad)" />
        {/* phone */}
        <rect x="70" y="60" width="8" height="14" rx="1.5" fill="url(#sgrad)" />
      </motion.g>
    </svg>
  );
}

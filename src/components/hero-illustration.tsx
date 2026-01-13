export const HeroIllustration = () => {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" /> {/* Slate 400 */}
          <stop offset="100%" stopColor="#475569" stopOpacity="0.2" /> {/* Slate 600 */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="20" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Abstract Background blobs */}
      <circle cx="200" cy="300" r="150" fill="url(#grad1)" filter="url(#glow)" />
      <circle cx="600" cy="200" r="120" fill="url(#grad1)" filter="url(#glow)" />
      <circle cx="500" cy="500" r="100" fill="url(#grad1)" filter="url(#glow)" />

      {/* Code Window */}
      <g transform="translate(150, 100)">
        <rect x="0" y="0" width="500" height="360" rx="15" fill="#1e293b" className="dark:fill-slate-900" />
        {/* Header */}
        <rect x="0" y="0" width="500" height="40" rx="15" fill="#334155" className="dark:fill-slate-800" />
        <rect x="0" y="20" width="500" height="20" fill="#334155" className="dark:fill-slate-800" />
        <circle cx="25" cy="20" r="6" fill="#ef4444" />
        <circle cx="45" cy="20" r="6" fill="#eab308" />
        <circle cx="65" cy="20" r="6" fill="#22c55e" />
        
        {/* Code Lines */}
        <g transform="translate(40, 80)">
             <text x="0" y="0" fontFamily="monospace" fontSize="18" fill="#f59e0b">def</text>
             <text x="40" y="0" fontFamily="monospace" fontSize="18" fill="#60a5fa">learn_coding</text>
             <text x="160" y="0" fontFamily="monospace" fontSize="18" fill="#e2e8f0">(language):</text>
             
             <text x="20" y="40" fontFamily="monospace" fontSize="18" fill="#c084fc">if</text>
             <text x="50" y="40" fontFamily="monospace" fontSize="18" fill="#e2e8f0">language ==</text>
             <text x="170" y="40" fontFamily="monospace" fontSize="18" fill="#22c55e">&quot;Hinglish&quot;</text>
             <text x="270" y="40" fontFamily="monospace" fontSize="18" fill="#e2e8f0">:</text>
             
             <text x="40" y="80" fontFamily="monospace" fontSize="18" fill="#60a5fa">print</text>
             <text x="100" y="80" fontFamily="monospace" fontSize="18" fill="#e2e8f0">(</text>
             <text x="110" y="80" fontFamily="monospace" fontSize="18" fill="#22c55e">&quot;Samajh aa gaya! 🚀&quot;</text>
             <text x="300" y="80" fontFamily="monospace" fontSize="18" fill="#e2e8f0">)</text>
             
             <text x="20" y="120" fontFamily="monospace" fontSize="18" fill="#c084fc">else</text>
             <text x="70" y="120" fontFamily="monospace" fontSize="18" fill="#e2e8f0">:</text>
             
             <text x="40" y="160" fontFamily="monospace" fontSize="18" fill="#60a5fa">print</text>
             <text x="100" y="160" fontFamily="monospace" fontSize="18" fill="#e2e8f0">(</text>
             <text x="110" y="160" fontFamily="monospace" fontSize="18" fill="#22c55e">&quot;Confused? 🤔&quot;</text>
             <text x="260" y="160" fontFamily="monospace" fontSize="18" fill="#e2e8f0">)</text>
             
             {/* Cursor */}
             <rect x="280" y="145" width="2" height="20" fill="#e2e8f0">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
             </rect>
        </g>
      </g>
      
      {/* Floating Elements */}
      <g transform="translate(600, 400)">
         <circle cx="0" cy="0" r="50" fill="#fff" className="dark:fill-slate-800" filter="url(#glow)" />
         <text x="-25" y="10" fontSize="30">🐍</text>
         <animateMotion path="M 0 0 Q 20 -40 40 0 T 80 0" dur="5s" repeatCount="indefinite" />
      </g>
      <g transform="translate(100, 200)">
         <circle cx="0" cy="0" r="40" fill="#fff" className="dark:fill-slate-800" filter="url(#glow)" />
         <text x="-20" y="10" fontSize="24">🤖</text>
         <animateMotion path="M 0 0 Q -20 40 -40 0 T -80 0" dur="6s" repeatCount="indefinite" />
      </g>
    </svg>
  );
};

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { TreeState } from './types';
import Scene from './components/Scene';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeState>(TreeState.SCATTERED);

  const toggleState = () => {
    setTreeState((prev) => 
      prev === TreeState.SCATTERED ? TreeState.TREE_SHAPE : TreeState.SCATTERED
    );
  };

  return (
    <div className="w-full h-screen relative bg-black">
      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]} // Handle high DPI screens
        gl={{ antialias: false, toneMappingExposure: 1.2 }}
      >
        <color attach="background" args={[COLORS.BACKGROUND_GRADIENT_INNER]} />
        <fog attach="fog" args={[COLORS.BACKGROUND_GRADIENT_OUTER, 10, 50]} />
        
        <Suspense fallback={null}>
            <Scene treeState={treeState} />
        </Suspense>
      </Canvas>
      
      {/* Loading Overlay */}
      <Loader 
        containerStyles={{ backgroundColor: COLORS.BACKGROUND_GRADIENT_OUTER }}
        innerStyles={{ width: '200px', height: '2px', backgroundColor: '#333' }}
        barStyles={{ height: '2px', backgroundColor: COLORS.GOLD_METALLIC }}
        dataStyles={{ fontFamily: 'Cinzel', color: COLORS.GOLD_METALLIC, fontSize: '12px' }}
      />

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12 z-10">
        
        {/* Header */}
        <header className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-cinzel text-3xl md:text-5xl text-yellow-500 tracking-widest drop-shadow-lg" 
              style={{ color: COLORS.GOLD_METALLIC }}>
            ARIX
          </h1>
          <h2 className="font-serif-display italic text-xl md:text-2xl text-emerald-200 mt-2 opacity-80">
            Signature Collection
          </h2>
        </header>

        {/* Footer Controls */}
        <footer className="flex flex-col items-center justify-center pb-8">
          <button 
            onClick={toggleState}
            className="pointer-events-auto group relative px-8 py-3 bg-transparent border border-yellow-600/50 hover:border-yellow-400 transition-all duration-500 rounded-sm overflow-hidden"
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-emerald-900/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            {/* Button Text */}
            <span className="relative font-cinzel text-sm md:text-base tracking-[0.2em] text-yellow-100 group-hover:text-white transition-colors">
              {treeState === TreeState.SCATTERED ? "ASSEMBLE SIGNATURE" : "RELEASE ELEMENTS"}
            </span>
          </button>
          
          <div className="mt-4 text-xs font-sans text-emerald-600/60 tracking-widest uppercase">
            Interactive 3D Experience
          </div>
        </footer>
      </div>
      
      {/* Decorative Vignette Overlay (CSS) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default App;
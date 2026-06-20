'use client';
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);


  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);
  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className="transition-colors duration-700 ease-in-out overflow-x-hidden bg-black">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-screen h-screen object-cover object-center"
            />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.92)' }} />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className={`absolute z-0 top-1/2 left-1/2 transition-none ${mediaType !== 'image' ? 'rounded-2xl' : ''}`}
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  transform: mediaType === 'image'
                    ? `translateX(-50%) translateY(-30%) scale(${1 + scrollProgress * 0.3})`
                    : `translate(-50%, -50%) scale(${1 + scrollProgress * 0.3})`,
                  background: mediaType === 'image' ? 'transparent' : undefined,
                  boxShadow: mediaType === 'image' ? 'none' : '0px 0px 50px rgba(45, 212, 191, 0.15)',
                  overflow: mediaType === 'image' ? 'visible' : undefined,
                  filter: scrollProgress > 0.1 && scrollProgress < 0.9
                    ? `blur(${(Math.sin(scrollProgress * Math.PI) * 4).toFixed(2)}px)`
                    : 'blur(0px)',
                }}
              >
                {mediaType === 'image' ? (
                  <div style={{
                    width: '100%', height: '100%',
                    background: 'transparent',
                  }}>
                    <img
                      src={mediaSrc}
                      alt=""
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'contain',
                        background: 'transparent',
                        display: 'block',
                        filter: 'brightness(1.2) drop-shadow(0 0 40px rgba(45,212,191,0.5))',
                        mixBlendMode: 'screen',
                      }}
                    />
                  </div>
                ) : (
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    data-video="vision"
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-black/30 rounded-xl"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {showFlash && (
                <div
                  style={{
                    position: 'fixed', inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(45,212,191,0.25) 0%, transparent 70%)',
                    zIndex: 100, pointerEvents: 'none',
                    animation: 'flashOut 0.6s ease-out forwards',
                  }}
                />
              )}

              <div className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-[-0.025em] transition-none"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-[-0.025em] transition-none"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

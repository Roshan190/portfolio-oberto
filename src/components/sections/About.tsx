import React from 'react';
import About from './AboutMe';
import Services from './Services';
import Experience from './Experience';
import TechStack from './TechStack';
import SectionDivider from '@/components/ui/SectionDivider';

interface ReuniteBlackProps {
  techStackRef: React.RefObject<HTMLDivElement | null> | any;
}

const ReuniteBlack: React.FC<ReuniteBlackProps> = ({ techStackRef }) => {
  return (
    <>
      <About />
      <SectionDivider variant="number" label="Practice" index={1} />
      <Services />
      <SectionDivider variant="number" label="Experience" index={2} />
      <Experience />
      <SectionDivider variant="number" label="Stack" index={3} />

      <div ref={techStackRef}>
        <TechStack />
      </div>
    </>
  );
};

export default ReuniteBlack;

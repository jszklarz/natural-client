import { useState } from 'react';
import { AnimatedBackground } from '../components/intro/AnimatedBackground';
import { PromptInput } from '../components/intro/PromptInput';
import { CenteredLayout } from '../components/layout/CenteredLayout';
import { Toolbox } from '../components/settings/SettingsButton';

const PromptPage = () => {
  const [adaptiveColor, setAdaptiveColor] = useState('rgba(0,0,0,0)');

  return (
    <CenteredLayout className="bg-[#081529]">
      <AnimatedBackground onColorChange={setAdaptiveColor} />
      <PromptInput adaptiveColor={adaptiveColor} />
      <Toolbox />
    </CenteredLayout>
  );
};

export default PromptPage;
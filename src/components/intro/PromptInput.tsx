import { motion } from "framer-motion";
import { FormEvent, HTMLProps, useState } from 'react';
import logo from '../../assets/naturalclient.png';

interface PromptInputProps {
  adaptiveColor: string;
}

export const PromptInput = ({ adaptiveColor }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`You entered "${prompt}"`);
  }

  return (
    <PromptInputContainer>
      <motion.img
        src={logo}
        alt="Logo"
        className="w-12 h-12 rounded-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 50 }}
      />
      <PromptForm onSubmit={handleSubmit} className="w-full">
        <PromptInputField
          value={prompt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          adaptiveColor={adaptiveColor}
        />

        <div className="absolute right-3 bottom-3">
          <motion.button
            type="submit"
            className="p-2 text-blue-500 bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer"
            aria-label="Send prompt"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </div>
      </PromptForm>
    </PromptInputContainer>
  );
};

const PromptInputContainer = (props: HTMLProps<HTMLDivElement>) => {
  const { children } = props;

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-lg p-4 mx-auto space-y-4">
      {children}
    </div>
  );
}

const PromptForm = (props: HTMLProps<HTMLFormElement>) => {
  const { children, ...rest } = props;

  return (
    <form {...rest}>
      <div className="relative">
        {children}
      </div>
    </form>
  );
}

const PromptInputField = (props: HTMLProps<HTMLTextAreaElement> & { adaptiveColor: string }) => {
  const { adaptiveColor, value, onChange, onKeyDown } = props;

  return <textarea
    value={value}
    onChange={onChange}
    placeholder="What API are you looking to interact with?"
    className="w-full p-4 pr-20 text-lg bg-white/90 backdrop-blur-sm border rounded-lg shadow-sm min-h-[120px] outline-none resize-none"
    onKeyDown={onKeyDown}
    style={{
      border: '2px solid',
      borderColor: adaptiveColor
    }}
  />
}
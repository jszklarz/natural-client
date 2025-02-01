import {FormEvent, useState} from 'react';
import logo from './assets/naturalclient.png';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Prompt submitted:', prompt);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-4 flex flex-col items-center gap-8">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 rounded-lg"
        />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What API are you looking to interact with?"
              className="w-full p-4 pr-20 text-lg bg-white border rounded-lg shadow-sm min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-3 bottom-3">
              <button
                type="submit"
                className="p-2 text-blue-500 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-50 transition-colors"
                aria-label="Send prompt"
              >
                →
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;
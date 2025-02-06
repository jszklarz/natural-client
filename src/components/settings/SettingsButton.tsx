import { Settings, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

export const Toolbox = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const openSettings = () => {
    setSettingsOpen(true)
  }
  const closeSettings = () => {
    setSettingsOpen(false)
  }

  return <div className="absolute top-3 right-3" >
    <button
      className="p-0.5 bg-[#999] rounded-sm flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer"
      aria-label="Settings"
      onClick={openSettings}
    >
      <Settings color="#000" size={24} />
    </button>
    <AnimatePresence>
      {settingsOpen && <SettingsMenu onClose={closeSettings} />}
    </AnimatePresence>
  </div>
}

// On clicking the settings button it should open a really nice smoothly transitioned settings menu using framer motion.
// The settings menu should be a separate component that is conditionally rendered when the button is clicked.
// The settings menu should be a modal that covers the whole screen with a clear and large X motion.button in the top right corner to close it.
const SettingsMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <SettingsMenuCloseButton onClose={onClose} />
      <SettingsOptions />
    </motion.div>
  )

}

const SettingsMenuCloseButton = ({ onClose }: { onClose: () => void }) => {
  return <button className="absolute top-3 right-3" aria-label="Close settings">
    <motion.button
      className="p-0.5 bg-[#999] rounded-sm flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer"
      aria-label="Settings"
      onClick={onClose}
    >
      <X color="#000" size={24} />
    </motion.button>
  </button>
}

const SettingsOptions = () => {
  return <div className="flex w-full h-screen">
    <div className="w-1/4 border-r border-[#666]">
      {/* Top level config categories go here. */}
      {/* E.g. General */}
      <div className="flex flex-col py-48 h-full items-end">
        <motion.button className="px-4 py-2 text-[#666] hover:text-[#999] transition-all duration-300 cursor-pointer">General</motion.button>
        <motion.button className="px-4 py-2 text-[#666] hover:text-[#999] transition-all duration-300 cursor-pointer">API</motion.button>
      </div>


    </div>
    <div className="w-3/4 bg-blue">
      {/* Lower level config categories go here. */}
      {/* E.g. LLM Selector + API Key */}
    </div>
  </div>
}
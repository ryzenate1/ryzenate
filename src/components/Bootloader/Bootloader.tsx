import React, { useEffect, useState } from 'react';

interface BootloaderProps {
  onBootComplete: () => void;
}

const Bootloader: React.FC<BootloaderProps> = ({ onBootComplete }) => {
  const [displayLines, setDisplayLines] = useState<string[]>(['']);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [cleared, setCleared] = useState(false);

  const randomIP = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

  const bootSequence = [
    `ssh ssh@${randomIP} -u ryzen`,
    'Password: ********',
    '',
    'Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-78-generic x86_64)',
    '',
    ' * Documentation:  https://help.ubuntu.com',
    ' * Management:     https://landscape.canonical.com',
    ' * Support:        https://ubuntu.com/advantage',
    '',
    'System information as of Mon Apr 28 17:50:05 UTC 2025',
    '',
    'System load:  0.03    Processes: 111    Memory usage: 24%',
    '',
    'ryzen@ubuntu:~$ bash ./.stealth_init',
    '[+] Initializing modules...',
    '[+] Preparing to unpack...',
    '[+] Unpacking payload...',
    '[+] Setting up environment...',
    '[+] Bypassing security protocols...',
    '[+] Injecting stealth backdoor...',
    '[+] Access logs purged successfully...',
    '[+] Initialization complete.',
    'ryzen@ubuntu:~$'
  ];

  useEffect(() => {
    if (currentLineIndex < bootSequence.length) {
      const currentLine = bootSequence[currentLineIndex];

      if (currentLineIndex <= 1) {
        // First two lines: character by character
        if (currentCharIndex < currentLine.length) {
          const timeout = setTimeout(() => {
            setDisplayLines(prev => {
              const updatedLines = [...prev];
              updatedLines[updatedLines.length - 1] += currentLine[currentCharIndex];
              return updatedLines;
            });
            setCurrentCharIndex(prev => prev + 1);
          }, 50); // Slow typing
          return () => clearTimeout(timeout);
        } else {
          // Line complete
          const timeout = setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
            setDisplayLines(prev => [...prev, '']);
          }, 300); // Small pause between lines
          return () => clearTimeout(timeout);
        }
      } else {
        // Other lines: full line at once (fast)
        const timeout = setTimeout(() => {
          setDisplayLines(prev => [...prev.slice(0, -1), bootSequence[currentLineIndex]]);
          setCurrentLineIndex(prev => prev + 1);
          setDisplayLines(prev => [...prev, '']);
        }, 40); // Fast per line
        return () => clearTimeout(timeout);
      }
    } else {
      // Boot sequence complete
      setTimeout(() => {
        setCleared(true);
        setTimeout(() => {
          setShowAccessGranted(true);
          setTimeout(onBootComplete, 600);
        }, 300);
      }, 300);
    }
  }, [currentCharIndex, currentLineIndex, bootSequence, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono text-lg md:text-xl p-6 overflow-hidden select-none flex flex-col items-start justify-start">
      {!cleared ? (
        <div className="whitespace-pre-wrap leading-tight w-full">
          {displayLines.map((line, idx) => (
            <div
              key={idx}
              className="overflow-hidden whitespace-nowrap"
            >
              {line}
            </div>
          ))}
          <div className="terminal-cursor animate-blink mt-1" />
        </div>
      ) : (
        showAccessGranted && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col md:flex-row md:space-x-4 text-green-400 text-5xl md:text-8xl font-bold animate-fadeIn tracking-wider items-center justify-center text-center">
              <div className="mb-4 md:mb-0">ACCESS GRANTED.</div>
              <div>WELCOME</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Bootloader;

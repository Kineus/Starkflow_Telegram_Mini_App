import { useEffect, useState } from 'react';
import './index.css';
import Arrow from './icons/Arrow';
import { bear, coin, highVoltage, rocket, starrk, trophy } from './images';

const App = () => {
  const [points, setPoints] = useState(10000);
  const [energy, setEnergy] = useState(2532);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 10;
  const energyToReduce = 10;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 3500));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">

      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg">Join Community <Arrow size={18} className="ml-0 mb-1 inline-block" /></p>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
            <img src={trophy} width={24} height={24} />
            <span className="ml-1">Gold <Arrow size={18} className="ml-0 mb-1 inline-block" /></span>
          </div>
        </div>


        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 3500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#1a4731] py-4 rounded-2xl flex justify-around"> {/* Dark green background */}
                <button className="flex flex-col items-center gap-1 text-[#e0e0e0]"> {/* Light gray text for contrast */}
                  <img src={bear} width={24} height={24} alt="High Voltage" className="filter invert" /> {/* Invert image colors */}
                  <span>Fam</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#2a694a]"></div> {/* Slightly lighter green for divider */}
                <button className="flex flex-col items-center gap-1 text-[#e0e0e0]">
                  <img src={coin} width={24} height={24} alt="High Voltage" className="filter invert" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#2a694a]"></div>
                <button className="flex flex-col items-center gap-1 text-[#e0e0e0]">
                  <img src={rocket} width={24} height={24} alt="High Voltage" className="filter invert" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#2a2a2a] rounded-full mt-4"> {/* Dark gray background for the bar container */}
            <div 
              className="bg-gradient-to-r from-[#4a0e0e] to-[#c41e3a] h-4 rounded-full" 
              style={{ width: `${(energy / 3500) * 100}%` }}
            ></div> {/* Gradient from dark red to brighter red for the energy bar */}
          </div>
        </div>


        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <img src={starrk} width={210} height={210} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                10
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;

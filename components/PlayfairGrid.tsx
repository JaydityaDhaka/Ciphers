import React from 'react';

interface PlayfairGridProps {
  grid: string[][];
}

const PlayfairGrid: React.FC<PlayfairGridProps> = ({ grid }) => {
  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-2 text-center">Playfair Grid</h2>
      <div className="grid grid-cols-5 gap-1">
        {grid.flat().map((char, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-2 border rounded-lg text-center"
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayfairGrid;



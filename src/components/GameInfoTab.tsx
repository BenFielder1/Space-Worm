import GameInfo from "@/types/GameInfo";

interface GameInfoTabProps {
    gameInfo: GameInfo;
}

export default function GameInfoTab({ gameInfo }: GameInfoTabProps) {
    return (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Controls */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-lime-400">Controls</h2>
                    <div className="space-y-2 text-gray-300">
                        {gameInfo.controls.map((control, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">{control.key}</kbd>
                                <span className="text-sm">{control.description}</span>
                            </div>
                        ))}
                        {/* <div className="flex items-center space-x-3">
                            <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">WASD</kbd>
                            <span className="text-sm">Move</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">Space</kbd>
                            <span className="text-sm">Jump/Action</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">Mouse</kbd>
                            <span className="text-sm">Look/Aim</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <kbd className="px-2 py-1 bg-gray-800 rounded text-sm">ESC</kbd>
                            <span className="text-sm">Pause Menu</span>
                        </div> */}
                    </div>
                </div>

                {/* Tips */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-lime-400">Tips</h2>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        {gameInfo.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-lime-400 mr-2">•</span>
                                {tip}
                            </li>
                        ))}
                        {/* <li className="flex items-start">
                            <span className="text-lime-400 mr-2">•</span>
                            Collect power-ups to boost your score
                        </li>
                        <li className="flex items-start">
                            <span className="text-lime-400 mr-2">•</span>
                            Watch out for obstacles and enemies
                        </li>
                        <li className="flex items-start">
                            <span className="text-lime-400 mr-2">•</span>
                            Complete challenges for bonus points
                        </li> */}
                    </ul>
                </div>

                {/* System Requirements / Mobile Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-lime-400">
                        Requirements
                    </h2>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        {gameInfo.requirements.map((req, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-lime-400 mr-2">✓</span>
                                {req}
                            </li>
                        ))}
                        {/* <li className="flex items-start">
                            <span className="text-lime-400 mr-2">✓</span>
                            Modern web browser
                        </li>
                        <li className="flex items-start">
                            <span className="text-lime-400 mr-2">✓</span>
                            WebGL 2.0 support
                        </li>
                        <li className="flex items-start">
                            <span className="text-lime-400 mr-2">✓</span>
                            4GB RAM recommended
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
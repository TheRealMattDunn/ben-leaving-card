import { useState, useEffect } from "react";

interface HackerTextProps {
	text: string;
	className?: string;
	cycleDelay?: number; // Delay between cycles in ms
	glitchDuration?: number; // How long the glitch effect takes in ms
	visibleDuration?: number; // How long text stays visible in ms
}

const HackerText = ({
	text,
	className = "",
	cycleDelay = 8000,
	glitchDuration = 2000,
	visibleDuration = 4000
}: HackerTextProps) => {
	const [displayText, setDisplayText] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [isGlitching, setIsGlitching] = useState(false);

	const characters = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

	useEffect(() => {
		const cycle = () => {
			// Start glitch effect
			setIsGlitching(true);
			setIsVisible(true);

			let currentIndex = 0;
			const targetText = text;

			// Glitch animation - gradually reveal the real text
			const glitchInterval = setInterval(() => {
				if (currentIndex <= targetText.length) {
					let newText = "";

					// Build the text: real characters for completed part, random for the rest
					for (let i = 0; i < targetText.length; i++) {
						if (i < currentIndex) {
							newText += targetText[i];
						} else if (i === currentIndex) {
							// Current position gets a random character
							newText += characters[Math.floor(Math.random() * characters.length)];
						} else {
							// Future positions are empty or random
							if (Math.random() > 0.7) {
								newText += characters[Math.floor(Math.random() * characters.length)];
							}
						}
					}

					setDisplayText(newText);

					// Occasionally advance the real text
					if (Math.random() > 0.3) {
						currentIndex++;
					}
				} else {
					// Glitch is complete, show final text
					clearInterval(glitchInterval);
					setDisplayText(targetText);
					setIsGlitching(false);

					// Keep text visible for a while
					setTimeout(() => {
						// Glitch out the text when removing it
						const removeInterval = setInterval(() => {
							setDisplayText(prev => {
								if (prev.length === 0) {
									clearInterval(removeInterval);
									setIsVisible(false);
									return "";
								}

								// Randomly replace characters as we "delete"
								const newText = prev.split("").map(() =>
									Math.random() > 0.5 ? characters[Math.floor(Math.random() * characters.length)] : ""
								).join("");

								return newText.slice(0, prev.length - 1);
							});
						}, 100);
					}, visibleDuration);
				}
			}, 100);
		};

		// Start the cycle
		const cycleTimeout = setTimeout(cycle, 1000);

		// Set up recurring cycles
		const recurringCycle = setInterval(cycle, cycleDelay);

		return () => {
			clearTimeout(cycleTimeout);
			clearInterval(recurringCycle);
		};
	}, [text, cycleDelay, glitchDuration, visibleDuration]);

	if (!isVisible) return null;

	return (
		<p className={`${className} ${isGlitching ? 'animate-pulse' : ''} transition-all duration-100`}>
			{displayText}
			{isGlitching && <span className="animate-ping">_</span>}
		</p>
	);
};

export default HackerText;

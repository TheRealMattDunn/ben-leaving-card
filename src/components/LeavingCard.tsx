import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import LoadingScreen from "./LoadingScreen";
import VisitorCounter from "./VisitorCounter";
import MatrixEffect from "./MatrixEffect";
import HackerText from "./HackerText";
import { terminalSounds } from "./../utils/terminalSounds";
import { useKonamiCode } from "./../hooks/useKonamiCode";
import { useBSODCode } from "./../hooks/useBSODCode";
import BSODScreen from "./BSODScreen";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface Signature {
	name: string;
	message: string;
	timestamp: number;
	role: string;
}

const LeavingCard = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [showCursor, setShowCursor] = useState(true);
	const [typedText, setTypedText] = useState("");
	const fullText = "Farewell, Ben... :sad_face:";
	const { isActivated: konamiActivated, reset: resetKonami } =
		useKonamiCode();
	const { isActivated: bsodActivated, reset: resetBSOD } = useBSODCode();

	const handleLoadingComplete = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		const cursorInterval = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 500);

		return () => clearInterval(cursorInterval);
	}, []);

	useEffect(() => {
		if (!isLoading && typedText.length < fullText.length) {
			const timeout = setTimeout(() => {
				setTypedText(fullText.slice(0, typedText.length + 1));
				// Play typing sound
				terminalSounds.playTypeClick();
			}, 100);
			return () => clearTimeout(timeout);
		}
	}, [typedText, isLoading]);

	const codeSnippets = [
		{ lang: "js", code: '// IE6: "Am I a joke to you?"', type: "comment" },
		{
			lang: "ts",
			code: "Type 'string' is not assignable to type 'never'",
			type: "error",
		},
		{
			lang: "css",
			code: ".center { margin: 0 auto; } // The sacred texts",
			type: "comment",
		},
		{
			lang: "html",
			code: "<marquee>Remember when this was peak UX?</marquee>",
			type: "warning",
		},
	];

	const signatures: Signature[] = [
		{
			name: "Radu",
			role: "Benevolent dictator of vanilla JS",
			message: "God damn it was great working with you Ben. Gonna miss the banter and your wit! I'm sure will find myself thinking what would Ben say about this or that. Also gonna miss your tech insights as pure as a baritone singing :P. Whishing you all the best in your next adventure my friend! 💚",
			timestamp: 1763481390,
		},
		{
			name: "Jon T",
			role: "Chief Trombone Officer of pre fax age",
			message: "Ben, you're always running here and there (here and there) / You feel you're not wanted anywhere (anywhere) / If, you ever look behind / And don't like what you find / There's something you should know - / I’m always up for a pint if you’re in town, don’t be a stranger, yea? / Cheers lad",
			timestamp: 1763481390,
		},
		{
			name: "Hadrian",
			role: "Backender at the wrong party",
			message:
				"It's been great working with you Ben. Hope we get to work together in the future. All the best!",
			timestamp: 1763481390,
		},
		{
			name: "Peter B",
			role: "Undercover retro computing advocate",
			message:
				"Ben you are officially my Buddy. It was good to chat to you in those early days when I first joined K+C. Little did I know it was also the twilight days of K+C!",
			timestamp: 1763481390,
		},
	];

	if (isLoading) {
		return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
	}

	return (
		<>
			<MatrixEffect />
			<BSODScreen isActive={bsodActivated} onClose={resetBSOD} />
			<Dialog
				open={konamiActivated}
				onOpenChange={(open) => !open && resetKonami()}
			>
				<DialogContent className="max-w-2xl bg-muted border-2 border-terminal">
					<DialogHeader>
						<DialogTitle className="text-terminal text-xl font-bold flex items-center gap-2">
							<img
								src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
								alt=""
								className="w-1 h-1"
							/>
							🎉 EASTER EGG UNLOCKED! 🎉
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4 text-terminal/90">
						<div className="bg-background/50 p-4 rounded border border-terminal/30">
							<p className="text-warning font-bold mb-2">
								// Netscape Navigator 4.0 Detected!
							</p>
							<p className="text-sm mb-3">
								You've just unlocked the sacred knowledge of the
								ancients:
							</p>

							<div className="bg-muted/50 p-3 rounded border border-border space-y-2 text-xs font-mono">
								<p className="text-comment">
									{"<!-- The 1px transparent GIF hack -->"}
								</p>
								<p className="text-terminal">
									{
										'<img src="spacer.gif" width="1" height="1" />'
									}
								</p>
								<p className="text-comment">
									// Used for layout before CSS flexbox
									existed
								</p>
							</div>
						</div>

						<div className="space-y-2 text-sm">
							<p className="text-terminal">
								⚡{" "}
								<span className="text-warning">
									Pro tip from 1998:
								</span>
							</p>
							<ul className="list-disc list-inside space-y-1 pl-4 text-terminal/80">
								<li>
									Always use {"<table>"} for layouts (CSS is
									too unstable)
								</li>
								<li>Best viewed in 800x600 resolution</li>
								<li>Don't forget your {"<blink>"} tags!</li>
								<li>Frames are the future of web design</li>
								<li>
									Make sure to add "Under Construction" GIFs
								</li>
							</ul>
						</div>

						<div className="bg-destructive/10 border border-destructive/30 p-3 rounded">
							<p className="text-destructive text-xs">
								⚠️ WARNING: This page is optimized for Netscape
								Navigator 4.0 and Internet Explorer 5.5. Your
								modern browser may not display it correctly.
							</p>
						</div>

						<p className="text-center text-comment text-xs italic">
							"In memory of spacer.gif (1996-2009) - You kept our
							layouts together" 💚
						</p>
					</div>
				</DialogContent>
			</Dialog>

			<div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden relative">
				{/* Scanline effect */}
				<div className="absolute inset-0 pointer-events-none opacity-10">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal to-transparent animate-[scan_8s_linear_infinite]" />
				</div>

				<Card className="w-full max-w-3xl bg-card border-2 border-primary/30 shadow-[0_0_30px_rgba(74,222,128,0.15)] overflow-hidden">
					{/* Terminal Header */}
					<div className="bg-muted border-b border-border px-4 py-2 flex items-center gap-2">
						<div className="flex gap-1.5">
							<div className="w-3 h-3 rounded-full bg-error" />
							<div className="w-3 h-3 rounded-full bg-warning" />
							<div className="w-3 h-3 rounded-full bg-terminal" />
						</div>
						<span className="text-terminal text-sm ml-2">
							farewell.dev — terminal
						</span>
					</div>

					<div className="p-8 space-y-6">
						{/* Typed Header */}
						<div className="text-2xl text-terminal glow font-bold">
							{typedText}
							{showCursor && <span className="ml-1">_</span>}
						</div>

						<Separator className="bg-border" />

						{/* Main Message */}
						<div className="space-y-4 text-terminal/90">
							<div className="space-y-2">
								<p className="text-comment">
									// The Golden Age (circa 2005-2020)
								</p>
								<p className="pl-4">
									<span className="text-code-blue">
										const
									</span>{" "}
									<span className="text-warning">
										memories
									</span>{" "}
									= [
								</p>
								<div className="pl-8 space-y-1 text-sm">
									<p className="text-terminal">
										"Fighting with IE quirks at 3 AM",
									</p>
									<p className="text-terminal">
										"Discovering CSS Grid was
										revolutionary",
									</p>
									<p className="text-terminal">
										"TypeScript errors being our worst
										enemy",
									</p>
									<p className="text-terminal">
										"Clearing floats with clearfix hacks",
									</p>
									<p className="text-terminal">
										"Stack Overflow saving us daily"
									</p>
								</div>
								<p className="pl-4">];</p>
							</div>

							<div className="bg-muted/50 p-4 rounded border border-border space-y-2">
								{codeSnippets.map((snippet, idx) => (
									<div
										key={idx}
										className="flex items-start gap-2"
									>
										<span className="text-comment text-xs">
											{snippet.lang}:
										</span>
										<span
											className={
												snippet.type === "error"
													? "text-error text-sm"
													: snippet.type === "warning"
													? "text-warning text-sm"
													: "text-comment text-sm"
											}
										>
											{snippet.code}
										</span>
									</div>
								))}
							</div>

							<Separator className="bg-border" />

							{/* The Future */}
							<div className="space-y-2">
								<p className="text-error glitch font-bold">
									⚠️ DEPRECATION WARNING
								</p>
								<p className="pl-4 text-comment">
									<span className="text-code-blue">if</span>{" "}
									(year {">"} 2024) {"{"}
								</p>
								<div className="pl-8 space-y-1">
									<p className="text-error">
										<span className="text-code-blue">
											throw new
										</span>{" "}
										<span className="text-warning">
											Error
										</span>
										(
									</p>
									<p className="pl-4 text-error">
										"Human developers are deprecated. AI
										overlords now maintain the codebase."
									</p>
									<p className="text-error">);</p>
								</div>
								<p className="pl-4 text-comment">{"}"}</p>
							</div>

							<div className="bg-destructive/10 border border-destructive/30 p-4 rounded space-y-2">
								<p className="text-destructive font-bold">
									🤖 System Message:
								</p>
								<p className="text-destructive/80 text-sm">
									Your skills in manually debugging CSS,
									arguing about semicolons, and explaining
									closures have been archived to /dev/null.
									Thank you for your service.
								</p>
							</div>

							<Separator className="bg-border" />

							{/* Farewell Message */}
							<div className="space-y-3">
								<p className="text-terminal">
									But hey, you were there when websites were
									an art form, not just API endpoints.
								</p>
								<p className="text-terminal">
									You fought the good fight against browser
									compatibility, nested callbacks, and that
									one div that just wouldn&apos;t center.
								</p>
								<p className="text-warning font-bold">
									We&apos;ll miss you debugging with
									console.log() 💚
								</p>
							</div>

							<div className="flex flex-wrap gap-2 pt-4">
								<Button
									variant="outline"
									className="border-terminal text-terminal hover:bg-terminal/10"
									onClick={() => {
										terminalSounds.playButtonClick();
										console.log(
											"git commit -m 'goodbye world'"
										);
									}}
								>
									git commit -m "farewell"
								</Button>
								<Button
									variant="outline"
									className="border-warning text-warning hover:bg-warning/10"
									onClick={() => {
										terminalSounds.playWarningBeep();
										console.log(
											"npm uninstall human-developer"
										);
									}}
								>
									npm uninstall career
								</Button>
								<Button
									variant="outline"
									className="border-code-blue text-code-blue hover:bg-code-blue/10"
									onClick={() => {
										terminalSounds.playButtonClick();
										alert("404: Developer not found");
									}}
								>
									exit(0)
								</Button>
							</div>
						</div>

						<Separator className="bg-border" />

						{/* Signatures Section */}
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<p className="text-terminal font-bold">
									<span className="text-code-blue">
										const
									</span>{" "}
									signatures = [
								</p>
							</div>

							<div className="space-y-3 max-h-80 overflow-y-auto pr-2 nice-scrollbar">
								{signatures.map((sig, idx) => (
									<div
										key={idx}
										className="bg-muted/30 border border-border/50 rounded p-3 space-y-1 hover:border-terminal/30 transition-colors"
									>
										<div className="flex items-start justify-between gap-2 flex-wrap">
											<div className="flex-1 min-w-0">
												<p className="text-warning font-semibold truncate">
													{sig.name}
												</p>
												<p className="text-comment text-xs">
													{sig.role}
												</p>
											</div>
											<p className="text-comment text-xs font-mono whitespace-nowrap">
												{
													new Date(sig.timestamp)
														.toISOString()
														.split("T")[0]
												}
											</p>
										</div>
										<p className="text-terminal/90 text-sm leading-relaxed break-words">
											"{sig.message}"
										</p>
										<p className="text-comment text-xs font-mono">
											// Unix:{" "}
											{Math.floor(sig.timestamp / 1000)}
										</p>
									</div>
								))}
							</div>

							<p className="text-terminal pl-0">];</p>
							<p className="text-comment text-sm">
								// Total signatures: {signatures.length} |
								Status: Deprecated 💚
							</p>
						</div>

						<Separator className="bg-border" />

						{/* Footer */}
						<div className="text-center space-y-2">
							<p className="text-comment text-sm">
								// TODO: Replace with AI sentiment generator
							</p>
							<p className="text-terminal text-lg">
								Good luck out there, human 🚀
							</p>
							<p className="text-comment text-xs">
								P.S. - Save your Stack Overflow karma. You might
								need it in the museum.
							</p>
							<HackerText
								text="Konami, BSOD codes enabled for extra fun!"
								className="text-comment text-xs glitch"
								cycleDelay={12000}
								glitchDuration={3000}
								visibleDuration={5000}
							/>
						</div>

						<Separator className="bg-border" />
						{/* Visitor Counter */}
						<VisitorCounter />
					</div>
				</Card>
			</div>
		</>
	);
};

export default LeavingCard;

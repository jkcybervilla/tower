import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function BootScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setHidden(true);
        if (onFinish) onFinish();
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-black flex items-center justify-center"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 300ms ease-out",
      }}
    >
      <DotLottieReact
        src="/loader.lottie"
        loop
        autoplay
        style={{ width: "280px", height: "280px" }}
      />
    </div>
  );
}

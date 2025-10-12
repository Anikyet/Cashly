// components/TypingLine.tsx
"use client";

import React, { useEffect, useState } from "react";

interface TypingLineProps {
  text: string;             // text to type
  speed?: number;           // ms per character (default 80)
  cursor?: boolean;         // show blinking cursor (default true)
  loop?: boolean;           // loop typing (type -> pause -> delete -> repeat)
  pauseAfter?: number;      // ms to wait after full text typed before deleting (only when loop=true)
  className?: string;       // extra classes for container
}

export default function TypingLine({
  text,
  speed = 80,
  cursor = true,
  loop = false,
  pauseAfter = 1200,
  className = "",
}: TypingLineProps) {
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timer: number | undefined;

    const tick = () => {
      if (!mounted) return;

      if (!isDeleting) {
        // typing forward
        if (display.length < text.length) {
          setDisplay(text.slice(0, display.length + 1));
          timer = window.setTimeout(tick, speed);
        } else {
          // finished typing
          if (loop) {
            timer = window.setTimeout(() => {
              setIsDeleting(true);
              timer = window.setTimeout(tick, speed);
            }, pauseAfter);
          }
        }
      } else {
        // deleting
        if (display.length > 0) {
          setDisplay(text.slice(0, display.length - 1));
          timer = window.setTimeout(tick, speed / 2);
        } else {
          // finished deleting, start typing again
          setIsDeleting(false);
          timer = window.setTimeout(tick, speed);
        }
      }
    };

    // start
    timer = window.setTimeout(tick, speed);

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, isDeleting, text, speed, loop, pauseAfter]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{display}</span>
      {cursor && (
        <span
          aria-hidden
          style={{
            display: "inline-block",
            marginLeft: 6,
            width: 10,
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontWeight: 600,
              transform: "translateY(0.1em)",
              animation: "blink 1s step-end infinite",
            }}
          >
            |
          </span>
        </span>
      )}

      {/* blinking cursor keyframes */}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

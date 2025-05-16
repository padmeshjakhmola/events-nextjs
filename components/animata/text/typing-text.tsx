"use client"
import { ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils"; 

interface TypingTextProps {
  /**
   * Text or array of texts to type
   */
  text: string | string[];

  /**
   * Delay between typing each character or word (smooth mode) in milliseconds
   * @default 32
   */
  delay?: number;

  /**
   * If true, the text will be erased after typing and then typed again.
   */
  repeat?: boolean;

  /**
   * Custom cursor to show at the end of the text.
   * Applies only when `smooth` is false.
   */
  cursor?: ReactNode;

  /**
   * Additional classes to apply to the container
   */
  className?: string;

  /**
   * If true, the container will grow to fit the text as it types
   */
  grow?: boolean;

  /**
   * Number of characters to keep always visible
   */
  alwaysVisibleCount?: number;

  /**
   * If true, the typing effect will be smooth instead of typing one character at a time.
   * Looks better for multiple words.
   */
  smooth?: boolean;

  /**
   * Time to wait before starting the next cycle of typing
   * Applies only when `repeat` is true.
   *
   * @default 1000
   *
   */
  waitTime?: number;

  /**
   * Callback function to be called when the typing is complete
   */
  onComplete?: () => void;

  /**
   * If true, the cursor will be hidden after typing is complete
   * @default false
   */
  hideCursorOnComplete?: boolean;
}

function Blinker() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span className={show ? "" : "opacity-0"}>|</span>;
}

function SmoothEffect({
  words,
  index,
  alwaysVisibleCount,
}: {
  words: string[];
  index: number;
  alwaysVisibleCount: number;
}) {
  return (
    <div className="flex flex-wrap whitespace-pre">
      {words.map((word, wordIndex) => {
        return (
          <span
            key={wordIndex}
            className={cn("transition-opacity duration-300 ease-in-out", {
              "opacity-100": wordIndex < index,
              "opacity-0": wordIndex >= index + alwaysVisibleCount,
            })}
          >
            {word}
            {wordIndex < words.length && <span>&nbsp;</span>}
          </span>
        );
      })}
    </div>
  );
}

function NormalEffect({
  text,
  index,
  alwaysVisibleCount,
}: {
  text: string;
  index: number;
  alwaysVisibleCount: number;
}) {
  return (
    <>
      {text.slice(
        0,
        Math.max(index, Math.min(text.length, alwaysVisibleCount ?? 1))
      )}
    </>
  );
}

enum TypingDirection {
  Forward = 1,
  Backward = -1,
}

function CursorWrapper({
  visible,
  children,
  waiting,
}: {
  visible?: boolean;
  waiting?: boolean;
  children: ReactNode;
}) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setOn((prev) => !prev);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  if (!visible || (!on && !waiting)) {
    return null;
  }

  return children;
}

function Type({
  text,
  repeat,
  cursor,
  delay,
  grow,
  className,
  alwaysVisibleCount,
  smooth,
  waitTime = 1000,
  onComplete,
  hideCursorOnComplete,
}: TypingTextProps) {
  // Convert text to array if it's a string
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const textArray = Array.isArray(text) ? text : [text];

  // Current text index in the array
  const [textIndex, setTextIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<TypingDirection>(
    TypingDirection.Forward
  );
  const [isComplete, setIsComplete] = useState(false);

  const currentText = textArray[textIndex];
  const words = useMemo(() => currentText.split(/\s+/), [currentText]);
  const total = smooth ? words.length : currentText.length;

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      setIndex((prevIndex) => {
        if (direction === TypingDirection.Backward && prevIndex === 0) {
          clearInterval(interval);
        } else if (
          direction === TypingDirection.Forward &&
          prevIndex === total - 1
        ) {
          clearInterval(interval);
        }
        return prevIndex + direction;
      });
    };

    interval = setInterval(startTyping, delay);
    return () => clearInterval(interval);
  }, [total, direction, delay]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (index >= total - 1 && direction === TypingDirection.Forward) {
      if (repeat) {
        timeout = setTimeout(() => {
          if (textArray.length > 1) {
            // For multiple texts, finish typing the current one, then move direction to backward
            setDirection(TypingDirection.Backward);
          } else {
            // For a single text, just change direction as before
            setDirection(TypingDirection.Backward);
          }
        }, waitTime);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    }

    if (index <= 0 && direction === TypingDirection.Backward) {
      if (repeat) {
        timeout = setTimeout(() => {
          if (textArray.length > 1) {
            // Move to the next text when fully erased
            setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
          }
          // Always set direction to forward when we reach the beginning
          setDirection(TypingDirection.Forward);
        }, waitTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    index,
    total,
    repeat,
    waitTime,
    direction,
    textArray.length,
    textIndex,
    onComplete,
  ]);

  useEffect(() => {
    // Reset the component when text changes
    setTextIndex(0);
    setIndex(0);
    setDirection(TypingDirection.Forward);
    setIsComplete(false);
  }, [textArray]);

  const waitingNextCycle = index === total - 1 || index === 0;

  return (
    <div className={cn("relative font-poppins text-primary text-6xl", className)}>
      {!grow && (
        <div className="invisible">
          {textArray.reduce(
            (longest, text) => (text.length > longest.length ? text : longest),
            ""
          )}
        </div>
      )}
      <div
        className={cn({
          "absolute inset-0 h-full w-full": !grow,
        })}
      >
        {smooth ? (
          <SmoothEffect
            words={words}
            index={index}
            alwaysVisibleCount={alwaysVisibleCount ?? 1}
          />
        ) : (
          <NormalEffect
            text={currentText}
            index={index}
            alwaysVisibleCount={alwaysVisibleCount ?? 1}
          />
        )}
        <CursorWrapper
          waiting={waitingNextCycle}
          visible={Boolean(
            !smooth && cursor && (!hideCursorOnComplete || !isComplete)
          )}
        >
          {cursor}
        </CursorWrapper>
      </div>
    </div>
  );
}

export default function TypingText({
  text,
  repeat = true,
  cursor = <Blinker />,
  delay = 50,
  className,
  grow = false,
  alwaysVisibleCount = 1,
  smooth = false,
  waitTime,
  onComplete,
  hideCursorOnComplete = false,
}: TypingTextProps) {
  return (
    <Type
      key={Array.isArray(text) ? text.join("|") : text}
      delay={delay ?? 32}
      waitTime={waitTime ?? 1000}
      grow={grow}
      repeat={repeat}
      text={text}
      cursor={cursor}
      className={className}
      smooth={smooth}
      alwaysVisibleCount={alwaysVisibleCount}
      onComplete={onComplete}
      hideCursorOnComplete={hideCursorOnComplete}
    />
  );
}

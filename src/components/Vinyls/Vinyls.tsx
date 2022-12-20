import {
  AnimatePresence,
  LayoutGroup,
  motion,
  PanInfo,
  useMotionValue,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Vinyls = () => {
  const vinyls = [
    {
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      alt: "",
    },
    {
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      alt: "",
    },
    {
      url: "https://images.unsplash.com/photo-1535376472810-5d229c65da09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      alt: "",
    },
    {
      url: "https://images.unsplash.com/photo-1564284369929-026ba231f89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      alt: "",
    },
    {
      url: "https://images.unsplash.com/photo-1645680827507-9f392edae51c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      alt: "",
    },
    {
      url: "https://images.unsplash.com/photo-1655635131711-f52f3fd15328?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
      alt: "",
    },
    {
      url: "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2040&q=80",
      alt: "",
    },
  ];

  const [displayedItem, setDisplayedItem] = useState<number[]>([0, 1, 2, 3]);
  const [exitY, setExitY] = useState<string | number>("100%");
  const length = vinyls.length;

  function handleDragEnd(event: any, info: PanInfo) {
    console.log("handleDragEnd :>> ", info.offset.y);
    if (info.offset.y < -10) {
      // MOVE UP
      console.log("Move UP");
      setExitY(-500);
      setDisplayedItem((curr) =>
        curr.map((elem) => (elem === 0 ? (elem = length - 1) : (elem -= 1)))
      );
    }

    if (info.offset.y > 10) {
      console.log("Move DONW");
      setExitY(500);
      setDisplayedItem((curr) =>
        curr.map((elem) => (elem === length - 1 ? (elem = 0) : (elem += 1)))
      );
    }
  }

  const variants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 1.5,
      },
    },
    hidden: {
      y: 500,
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 1.5,
      },
    },
  };

  const childVariants: Variants = {
    visible: (index: number) => {
      return {
        opacity: 1,
        x: 0,
        //NOTE: Change Y according to the device
        y: 0 - index * 50,
        // z: 0 - index * 75,
        scale: 1 - (index * 10) / 100,
      };
    },
    hidden: (index: number) => {
      return {
        opacity: 1,
        x: 0,
        //NOTE: Change Y according to the device
        y: 0 - index * 25,
        // z: 0 - index * 50,
        scale: 1 - (index * 10) / 100,
      };
    },

    initial: {
      //Use this Y /w scroll
      y: 260,
    },

    animate: {
      y: 0,
    },

    initialBehind: (index: number) => ({
      y: 0 - index * 50,
      z: 0 - index * 75,
      transition: {
        duration: 0.1,
      },
    }),

    animBehind: (index: number) => ({
      y: 0 - index * 50,
      z: 0 - index * 75,
      transition: {
        duration: 0.1,
      },
    }),
  };

  const isMovingUp = exitY < 0;

  console.log("isMovingUp", isMovingUp, exitY);

  const [scrollValue, setScrollValue] = useState(0);

  const handleMouseScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollDelta = event.deltaY;

    if (scrollDelta > 10) {
      setDisplayedItem((curr) =>
        curr.map((elem) => (elem === length - 1 ? (elem = 0) : (elem += 1)))
      );
      setExitY(500);
    }

    if (scrollDelta < -10) {
      setDisplayedItem((curr) =>
        curr.map((elem) => (elem === 0 ? (elem = length - 1) : (elem -= 1)))
      );
      setExitY(-500);
    }

    setScrollValue(scrollDelta);
  };

  console.log("scrollValue", scrollValue);

  return (
    <>
      <Container
        onWheel={handleMouseScroll}
        variants={variants}
        animate="visible"
        initial="hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            className="square"
            drag="y"
            onDragEnd={handleDragEnd}
            dragConstraints={{ top: 0 }}
            dragElastic={0}
            variants={childVariants}
            custom={0}
            initial={isMovingUp ? "initial" : undefined}
            animate={isMovingUp ? "animate" : undefined}
            exit={{
              y: isMovingUp ? undefined : exitY,
              opacity: 1,
              transition: {
                duration: 0.1,
              },
            }}
            transition={{ type: "tween", ease: "linear" }}
            style={{ zIndex: 4 }}
            key={displayedItem[0]}
          >
            <img
              src={vinyls[displayedItem[0]].url}
              alt={vinyls[displayedItem[0]].alt}
            />
            <p>{displayedItem[0]}</p>
          </motion.div>
        </AnimatePresence>
        {[...Array(3)].map((_, i) => {
          const index = i + 1;
          const alreadyMoved = typeof exitY === "number";
          return (
            <AnimatePresence key={i} mode="wait">
              <motion.div
                variants={childVariants}
                custom={index}
                style={{ zIndex: `${4 - index}` }}
                className="square"
                key={displayedItem[index]}
                // initial={false}
                initial={alreadyMoved ? "initialBehind" : undefined}
                animate={alreadyMoved ? "animBehind" : undefined}
                exit={alreadyMoved ? "initialBehind" : undefined}
                // exit={{ opacity: 1, y: 0 - index * 25, z: 0 - index * 50 }}
              >
                <img
                  src={vinyls[displayedItem[index]].url}
                  alt={vinyls[displayedItem[index]].alt}
                />
                <p>{displayedItem[index]}</p>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </Container>
      <div style={{ display: "block", height: 2000 }}>ok</div>
    </>
  );
};

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  perspective: 800px;
  perspective-origin: center 60%;
  transform-style: preserve-3d;
  > div > p {
    font-size: 50px;
    color: #fff;
    -webkit-text-stroke: 2px #000;
  }
  > div > img {
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
`;

export default Vinyls;

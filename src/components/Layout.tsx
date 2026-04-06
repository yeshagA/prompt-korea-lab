import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "@/context/SidebarContext";

const FlyingBee = () => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: "fixed",
    zIndex: 999,
    pointerEvents: "none",
    width: "48px",
    height: "48px",
    top: "30%",
    left: "-80px",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
    transition: "none",
  });
  const [visible, setVisible] = useState(false);
  const directionRef = useRef<"right" | "left">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const fly = () => {
    const goRight = directionRef.current === "right";
    const randomTop = `${20 + Math.random() * 50}%`;
    setStyle((prev) => ({
      ...prev,
      transition: "none",
      left: goRight ? "-80px" : "110%",
      top: randomTop,
      transform: goRight ? "scaleX(1)" : "scaleX(-1)",
    }));
    setVisible(true);
    setTimeout(() => {
      setStyle((prev) => ({
        ...prev,
        transition: `left ${6 + Math.random() * 4}s linear`,
        left: goRight ? "110%" : "-80px",
      }));
    }, 50);
    const crossDuration = (6 + Math.random() * 4) * 1000;
    timerRef.current = setTimeout(() => {
      setVisible(false);
      directionRef.current = goRight ? "left" : "right";
      const waitTime = 6000 + Math.random() * 8000;
      timerRef.current = setTimeout(fly, waitTime);
    }, crossDuration + 500);
  };

  useEffect(() => {
    timerRef.current = setTimeout(fly, 2000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <img
      src="/bee.png"
      alt="bee"
      style={{
        ...style,
        animation: "beeFloat 2s ease-in-out infinite",
      }}
    />
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex flex-col">
      <FlyingBee />
      <Sidebar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </SidebarProvider>
);

export default Layout;
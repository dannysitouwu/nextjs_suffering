'use client';
import { useEffect, useRef, useState } from "react";
import { CardContainer, CardBody } from "./ui/3d-card";
import BlurOverlay from "./ui/BlurOverlay";
import Menu from "./sidermenu";
export const scrollContainerId = "main-scroll-container";

export default function Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isBlurring, setIsBlurring] = useState(false);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const sections = container.querySelectorAll("section[id]");

    const onScroll = () => {
      setIsBlurring(true);
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
      blurTimeout.current = setTimeout(() => setIsBlurring(false), 350);

      let current = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const middle = containerRect.top + containerRect.height / 2;
        if (rect.top <= middle && rect.bottom >= middle) {
          current = section.id;
        }
      });

      if (current && window.location.hash !== `#${current}`) {
        history.replaceState(null, "", `#${current}`);
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const target = container.querySelector(`#${hash}`);
      if (target) {
        setIsBlurring(true);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (blurTimeout.current) clearTimeout(blurTimeout.current);
        blurTimeout.current = setTimeout(() => setIsBlurring(false), 600);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    setTimeout(onHashChange, 100);

    const onCustomScroll = (e: Event) => {
      const customEvent = e as CustomEvent;
      const hash = customEvent.detail?.hash;
      const target = container.querySelector(`#${hash}`);
      if (target) {
        setIsBlurring(true);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (blurTimeout.current) clearTimeout(blurTimeout.current);
        blurTimeout.current = setTimeout(() => setIsBlurring(false), 600);
      }
    };

    window.addEventListener("scroll-to-section", onCustomScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll-to-section", onCustomScroll);
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
    };
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <aside
        className="flex-shrink-0 z-30 relative"
        style={{ width: 120, minWidth: 120, maxWidth: 120, height: "100vh" }}
      >
        <Menu />
      </aside>
      <main className="flex-1 h-full relative" style={{ minWidth: 0 }}>
        <style>{`
          html, body {
            overflow: hidden !important;
          }
          #${scrollContainerId} {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          #${scrollContainerId}::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div
          ref={scrollRef}
          id={scrollContainerId}
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            width: "100vw",
            height: "100vh",
            overflowX: "auto",
            overflowY: "auto",
            scrollBehavior: "smooth",
            backgroundImage: "url('/corkboard.jpeg')",
            backgroundAttachment: "local",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundPosition: "center",
            margin: 0,
            padding: 0,
            filter: isBlurring ? `blur(${8}px)` : "none",
            transition: "filter 0.25s cubic-bezier(.4,2,.6,1)",
          }}>
          <BlurOverlay scrollRef={scrollRef as any} isBlurring={isBlurring} />
          <div
            style={{
              height: 'auto',
              position: 'relative',
              zIndex: 20,
              transition: 'filter 0.25s cubic-bezier(.4,2,.6,1)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* home section */}
            <section
              style={{
                minHeight: '100vh',
                width: '100%',
                margin: 0,
                padding: '4rem 0 4rem 120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 24,
                boxSizing: 'border-box',
              }}
              id="home"
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(3, 200px)',
                gap: '2.0rem',
                maxWidth: '1000px',
                width: '100%',
                boxSizing: 'border-box',
              }}>
                <div style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2', zIndex: 1, height: '100%', width: '100%' }}>
                  <CardContainer className="h-full w-full">
                    <CardBody className="card3d h-full w-full" backgroundImage="/cleanpaper.png" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', width: '100%', height: '100%' }}>
                      <h1 id="home-title" style={{ fontSize: 36, fontWeight: 600, marginBottom: 16, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>Dannysito's Zone</h1>
                      <p style={{ fontSize: 18, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>¡This is a portfolio experiment from a junior student systems engineer who loves his golden retriever!</p>
                    </CardBody>
                  </CardContainer>
                </div>

                <div style={{ gridColumn: '3 / span 2', gridRow: '1 / span 1', zIndex: 1, height: '100%', width: '100%' }}>
                  <CardContainer className="h-full w-full">
                    <CardBody className="card3d h-full w-full" backgroundImage="/rustpaper.png" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', width: '100%', height: '100%' }}>
                      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>current status</h1>
                      <p style={{ fontSize: 16, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>suffering and studying to oneday be a systems engineer!</p>
                    </CardBody>
                  </CardContainer>
                </div>

                <div style={{ gridColumn: '1 / span 2', gridRow: '3 / span 1', zIndex: 1, height: '100%', width: '100%' }}>
                  <CardContainer className="h-full w-full">
                    <CardBody className="card3d h-full w-full" backgroundImage="/board.jpeg" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', width: '100%', height: '100%' }}>
                      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>skills</h1>
                      <p style={{ fontSize: 16, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>Java,Type -Script, React, Next.js, Node.js, Python</p>
                    </CardBody>
                  </CardContainer>
                </div>

                <div style={{ gridColumn: '3 / span 1', gridRow: '2 / span 2', zIndex: 1, height: 'auto', width: 'auto' }}>
                  <CardContainer className="h-full w-full">
                    <CardBody className="card3d h-full w-full" backgroundImage="/paper_clip.png" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', width: '100%', height: '100%' }}>
                      <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>fun fact</h1>
                      <p style={{ fontSize: 14, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>i really am a golden retriever lover, especially for my female golden retriever called mell!</p>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </section>
            {/* dannysito info */}
            <section
              style={{
                minHeight: '100vh',
                width: '100%',
                margin: 0,
                padding: '5rem 3vw 5rem 120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                scrollSnapAlign: 'start',
                borderRadius: 24,
                animation: 'fadeInUp 1s cubic-bezier(.4,2,.6,1)',
                boxSizing: 'border-box',
              }}
              id="dannysito_info"
            >
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <CardContainer>
                  <CardBody className="card3d" backgroundImage="/rustpaper.png" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', padding: '2.5rem 2rem 2rem 2rem' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>Some info</h1>
                    <p style={{ fontSize: 18, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>I study at UNADECA and... it's an experience.<br />I dont like here</p>
                  </CardBody>
                </CardContainer>
              </div>
            </section>
            {/* about dannysito */}
            <section
              style={{
                minHeight: '100vh',
                width: '100%',
                margin: 0,
                padding: '5rem 3vw 5rem 120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                scrollSnapAlign: 'start',
                borderRadius: 24,
                animation: 'fadeInUp 1s cubic-bezier(.4,2,.6,1)',
                boxSizing: 'border-box',
              }}
              id="about_dannysito"
            >
              <div style={{ maxWidth: '600px', width: '100%' }}>
                <CardContainer>
                  <CardBody className="card3d" backgroundImage="/paper_clip.png" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', padding: '2.5rem 2rem 2rem 2rem' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>About me S2</h1>
                    <p style={{ fontSize: 18, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>I love long rides with a good playlist, but I love my dog more!</p>
                  </CardBody>
                </CardContainer>
              </div>
            </section>
            {/* contact me */}
            <section
              style={{
                minHeight: '100vh',
                width: '100%',
                margin: 0,
                padding: '5rem 3vw 5rem 120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                scrollSnapAlign: 'start',
                borderRadius: 24,
                animation: 'fadeInUp 1s cubic-bezier(.4,2,.6,1)',
                boxSizing: 'border-box',
              }}
              id="contact_me"
            >
              <div style={{ width: '100%' }}>
                <CardContainer className="h-full w-full">
                  <CardBody className="card3d h-full w-full" backgroundImage="/rustpaper.png" style={{ backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: 18, border: '1.5px solid #e0d6c3', height: '100%', width: '100%', minHeight: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 56px 160px 32px rgba(0,0,0,0.75)', padding: '2.5rem 2rem 2rem 2rem' }}>
                    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16, textAlign: 'center', fontFamily: 'Caveat, cursive', color: '#2d2d2d', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>Contact</h1>
                    <div style={{ fontSize: 18, fontWeight: 400, marginBottom: 0, textAlign: 'center', color: '#4B3F2D', fontFamily: 'Caveat, cursive', textShadow: '0 1px 0 #fff, 0 2px 8px #bdbdbd80' }}>
                      You are free to contact me through my corporate accounts :D<br />
                      <div style={{ marginTop: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: 8 }}>
                          <span>Email:</span>
                          <a href="mailto:example@email.com" style={{ color: '#1976D2', textDecoration: 'underline' }}>dannysito@email.com</a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: 8 }}>
                          <span>Phone:</span>
                          <a href="tel:+506 1234-5678" style={{ color: '#1976D2', textDecoration: 'underline' }}>+506 6343 1521</a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: 8 }}>
                          <span>LinkedIn:</span>
                          <a href="https://www.linkedin.com/in/daniel-fernando-fernandes-silva-530061337/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976D2', textDecoration: 'underline' }}>LinkedIn</a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                          <span>GitHub:</span>
                          <a href="https://github.com/dannysitouwu" target="_blank" rel="noopener noreferrer" style={{ color: '#1976D2', textDecoration: 'underline' }}>dannysito_github</a>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
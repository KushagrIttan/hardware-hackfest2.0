import Navigation from "@/components/Navigation";
import LogoHeader from "@/components/LogoHeader";
import GlitchText from "@/components/GlitchText";
import NeonButton from "@/components/NeonButton";
import CursorFollower from "@/components/CursorFollower";
import ParallaxContainer from "@/components/ParallaxContainer";
import LazyImage from "@/components/LazyImage";
import PerformanceAwareAnimation from "@/components/PerformanceAwareAnimation";
import { useNavigate } from "react-router-dom";
import { usePerformanceMonitoring, useRenderPerformance } from "@/hooks/usePerformanceMonitoring";
import heroCircuit from "@/assets/hero-circuit.jpg";
import teamMeeting from "@/assets/gallery/team-meeting.jpg";
import robotProject from "@/assets/gallery/robot-project.jpg";
import teamGroup from "@/assets/gallery/team-group.jpg";
import teamCelebration from "@/assets/gallery/team-celebration.jpg";
import { Zap, Cpu, Hammer, Calendar, Users } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { shouldLazyLoad, shouldReduceAnimations, measureInteraction } = usePerformanceMonitoring();

  // Measure render performance for this component
  useRenderPerformance('Home');

  return (
    <div className="min-h-screen bg-background">
      <CursorFollower />
      <LogoHeader />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden" style={{ isolation: 'isolate' }}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <LazyImage
            src={heroCircuit}
            alt="Circuit board"
            className="w-full h-full object-cover misalign-down"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Title with Glitch */}
            <h1 className="text-7xl md:text-9xl font-mono-heading font-bold mb-6 relative animate-slide-in-bottom">
              <GlitchText intense>
                <span className="text-neon animate-text-flicker">HARDWARE</span>
              </GlitchText>
              <br />
              <ParallaxContainer intensity={8} className="inline-block">
                <span className="text-foreground inline-block">HACKFEST</span>
              </ParallaxContainer>
              <br />
              <span className="text-neon text-8xl md:text-[10rem] animate-scale-pulse">2.0</span>
            </h1>

            {/* Subtitle */}
            <p className="text-3xl md:text-4xl font-mono-heading text-muted-foreground mb-12 skew-slight">
              Build. <span className="text-neon">Break.</span> Iterate.
            </p>

            {/* Date Badge - Intentionally Misaligned */}
            <ParallaxContainer intensity={5} className="inline-block mb-12">
              <div className="inline-block border-2 border-dashed border-neon px-8 py-4 relative animate-border-dance">
                <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-neon animate-float" />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-neon animate-float" style={{ animationDelay: "0.5s" }} />
                <p className="font-mono-heading text-2xl text-neon font-bold">
                  OCTOBER 15<span className="text-foreground">—</span>16
                </p>
              </div>
            </ParallaxContainer>

            {/* CTA Buttons */}
            <div className="mb-16 space-y-6">
              <div>
                <NeonButton
                  onClick={() => window.open("https://unstop.com/hackathons/hardware-hackfest-20-powered-by-ieee-wie-elysian-2025-guru-gobind-singh-indraprastha-university-ggsipu-delhi-1566877", "_blank")}
                  className="text-xl px-12 py-6 misalign-down"
                >
                  REGISTER NOW
                </NeonButton>
              </div>
              <div>
                <button
                  onClick={() => navigate("/schedule")}
                  className="group relative border-2 border-dashed border-muted-foreground/50 px-8 py-3 font-mono-heading font-bold text-muted-foreground hover:border-neon hover:text-neon transition-all duration-300 hover:glow-neon flex items-center gap-3 mx-auto"
                >
                  <Calendar className="w-5 h-5 group-hover:animate-float" />
                  VIEW SCHEDULE
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-muted-foreground/50 group-hover:bg-neon transition-colors" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-muted-foreground/50 group-hover:bg-neon transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute left-0 top-1/3 w-64 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-50 misalign-up animate-slide-in-left" />
        <div className="absolute right-0 top-2/3 w-80 h-px bg-gradient-to-l from-transparent via-neon to-transparent opacity-50 misalign-down animate-slide-in-right" />

        {/* Floating Elements */}
        <div className="absolute left-20 bottom-20 w-2 h-2 bg-neon rounded-full glow-neon animate-float-rotate" />
        <div className="absolute right-32 top-40 w-3 h-3 bg-neon rounded-full glow-neon animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute left-1/3 bottom-40 w-2 h-2 bg-neon rounded-full glow-neon animate-float-rotate" style={{ animationDelay: "2s" }} />
      </section>

      {/* Info Section */}
      <section className="py-20 border-t border-dashed border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ParallaxContainer intensity={8}>
              <h2 className="text-4xl font-mono-heading font-bold mb-8 text-neon misalign-left animate-slide-in-left">
                [ABOUT_THE_EVENT]
              </h2>
            </ParallaxContainer>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hardware Hackfest 2.0 is a <span className="text-foreground font-bold">2-day intensive experience</span> designed
              for makers, hackers, and hardware enthusiasts of all skill levels. Whether you're building robots, IoT devices,
              or experimental electronics, this is your playground.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join us for <span className="text-neon font-bold">48 hours of creation</span>, collaboration, and controlled chaos.
              Break things. Fix them. Make them better. That's the hardware way.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-dashed border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <ParallaxContainer intensity={6}>
              <div className="border border-neon/30 p-6 relative group hover:border-neon hover:glow-neon transition-all hover:scale-105 animate-slide-in-bottom" style={{ animationDelay: "0.1s" }}>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon animate-float" />
                <Zap className="w-12 h-12 text-neon mb-4 group-hover:glow-strong transition-all group-hover:animate-float-rotate" />
                <h3 className="font-mono-heading text-xl font-bold mb-3 text-foreground">
                  FAST_PROTOTYPING
                </h3>
                <p className="text-muted-foreground text-sm">
                  Access to cutting-edge tools, components, and workstations. Build your idea from scratch in record time.
                </p>
              </div>
            </ParallaxContainer>

            {/* Feature 2 */}
            <ParallaxContainer intensity={8}>
              <div className="border border-neon/30 p-6 relative group hover:border-neon hover:glow-neon transition-all hover:scale-105 animate-slide-in-bottom" style={{ animationDelay: "0.2s" }}>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-neon animate-float" style={{ animationDelay: "0.5s" }} />
                <Cpu className="w-12 h-12 text-neon mb-4 group-hover:glow-strong transition-all group-hover:animate-float-rotate" />
                <h3 className="font-mono-heading text-xl font-bold mb-3 text-foreground">
                  OPEN_TO_ALL
                </h3>
                <p className="text-muted-foreground text-sm">
                  Beginners to experts. Solo builders to teams of 5. All backgrounds welcome. Mentors available.
                </p>
              </div>
            </ParallaxContainer>

            {/* Feature 3 */}
            <ParallaxContainer intensity={5}>
              <div className="border border-neon/30 p-6 relative group hover:border-neon hover:glow-neon transition-all hover:scale-105 animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-neon animate-float" style={{ animationDelay: "1s" }} />
                <Hammer className="w-12 h-12 text-neon mb-4 group-hover:glow-strong transition-all group-hover:animate-float-rotate" />
                <h3 className="font-mono-heading text-xl font-bold mb-3 text-foreground">
                  BUILD_REAL_THINGS
                </h3>
                <p className="text-muted-foreground text-sm">
                  Hardware, robotics, IoT, wearables—if it's physical and powered, you can build it here.
                </p>
              </div>
            </ParallaxContainer>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 border-t border-dashed border-border">
        <div className="container mx-auto px-4">
          <ParallaxContainer intensity={8}>
            <h2 className="text-4xl font-mono-heading font-bold mb-16 text-neon misalign-right animate-slide-in-right text-center">
              [MEMORIES_FROM_THE_PAST]
            </h2>
          </ParallaxContainer>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Photo 1 - Team Meeting */}
            <ParallaxContainer intensity={6}>
              <PerformanceAwareAnimation animationType="slide" delay={100}>
                <div className="relative group">
                  <div className="border-2 border-dashed border-neon/30 p-4 hover:border-neon transition-all duration-500 hover:glow-neon relative overflow-hidden">
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: "0.5s" }} />
                    <LazyImage
                      src={teamMeeting}
                      alt="Team Meeting"
                      className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <p className="font-mono-heading text-neon text-sm font-bold">TEAM_COLLABORATION</p>
                      <p className="text-xs text-muted-foreground">Building the future together</p>
                    </div>
                  </div>
                </div>
              </PerformanceAwareAnimation>
            </ParallaxContainer>

            {/* Photo 2 - Robot Project */}
            <ParallaxContainer intensity={8}>
              <PerformanceAwareAnimation animationType="slide" delay={200}>
                <div className="relative group">
                  <div className="border-2 border-dashed border-neon/30 p-4 hover:border-neon transition-all duration-500 hover:glow-neon relative overflow-hidden">
                    <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: "0.5s" }} />
                    <LazyImage
                      src={robotProject}
                      alt="Robot Project"
                      className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <p className="font-mono-heading text-neon text-sm font-bold">HARDWARE_INNOVATION</p>
                      <p className="text-xs text-muted-foreground">Creating intelligent machines</p>
                    </div>
                  </div>
                </div>
              </PerformanceAwareAnimation>
            </ParallaxContainer>

            {/* Photo 3 - Team Group */}
            <ParallaxContainer intensity={5}>
              <div className="relative group animate-slide-in-bottom" style={{ animationDelay: "0.3s" }}>
                <div className="border-2 border-dashed border-neon/30 p-4 hover:border-neon transition-all duration-500 hover:glow-neon relative overflow-hidden">
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: "0.5s" }} />
                  <img
                    src={teamGroup}
                    alt="Team Group"
                    className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="font-mono-heading text-neon text-sm font-bold">TEAM_SPIRIT</p>
                    <p className="text-xs text-muted-foreground">United by innovation</p>
                  </div>
                </div>
              </div>
            </ParallaxContainer>

            {/* Photo 4 - Team Celebration */}
            <ParallaxContainer intensity={7}>
              <div className="relative group animate-slide-in-bottom" style={{ animationDelay: "0.4s" }}>
                <div className="border-2 border-dashed border-neon/30 p-4 hover:border-neon transition-all duration-500 hover:glow-neon relative overflow-hidden">
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-neon animate-float opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: "0.5s" }} />
                  <img
                    src={teamCelebration}
                    alt="Team Celebration"
                    className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="font-mono-heading text-neon text-sm font-bold">SUCCESS_CELEBRATION</p>
                    <p className="text-xs text-muted-foreground">Achievements unlocked</p>
                  </div>
                </div>
              </div>
            </ParallaxContainer>
          </div>

          {/* Decorative Elements */}
          <div className="relative mt-16">
            <div className="absolute left-1/4 top-0 w-2 h-2 bg-neon rounded-full glow-neon animate-float-rotate" />
            <div className="absolute right-1/3 top-8 w-3 h-3 bg-neon rounded-full glow-neon animate-float" style={{ animationDelay: "1s" }} />
            <div className="absolute left-1/2 top-4 w-1 h-1 bg-neon rounded-full glow-neon animate-float-rotate" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-t border-dashed border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ParallaxContainer intensity={6}>
              <h2 className="text-4xl font-mono-heading font-bold text-neon mb-8 misalign-right animate-slide-in-right">
                [CONTACT_ORGANIZERS]
              </h2>
            </ParallaxContainer>
            <div className="grid md:grid-cols-2 gap-8">
              <ParallaxContainer intensity={4}>
                <div className="border-l-2 border-neon/50 pl-6 misalign-left animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-neon mt-1 shrink-0 animate-float" />
                    <div>
                      <p className="font-mono-heading font-bold text-foreground">Dhruv Basia</p>
                      <p className="text-sm text-muted-foreground hover:text-neon transition-colors cursor-pointer">basiadhruv@gmail.com</p>
                      <p className="text-sm text-muted-foreground hover:text-neon transition-colors cursor-pointer">+917292083676</p>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
              <ParallaxContainer intensity={5}>
                <div className="border-l-2 border-neon/50 pl-6 misalign-right animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-neon mt-1 shrink-0 animate-float" style={{ animationDelay: "0.5s" }} />
                    <div>
                      <p className="font-mono-heading font-bold text-foreground">Nyasa Vats</p>
                      <p className="text-sm text-muted-foreground hover:text-neon transition-colors cursor-pointer">nyasavats@gmail.com</p>
                      <p className="text-sm text-muted-foreground hover:text-neon transition-colors cursor-pointer">+917068991179</p>
                    </div>
                  </div>
                </div>
              </ParallaxContainer>
            </div>

            {/* Additional Contact Info */}
            <div className="mt-12 text-center">
              <ParallaxContainer intensity={3}>
                <div className="border border-neon/30 p-6 hover:border-neon hover:glow-neon transition-all duration-300 misalign-up">
                  <p className="font-mono-heading text-foreground font-bold mb-2">Have Questions?</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Reach out to our organizers for any queries about registration, event details, or technical requirements.
                  </p>
                  <div className="flex justify-center gap-4">
                    <div className="w-2 h-2 bg-neon rounded-full glow-neon animate-float" />
                    <div className="w-2 h-2 bg-neon rounded-full glow-neon animate-float" style={{ animationDelay: "0.3s" }} />
                    <div className="w-2 h-2 bg-neon rounded-full glow-neon animate-float" style={{ animationDelay: "0.6s" }} />
                  </div>
                </div>
              </ParallaxContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-dashed border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono-heading text-muted-foreground mb-4">
            © 2025 HARDWARE HACKFEST <span className="text-neon">2.0</span>
          </p>
          <div className="border-t border-dashed border-muted-foreground/20 pt-4">
            <p className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
              Website crafted by <span className="text-neon/80 font-mono-heading">Kushagr Ittan</span> •
              <a
                href="mailto:kushagrpc@gmail.com"
                className="hover:text-neon/80 transition-colors ml-1"
              >
                kushagrpc@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

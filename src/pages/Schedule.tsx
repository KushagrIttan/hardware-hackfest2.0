import Navigation from "@/components/Navigation";
import LogoHeader from "@/components/LogoHeader";
import GlitchText from "@/components/GlitchText";
import CursorFollower from "@/components/CursorFollower";
import ParallaxContainer from "@/components/ParallaxContainer";
import { Clock, MapPin, Users, Wrench, ShieldAlert } from "lucide-react";

const Schedule = () => {
  const dayOneEvents = [
    {
      time: "13:00",
      event: "Tech Relay Challenge",
      desc: "High-energy elimination rounds with multiple challenges",
      isMain: true,
      subEvents: [
        { event: "Switch Debate Booth", desc: "Quick-fire debates where participants switch perspectives on tech issues" },
        { event: "Typing Titans", desc: "Speed and accuracy race with code snippets or tech content" },
        { event: "Tech Pictionary", desc: "Draw-and-guess game based on robotics, AI, and tech terms" },
        { event: "Rapid-Fire Quiz", desc: "Focused on Robotics, AI, Indian innovations, and Women in STEM" },
      ]
    },
    { time: "17:00", event: "Tech Relay Challenge Ends", desc: "Cumulative scoring and qualification for Day 2" },
    { time: "19:00", event: "Results Declaration", desc: "Top 10 shortlisted teams announced" },
  ];

  const dayTwoEvents = [
    { time: "13:00", event: "Innovation Sprint Begins", desc: "Selected teams receive Arduino Mini Kits for hands-on creativity" },
    { time: "13:30", event: "Ideation Phase", desc: "Teams brainstorm solutions for Indian culture/festival challenges" },
    { time: "14:30", event: "Design & Prototyping", desc: "Build working prototypes using Arduino kits" },
    { time: "15:45", event: "Pitch Bold Presentations", desc: "Teams present prototypes to jury panel (15:45-16:45)" },
    { time: "17:00", event: "Results & Closing Ceremony", desc: "Awards announcement and event conclusion (17:00-17:30)" },
  ];

  const faqs = [
    { q: "What is Hardware HackFest 2.0?", a: "A two-day event themed 'Think Fast, Create Smart, Pitch Bold' designed for B.Tech students to spark creativity, teamwork, and technical awareness." },
    { q: "Who can participate?", a: "B.Tech students, with special encouragement for 1st and 2nd years. Teams of 4-5 students." },
    { q: "What happens on Day 1?", a: "Tech Relay Challenge with Switch Debate, Typing Titans, Tech Pictionary, and Rapid-Fire Quiz rounds." },
    { q: "What happens on Day 2?", a: "Innovation Sprint where qualified teams receive Arduino Mini Kits to build prototypes addressing Indian culture/festival challenges." },
    { q: "What should teams deliver?", a: "A working prototype/demo and a pitch presentation covering problem statement, solution, tech implementation, and cultural alignment." },
    { q: "When is the registration deadline?", a: "10 Oct 25, 11:59 PM IST" },
  ];

  const rules = [
    "Teams must consist of 4-5 B.Tech students (special encouragement for 1st and 2nd years).",
    "Day 1 scores are cumulative across all Tech Relay Challenge rounds.",
    "Only top-scoring teams from Day 1 qualify for Day 2 Innovation Sprint.",
    "Day 2 prototypes must be built using provided Arduino Mini Kits during the event.",
    "Solutions should address challenges in Indian culture, festivals, or daily life through robotics/AI.",
    "Teams must deliver both a working prototype and a pitch presentation.",
    "LAPTOPS WON'T BE PROVIDED - Students must bring their own laptops for the event.",
  ];

  return (
    <div className="min-h-screen bg-background">
      <CursorFollower />
      <LogoHeader />
      <Navigation />

      <div className="pt-48 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-6xl md:text-8xl font-mono-heading font-bold mb-4 misalign-right animate-slide-in-right">
              <GlitchText>
                <span className="text-neon animate-text-flicker">SCHEDULE</span>
              </GlitchText>
              <br />
              <ParallaxContainer intensity={12}>
                <span className="text-foreground misalign-left inline-block">& DETAILS</span>
              </ParallaxContainer>
            </h1>
            <div className="flex items-center gap-3 mt-8 text-muted-foreground misalign-down animate-slide-in-left">
              <MapPin className="w-5 h-5 text-neon animate-neon-pulse" />
              <p className="font-mono-heading">USAR - University School of Automation & Robotics</p>
            </div>
            <div className="mt-4 p-4 border border-neon/30 rounded-lg bg-background/50">
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-neon">Theme:</strong> "Technology and Robotics in Indian Festivals and Indian Culture"
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-neon">Registration Deadline:</strong> 10 Oct 25, 11:59 PM IST
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-neon">Target Audience:</strong> B.Tech students (special encouragement for 1st and 2nd years)
              </p>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Day 1 */}
              <div className="border-l-2 border-dashed border-neon/50 pl-8 misalign-up">
                <h2 className="text-3xl font-mono-heading font-bold text-neon mb-8">
                  DAY_01 <span className="text-muted-foreground">// OCT 15</span>
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Offline Round 1 - Tech Relay Challenge</p>
                <div className="space-y-6">
                  {dayOneEvents.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[2.35rem] top-2 w-3 h-3 bg-neon rounded-full glow-neon" />
                      <div className="flex items-start gap-4">
                        <Clock className="w-4 h-4 text-neon mt-1 shrink-0" />
                        <div className="w-full">
                          <p className="font-mono-heading text-foreground font-bold">{item.time}</p>
                          <p className="font-mono-heading text-sm text-neon">{item.event}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>

                          {/* Sub-events for Tech Relay Challenge */}
                          {item.subEvents && (
                            <div className="mt-4 ml-4 space-y-3 border-l-2 border-dashed border-muted-foreground/30 pl-4">
                              {item.subEvents.map((subEvent, subIdx) => (
                                <div key={subIdx} className="relative group cursor-pointer transition-all duration-300 hover:scale-105 p-2 -m-2 rounded-md hover:bg-neon/5">
                                  <div className="absolute -left-[1.75rem] top-3 w-2 h-2 bg-muted-foreground/50 rounded-full group-hover:bg-neon group-hover:glow-neon transition-all duration-300" />
                                  <div>
                                    <p className="font-mono-heading text-xs text-foreground/80 font-semibold group-hover:text-neon group-hover:glow-text transition-all duration-300">{subEvent.event}</p>
                                    <p className="text-xs text-muted-foreground/80 mt-0.5 group-hover:text-foreground transition-colors duration-300">{subEvent.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 2 */}
              <div className="border-l-2 border-dashed border-neon/50 pl-8 misalign-down">
                <h2 className="text-3xl font-mono-heading font-bold text-neon mb-8">
                  DAY_02 <span className="text-muted-foreground">// OCT 16</span>
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Offline Round 2 - Innovation Sprint</p>
                <div className="space-y-6">
                  {dayTwoEvents.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[2.35rem] top-2 w-3 h-3 bg-neon rounded-full glow-neon" />
                      <div className="flex items-start gap-4">
                        <Clock className="w-4 h-4 text-neon mt-1 shrink-0" />
                        <div>
                          <p className="font-mono-heading text-foreground font-bold">{item.time}</p>
                          <p className="font-mono-heading text-sm text-neon">{item.event}</p>
                          <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="max-w-4xl mx-auto mb-20 border-t border-dashed border-border pt-20">
            <h2 className="text-4xl font-mono-heading font-bold text-neon mb-8 misalign-left">
              [EVENT_HIGHLIGHTS]
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neon/30 p-6 hover:border-neon transition-all misalign-up">
                <Wrench className="w-8 h-8 text-neon mb-4" />
                <h3 className="font-mono-heading font-bold text-foreground mb-2">Hands-on Hardware</h3>
                <p className="text-sm text-muted-foreground">Direct exposure to AI, robotics, and embedded systems with Arduino Mini Kits</p>
              </div>
              <div className="border border-neon/30 p-6 hover:border-neon transition-all misalign-down">
                <Users className="w-8 h-8 text-neon mb-4" />
                <h3 className="font-mono-heading font-bold text-foreground mb-2">Cultural Integration</h3>
                <p className="text-sm text-muted-foreground">Blend Indian culture & innovation with cutting-edge technology solutions</p>
              </div>
              <div className="border border-neon/30 p-6 hover:border-neon transition-all misalign-left">
                <Clock className="w-8 h-8 text-neon mb-4" />
                <h3 className="font-mono-heading font-bold text-foreground mb-2">Fast-Paced Challenges</h3>
                <p className="text-sm text-muted-foreground">High-energy relay rounds testing diverse skills and quick thinking</p>
              </div>
              <div className="border border-neon/30 p-6 hover:border-neon transition-all misalign-right">
                <ShieldAlert className="w-8 h-8 text-neon mb-4" />
                <h3 className="font-mono-heading font-bold text-foreground mb-2">Recognition & Awards</h3>
                <p className="text-sm text-muted-foreground">Opportunities for teamwork, creativity, leadership, and top-performer recognition</p>
              </div>
            </div>
          </div>

          {/* Powered By Section */}
          <div className="max-w-4xl mx-auto mb-20 border-t border-dashed border-border pt-20">
            <h2 className="text-4xl font-mono-heading font-bold text-neon mb-8 misalign-right">
              [POWERED_BY]
            </h2>
            <div className="flex justify-center items-center gap-8">
              <div className="border border-neon/30 p-6 hover:border-neon transition-all">
                <p className="font-mono-heading font-bold text-foreground text-center">IEEE</p>
              </div>
              <div className="text-neon text-2xl">×</div>
              <div className="border border-neon/30 p-6 hover:border-neon transition-all">
                <p className="font-mono-heading font-bold text-foreground text-center">WIE USAR</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-20 border-t border-dashed border-border pt-20">
            <h2 className="text-4xl font-mono-heading font-bold text-neon mb-8 misalign-right">
              [FAQ]
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`border-l-2 border-neon/50 pl-6 ${idx % 2 === 0 ? "misalign-left" : ""}`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Users className="w-5 h-5 text-neon mt-1 shrink-0" />
                    <p className="font-mono-heading font-bold text-foreground">{faq.q}</p>
                  </div>
                  <p className="text-muted-foreground ml-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rules Section */}
          <div className="max-w-4xl mx-auto mb-20 border-t border-dashed border-border pt-20">
            <h2 className="text-4xl font-mono-heading font-bold text-neon mb-8 misalign-left flex items-center gap-3">
              <ShieldAlert className="w-10 h-10" />
              [RULES_&_GUIDELINES]
            </h2>
            <div className="space-y-4">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-4 misalign-down">
                  <Wrench className="w-5 h-5 text-neon mt-1 shrink-0" />
                  <p className="text-muted-foreground">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-4xl mx-auto border-t border-dashed border-border pt-20">
            <h2 className="text-4xl font-mono-heading font-bold text-neon mb-8 misalign-right">
              [CONTACT_ORGANIZERS]
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-2 border-neon/50 pl-6 misalign-left">
                <div className="flex items-start gap-3 mb-2">
                  <Users className="w-5 h-5 text-neon mt-1 shrink-0" />
                  <div>
                    <p className="font-mono-heading font-bold text-foreground">Dhruv Basia</p>
                    <p className="text-sm text-muted-foreground">basiadhruv@gmail.com</p>
                    <p className="text-sm text-muted-foreground">+917292083676</p>
                  </div>
                </div>
              </div>
              <div className="border-l-2 border-neon/50 pl-6 misalign-right">
                <div className="flex items-start gap-3 mb-2">
                  <Users className="w-5 h-5 text-neon mt-1 shrink-0" />
                  <div>
                    <p className="font-mono-heading font-bold text-foreground">Nyasa Vats</p>
                    <p className="text-sm text-muted-foreground">nyasavats@gmail.com</p>
                    <p className="text-sm text-muted-foreground">+917068991179</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Schedule;

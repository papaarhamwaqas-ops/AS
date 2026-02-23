import { Button } from "@/components/ui/button"
import { ArrowRight, Wallet, Shield, Zap } from "lucide-react"

interface LandingHeroProps {
  onGetStarted: () => void
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium border rounded-full glass-card border-white/10 animate-fade-in-up">
          <span className="flex w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-white/80">Experience the future of finance</span>
        </div>
        
        <h1 className="mb-6 text-6xl md:text-8xl font-headline font-extrabold tracking-tight animate-fade-in-up [animation-delay:200ms]">
          AS <span className="text-primary">TRACK</span>
        </h1>
        
        <p className="max-w-2xl mx-auto mb-10 text-lg md:text-xl text-white/60 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
          Redefine how you manage your wealth. A premium, minimal, and lightning-fast expense tracker designed for the ambitious.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="group px-8 py-7 text-lg bg-primary text-black hover:bg-primary/90 rounded-2xl transition-all duration-300 yellow-glow"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 animate-fade-in-up [animation-delay:800ms]">
          <div className="p-6 glass-card rounded-3xl text-left border border-white/5">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
              <Zap className="text-primary" />
            </div>
            <h3 className="text-xl font-headline mb-2 text-white">Instant Entry</h3>
            <p className="text-white/40">Log expenses in seconds with our optimized interface.</p>
          </div>
          <div className="p-6 glass-card rounded-3xl text-left border border-white/5">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
              <Shield className="text-primary" />
            </div>
            <h3 className="text-xl font-headline mb-2 text-white">Secure Data</h3>
            <p className="text-white/40">Your financial data stays private and encrypted.</p>
          </div>
          <div className="p-6 glass-card rounded-3xl text-left border border-white/5">
            <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-2xl mb-4">
              <Wallet className="text-primary" />
            </div>
            <h3 className="text-xl font-headline mb-2 text-white">Smart Insights</h3>
            <p className="text-white/40">Deep dive into your spending habits with clear charts.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

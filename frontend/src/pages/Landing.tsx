import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Navigation scroll effect
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 20) {
          nav.classList.add('shadow-sm', 'bg-surface/95');
        } else {
          nav.classList.remove('shadow-sm', 'bg-surface/95');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
      observer.observe(el);
    });

    // WebGL Shader Animation
    const canvas = canvasRef.current;
    if (canvas) {
      const syncSize = () => {
        const w = canvas.clientWidth || 1280;
        const h = canvas.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      };

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(syncSize);
        resizeObserver.observe(canvas);
      }
      syncSize();

      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
        const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    
    // Create a soft, slow-moving mesh of green and blue
    float noise = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 3.0 + u_time * 0.4);
    noise += sin(uv.x * 2.0 - u_time * 0.3) * cos(uv.y * 4.0 + u_time * 0.2);
    
    vec3 color1 = vec3(0.13, 0.77, 0.37); // Brand Green #22C55E
    vec3 color2 = vec3(0.23, 0.51, 0.96); // Accent Blue #3B82F6
    vec3 bgColor = vec3(0.95, 0.98, 0.94); // Light Surface
    
    float mixFactor = clamp(noise * 0.5 + 0.5, 0.0, 1.0);
    vec3 finalColor = mix(color1, color2, mixFactor);
    
    // Faint overlay for a "premium" feel
    gl_FragColor = vec4(mix(bgColor, finalColor, 0.08), 1.0);
}`;
        const cs = (type: number, src: string) => {
          const s = (gl as WebGLRenderingContext).createShader(type);
          if (!s) throw new Error('Shader creation failed');
          (gl as WebGLRenderingContext).shaderSource(s, src);
          (gl as WebGLRenderingContext).compileShader(s);
          return s;
        };
        const prog = (gl as WebGLRenderingContext).createProgram();
        if (prog) {
          (gl as WebGLRenderingContext).attachShader(prog, cs((gl as WebGLRenderingContext).VERTEX_SHADER, vs));
          (gl as WebGLRenderingContext).attachShader(prog, cs((gl as WebGLRenderingContext).FRAGMENT_SHADER, fs));
          (gl as WebGLRenderingContext).linkProgram(prog);
          (gl as WebGLRenderingContext).useProgram(prog);
          const buf = (gl as WebGLRenderingContext).createBuffer();
          (gl as WebGLRenderingContext).bindBuffer((gl as WebGLRenderingContext).ARRAY_BUFFER, buf);
          (gl as WebGLRenderingContext).bufferData((gl as WebGLRenderingContext).ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), (gl as WebGLRenderingContext).STATIC_DRAW);
          const pos = (gl as WebGLRenderingContext).getAttribLocation(prog, 'a_position');
          (gl as WebGLRenderingContext).enableVertexAttribArray(pos);
          (gl as WebGLRenderingContext).vertexAttribPointer(pos, 2, (gl as WebGLRenderingContext).FLOAT, false, 0, 0);
          const uTime = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_time');
          const uRes = (gl as WebGLRenderingContext).getUniformLocation(prog, 'u_resolution');

          let animationFrameId: number;
          const render = (t: number) => {
            (gl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height);
            if (uTime) (gl as WebGLRenderingContext).uniform1f(uTime, t * 0.001);
            if (uRes) (gl as WebGLRenderingContext).uniform2f(uRes, canvas.width, canvas.height);
            (gl as WebGLRenderingContext).drawArrays((gl as WebGLRenderingContext).TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(render);
          };
          render(0);

          return () => {
            cancelAnimationFrame(animationFrameId);
            if (resizeObserver) resizeObserver.disconnect();
          };
        }
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen bg-surface">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-gutter md:px-margin-desktop bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-300">
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
          </div>
          <span className="font-headline-md text-headline-md font-black tracking-tighter text-primary">GRAPHODO</span>
        </div>
        <div className="hidden md:flex items-center gap-xl">
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Home</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Features</a>
          <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">About</a>
          <div className="h-4 w-[1px] bg-outline-variant"></div>
          <Link to="/login" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors">Login</Link>
          <Link to="/register" className="bg-primary text-on-primary px-md py-sm rounded-lg font-label-sm text-label-sm font-semibold hover:bg-surface-tint transition-soft shadow-sm">
            Get Started
          </Link>
        </div>
        <button className="md:hidden text-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-xl px-gutter md:px-margin-desktop overflow-hidden">
        {/* Ambient Shader Background */}
        <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply" style={{ display: 'block' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-2xl">
          <div className="inline-flex items-center gap-sm bg-primary/10 border border-primary/20 px-sm py-1 rounded-full mb-md animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">New: Animated Velocity Insights</span>
          </div>
          <h1 className="font-display text-display md:text-[72px] mb-md leading-none tracking-tight text-on-background">
            Master Your Time, <br />
            <span className="text-primary italic">Visualize Your Growth.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl leading-relaxed">
            The high-performance workspace designed for builders. Track tasks, build lasting habits, and see your progress through beautiful, data-driven analytics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
            <Link to="/register" className="w-full sm:w-auto bg-primary text-on-primary px-xl py-md rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-sm hover:scale-[1.02] active:scale-[0.98] transition-soft shadow-lg shadow-primary/20">
              Get Started for Free
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <button className="w-full sm:w-auto glass-panel text-on-surface px-xl py-md rounded-xl font-headline-md text-headline-md border border-outline-variant hover:bg-surface-container transition-soft">
              Book a Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative z-10 w-full max-w-6xl mx-auto mt-xl">
          <div className="relative rounded-2xl overflow-hidden border border-outline-variant shadow-2xl bg-surface-container-low group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
            <img alt="Graphodo Dashboard Interface" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSaSOndiNskBGAC_LlvzFy1NGhPzXTyG5KSQiBJ1BzR0UHOSslxdv5OkVuckpKB9ZeWVWei0SvTxM2-ff6Is7sUi3gbxcSeqq74IE6RyBif0e2koK3qN5IFDXAYigJOAwvl5oX9PNocx-r9GRTr1RN07DZE84FK-ojWeA0duLd1bwXQy41BEsyhEBU9tTSyKXmgi7jSB0A-n9W1jr7q8oM44IxzYuglsAD7GjDk4Scg4zYkN937cE" />
            {/* Floating Glass Elements for added depth */}
            <div className="absolute top-8 right-8 glass-panel p-md rounded-xl shadow-xl hidden md:block animate-bounce-slow z-20">
              <div className="flex items-center gap-sm mb-xs">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="font-label-sm text-label-sm font-bold">Velocity: +14%</span>
              </div>
              <div className="w-32 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Bento Grid */}
      <section className="py-2xl px-gutter md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto reveal-on-scroll">
          <div className="mb-xl text-center">
            <h2 className="font-headline-lg text-headline-lg mb-sm">Everything you need to ship faster.</h2>
            <p className="text-on-surface-variant font-body-lg">Powerful tools, intentionally designed to stay out of your way.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md h-auto md:h-[600px]">
            {/* Main Feature */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-outline-variant bg-white p-lg flex flex-col justify-between hover:shadow-lg transition-soft">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary mb-md">
                  <span className="material-symbols-outlined">leaderboard</span>
                </div>
                <h3 className="font-headline-md text-headline-md mb-xs">Animated Analytics</h3>
                <p className="text-on-surface-variant max-w-md">Real-time visualization of your productivity peaks and valleys. Deep-dive into weekly velocity charts that update as you work.</p>
              </div>
              <div className="mt-xl relative h-[250px] md:h-full w-full rounded-lg overflow-hidden border border-outline-variant bg-surface-container">
                <div className="absolute inset-0 p-md">
                  <div className="flex items-end gap-sm h-full">
                    <div className="w-full bg-primary/20 rounded-t-sm animate-pulse" style={{ height: '40%' }}></div>
                    <div className="w-full bg-primary/40 rounded-t-sm" style={{ height: '65%' }}></div>
                    <div className="w-full bg-primary/60 rounded-t-sm animate-pulse" style={{ height: '50%' }}></div>
                    <div className="w-full bg-primary/80 rounded-t-sm" style={{ height: '85%' }}></div>
                    <div className="w-full bg-primary rounded-t-sm" style={{ height: '100%' }}></div>
                    <div className="w-full bg-primary/40 rounded-t-sm" style={{ height: '60%' }}></div>
                    <div className="w-full bg-primary/20 rounded-t-sm" style={{ height: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary 1 */}
            <div className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-outline-variant bg-white p-lg flex flex-col hover:shadow-lg transition-soft">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center text-secondary mb-md">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Unified Tasks</h3>
              <p className="text-on-surface-variant mb-xl">Sync your Jira, Linear, and GitHub tasks in one clean view. No more tab hopping.</p>
              <div className="mt-auto space-y-sm">
                <div className="flex items-center gap-sm p-sm rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="material-symbols-outlined text-sm text-outline">circle</span>
                  <span className="font-label-sm text-label-sm">Refactor Authentication API</span>
                </div>
                <div className="flex items-center gap-sm p-sm rounded-lg bg-surface-container-low border border-outline-variant">
                  <span className="material-symbols-outlined text-sm text-outline">circle</span>
                  <span className="font-label-sm text-label-sm">Update Design Tokens</span>
                </div>
              </div>
            </div>

            {/* Secondary 2 */}
            <div className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-outline-variant bg-white p-lg flex flex-col hover:shadow-lg transition-soft">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-md">
                <span className="material-symbols-outlined">repeat</span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs">Habit Streaks</h3>
              <p className="text-on-surface-variant">Gamify your discipline. Visual feedback on your longest streaks to keep you motivated every day.</p>
              <div className="flex gap-2 mt-md">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">M</div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">T</div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold">W</div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant text-[10px]">T</div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant text-[10px]">F</div>
              </div>
            </div>

            {/* Secondary 3 */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-outline-variant bg-inverse-surface p-lg text-white flex flex-col justify-between hover:shadow-lg transition-soft">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline-md text-headline-md mb-xs">Command Palette</h3>
                  <p className="text-surface-variant max-w-sm">Press <kbd className="px-1.5 py-0.5 rounded border border-outline bg-surface-variant text-on-surface font-mono">⌘ K</kbd> to execute any action instantly. Zero latency productivity.</p>
                </div>
                <span className="material-symbols-outlined text-4xl text-primary-fixed opacity-50">keyboard_command_key</span>
              </div>
              <div className="mt-md bg-white/5 rounded-lg p-sm font-mono text-label-sm text-surface-variant border border-white/10">
                &gt; /create_task "Fix header layout" --today
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Logotypes */}
      <section className="py-xl px-gutter md:px-margin-desktop border-y border-outline-variant/30 reveal-on-scroll">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-xl opacity-40 grayscale hover:grayscale-0 transition-soft">
          <span className="font-headline-md font-bold tracking-tight">VERTEX</span>
          <span className="font-headline-md font-bold tracking-tight">NEXUS</span>
          <span className="font-headline-md font-bold tracking-tight">PRISM</span>
          <span className="font-headline-md font-bold tracking-tight">LUMINA</span>
          <span className="font-headline-md font-bold tracking-tight">QUANTUM</span>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-2xl px-gutter md:px-margin-desktop overflow-hidden bg-surface reveal-on-scroll">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] hero-glow opacity-30"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-display mb-md">Ready to visualize your growth?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Join 50,000+ creators and builders who have leveled up their productivity with Graphodo.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
            <Link to="/register" className="bg-primary text-on-primary px-xl py-md rounded-xl font-headline-md text-headline-md hover:shadow-xl hover:scale-[1.02] transition-soft">
              Get Started for Free
            </Link>
            <div className="text-label-sm text-on-surface-variant">No credit card required. Cancel anytime.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-xl px-gutter md:px-margin-desktop border-t border-outline-variant bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-xl">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-sm mb-md">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
              </div>
              <span className="font-headline-md text-headline-md font-black tracking-tighter text-primary">GRAPHODO</span>
            </div>
            <p className="text-on-surface-variant text-body-md mb-md">The modern standard for high-performance productivity.</p>
            <div className="flex gap-sm">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">public</span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">alternate_email</span>
            </div>
          </div>
          <div>
            <h4 className="font-label-sm text-label-sm font-bold mb-md uppercase tracking-wider">Product</h4>
            <ul className="space-y-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Enterprise</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-sm text-label-sm font-bold mb-md uppercase tracking-wider">Resources</h4>
            <ul className="space-y-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">Documentation</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Guides</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">API Status</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-sm text-label-sm font-bold mb-md uppercase tracking-wider">Company</h4>
            <ul className="space-y-sm text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-2xl pt-lg border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="text-label-sm text-on-surface-variant">© 2024 GRAPHODO. All rights reserved.</span>
          <div className="flex gap-lg">
            <span className="text-label-sm text-on-surface-variant hover:text-primary cursor-pointer">Privacy Policy</span>
            <span className="text-label-sm text-on-surface-variant hover:text-primary cursor-pointer">Terms of Service</span>
            <span className="text-label-sm text-on-surface-variant hover:text-primary cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

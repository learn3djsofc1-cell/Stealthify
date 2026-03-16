import Infrastructure3D from './Infrastructure3D';

const InfrastructureSection = () => {
  return (
    <section className="w-full py-24 bg-[#FFF6E5] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6 tracking-tight">
            Architecture & Security
          </h2>
          <p className="text-black/50 text-lg font-light max-w-2xl mx-auto">
            RelayForge is modular and cloud-native with options for self-hosted relayer lanes. Core components include session sandboxing, agent orchestration, and encrypted key management.
          </p>
        </div>

        <Infrastructure3D />

        <div className="mt-12 border-t border-black/[0.06] pt-8">
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-16 opacity-60">
            {[
              "NO LOGS",
              "E2E ENCRYPTED",
              "FINGERPRINT ISOLATED",
              "OPENCLAW AUDITED",
              "GDPR READY"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black/40"></div>
                <span className="text-[10px] md:text-xs font-bold tracking-widest text-black/60 uppercase font-mono whitespace-nowrap">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default InfrastructureSection;

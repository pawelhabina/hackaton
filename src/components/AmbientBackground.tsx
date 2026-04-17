export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="ambient-grid absolute inset-0 opacity-45" />
      <div className="ambient-noise absolute inset-0 opacity-25" />
      <div className="ambient-radial absolute inset-0" />
      <div className="absolute left-[-12rem] top-[8rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/18 blur-[110px]" />
      <div className="absolute right-[-10rem] top-[16rem] h-[26rem] w-[26rem] rounded-full bg-sky-500/15 blur-[120px]" />
      <div className="absolute bottom-[-10rem] left-1/2 h-[28rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/16 blur-[140px]" />
    </div>
  );
}

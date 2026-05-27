"use client";

export default function ArcReactor({ size = 120 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer ring — gold suit trim */}
      <div
        className="absolute rounded-full border-2 rotate-slow"
        style={{
          width: size,
          height: size,
          borderColor: "rgba(201,168,76,0.3)",
          borderTopColor: "rgba(201,168,76,0.9)",
        }}
      />
      {/* Middle ring — blue reactor */}
      <div
        className="absolute rounded-full border rotate-reverse"
        style={{
          width: size * 0.76,
          height: size * 0.76,
          borderColor: "rgba(0,212,255,0.2)",
          borderBottomColor: "rgba(0,212,255,0.95)",
          boxShadow: "0 0 12px rgba(0,212,255,0.5)",
        }}
      />
      {/* Inner ring — red suit */}
      <div
        className="absolute rounded-full border rotate-slow"
        style={{
          width: size * 0.52,
          height: size * 0.52,
          borderColor: "rgba(204,17,17,0.2)",
          borderLeftColor: "rgba(204,17,17,0.8)",
        }}
      />
      {/* Core — blue/white arc reactor glow */}
      <div
        className="arc-reactor rounded-full"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          background:
            "radial-gradient(circle, rgba(220,245,255,1) 0%, rgba(0,212,255,0.9) 40%, rgba(0,80,180,0.5) 80%, transparent 100%)",
          boxShadow: "0 0 20px rgba(0,212,255,0.9), 0 0 40px rgba(0,150,255,0.5)",
        }}
      />
    </div>
  );
}

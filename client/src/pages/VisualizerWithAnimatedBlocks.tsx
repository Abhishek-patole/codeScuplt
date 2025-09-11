import React from "react";
import { motion } from "framer-motion";

type Step = {
  title?: string;
  operation?: string;
  variables: Record<string, unknown>;
  visit?: { from_array: string; index: number };
  found?: { array: string; index: number };
  compareOperation?: string;
  changed?: string[];
};

interface Props {
  step: Step;
}

export default function VisualizerWithAnimatedBlocks({ step }: Props) {
  if (!step || !step.variables) return null;

  const scalarVars = Object.entries(step.variables).filter(
    ([, v]) => !Array.isArray(v)
  );
  const arrayVars = Object.entries(step.variables).filter(
    ([, v]) => Array.isArray(v)
  );

  const visit = step.visit;
  const found = step.found;
  const compareOp = step.compareOperation;
  const blockSize = 64;
  const gap = 14;

  const baseBlockStyle: React.CSSProperties = {
    width: blockSize,
    height: blockSize,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    flexDirection: "column",
    fontSize: 14,
    padding: 6,
    textAlign: "center",
    position: "relative",
    boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(6px)",
  };

  return (
    <div
      style={{
        marginTop: 20,
        padding: 24,
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      }}
    >
      {/* Step Title */}
      <h3
        style={{
          color: "#F9FAFB",
          marginBottom: 10,
          fontSize: 20,
          fontWeight: 700,
          textShadow: "0 1px 4px rgba(0,0,0,0.6)",
        }}
      >
        {step.title}
      </h3>

   {/* Operation */}
{step.operation && (
  <motion.p
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    style={{
      color: "#F3F4F6",
      fontFamily: "monospace",
      background:
        "linear-gradient(90deg, rgba(29,78,216,0.85), rgba(37,99,235,0.55), rgba(59,130,246,0.3))",
      padding: "12px 16px",
      borderRadius: 10,
      fontSize: 15,
      marginBottom: 16,
      whiteSpace: "pre-wrap",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
      letterSpacing: 0.3,
      lineHeight: 1.5,
      textTransform: "none",
    }}
  >
    {step.operation.charAt(0).toUpperCase() + step.operation.slice(1)}
  </motion.p>
)}


  {/* Arrays */}
{arrayVars.map(([name, arr]) => {
  return (
    <div key={name} style={{ marginBottom: 28 }}>
      {/* Array name */}
      <div
        style={{
          color: "#BFDBFE",
          marginBottom: 12,
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: 4,
        }}
      >
        {name}
      </div>

      {/* Array blocks */}
      <div
        style={{
          display: "flex",
          gap: gap,
          alignItems: "flex-end",
          minHeight: blockSize + 50,
          position: "relative",
          flexWrap: "wrap",
          padding: "10px 12px",
          borderRadius: 10,
          background:
            "linear-gradient(180deg, rgba(30,41,59,0.7), rgba(15,23,42,0.9))",
          boxShadow: "inset 0 1px 6px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        {(arr as unknown[]).map((val, idx) => {
          const isVisited =
            visit && visit.from_array === name && visit.index === idx;
          const isFound =
            found && found.array === name && found.index === idx;

          let bgColor = "linear-gradient(135deg, #475569, #334155)"; // default
          if (isFound)
            bgColor = "linear-gradient(135deg, #22C55E, #16A34A)";
          else if (isVisited)
            bgColor = "linear-gradient(135deg, #2563EB, #3B82F6)";

          return (
            <motion.div
              key={`${name}-${idx}-${JSON.stringify(val)}`}
              layout
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                background: bgColor,
                boxShadow:
                  isFound
                    ? "0 0 16px rgba(34,197,94,0.6)"
                    : isVisited
                    ? "0 0 14px rgba(59,130,246,0.6)"
                    : "0 2px 6px rgba(0,0,0,0.4)",
              }}
              transition={{ duration: 0.5 }}
              style={{
                ...baseBlockStyle,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Comparison symbol above block */}
              {isVisited && compareOp && (
                <div
                  style={{
                    position: "absolute",
                    top: -26,
                    fontSize: 22,
                    color: "#FACC15",
                    textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  {compareOp}
                </div>
              )}

              {/* Index label */}
              <div
                style={{
                  fontSize: 12,
                  color: "#E5E7EB",
                  opacity: 0.9,
                  fontWeight: 600,
                }}
              >
                {idx}
              </div>

              {/* Value */}
              <div
                style={{
                  fontSize: 16,
                  marginTop: 4,
                  color: "#F9FAFB",
                  textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                }}
              >
                {JSON.stringify(val)}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
})}

   {/* Scalars */}
{scalarVars.length > 0 && (
  <div
    style={{
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
      marginTop: 14,
      padding: "12px 14px",
      borderRadius: 10,
      background:
        "linear-gradient(180deg, rgba(17,24,39,0.7), rgba(15,23,42,0.9))",
      boxShadow: "inset 0 1px 6px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.35)",
    }}
  >
    {scalarVars.map(([name, val]) => {
      const changed = (step.changed || []).includes(name);
      return (
        <motion.div
          key={name}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: changed ? [1, 1.12, 1] : 1,
            opacity: 1,
            background: changed
              ? "linear-gradient(135deg, #F59E0B, #FBBF24)"
              : "linear-gradient(135deg, #334155, #1E293B)",
            boxShadow: changed
              ? "0 0 16px rgba(251,191,36,0.7)"
              : "0 2px 8px rgba(0,0,0,0.45)",
          }}
          transition={{ duration: 0.45 }}
          style={{
            padding: "14px 18px",
            borderRadius: 14,
            minWidth: 110,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#F8FAFC",
            border: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow ring for changed scalar */}
          {changed && (
            <div
              style={{
                position: "absolute",
                inset: -2,
                borderRadius: 14,
                border: "2px solid rgba(251,191,36,0.3)",
                filter: "blur(8px)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Name */}
          <div
            style={{
              opacity: 0.95,
              fontWeight: 700,
              fontSize: 15,
              marginBottom: 6,
              letterSpacing: 0.5,
              color: changed ? "#FFF7ED" : "#E5E7EB",
              textTransform: "uppercase",
            }}
          >
            {name}
          </div>

          {/* Value */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: changed ? "#1E293B" : "#F9FAFB",
              background: changed
                ? "rgba(255,255,255,0.85)"
                : "rgba(255,255,255,0.05)",
              padding: "6px 12px",
              borderRadius: 8,
              minWidth: 60,
              textAlign: "center",
              boxShadow: changed
                ? "inset 0 0 6px rgba(0,0,0,0.25)"
                : "inset 0 1px 4px rgba(0,0,0,0.3)",
            }}
          >
            {JSON.stringify(val)}
          </div>
        </motion.div>
      );
    })}
  </div>
)}

    </div>
  );
}

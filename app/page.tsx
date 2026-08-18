const marketWeek = {
  week: "WEEK 34",
  dateRange: "August 17–21, 2026",

  pulse: [
    {
      label: "RISK REGIME",
      value: "Risk-On",
      note: "Equities remain supported by liquidity expectations.",
    },
    {
      label: "FED EXPECTATIONS",
      value: "Data Dependent",
      note: "Incoming inflation and labour data remain key.",
    },
    {
      label: "USD",
      value: "Neutral",
      note: "Direction depends heavily on rate expectations.",
    },
    {
      label: "GOLD",
      value: "Constructive",
      note: "Sensitive to real yields, USD and risk sentiment.",
    },
  ],

  framework: [
    {
      number: "01",
      title: "US Data",
      description:
        "Track inflation, labour markets, growth and activity data.",
    },
    {
      number: "02",
      title: "Fed Expectations",
      description:
        "Translate economic data into changing rate expectations.",
    },
    {
      number: "03",
      title: "Positioning",
      description:
        "Identify how positioning and flows can amplify market moves.",
    },
    {
      number: "04",
      title: "Market Reaction",
      description:
        "Build scenarios instead of relying on a single directional prediction.",
    },
  ],

  scenarios: [
    {
      label: "BASE CASE",
      title: "Soft Landing",
      description:
        "Growth slows without a major deterioration in employment. Policy expectations remain supportive.",
    },
    {
      label: "BULL CASE",
      title: "Disinflation + Growth",
      description:
        "Inflation continues to cool while economic activity remains resilient.",
    },
    {
      label: "BEAR CASE",
      title: "Growth Shock",
      description:
        "Labour-market weakness and deteriorating activity increase recession concerns.",
    },
  ],

  catalysts: [
    {
      name: "US Inflation Data",
      tag: "HIGH IMPACT",
    },
    {
      name: "US Labour Market",
      tag: "HIGH IMPACT",
    },
    {
      name: "Federal Reserve Communication",
      tag: "HIGH IMPACT",
    },
    {
      name: "Geopolitical Risk",
      tag: "WATCH",
    },
  ],
};

export default function Home() {
  return (
    <main style={pageStyle}>
      <div style={containerStyle}>

        {/* =====================================================
            HEADER
            ===================================================== */}

        <header style={headerStyle}>
          <div style={headerLeftStyle}>
            <div style={eyebrowStyle}>
              FA MARKET LAB
            </div>

            <h1 style={titleStyle}>
              Market Intelligence
            </h1>

            <p style={subtitleStyle}>
              Macro analysis, market structure and scenario-based research.
            </p>
          </div>

          <div style={weekBadgeStyle}>
            <div style={weekBadgeLabelStyle}>
              {marketWeek.week}
            </div>

            <div style={weekBadgeDateStyle}>
              {marketWeek.dateRange}
            </div>
          </div>
        </header>


        {/* =====================================================
            MARKET PULSE
            ===================================================== */}

        <section style={sectionStyle}>
          <SectionTitle title="Market Pulse" />

          <div style={pulseGridStyle}>
            {marketWeek.pulse.map((item) => (
              <div
                key={item.label}
                style={cardStyle}
              >
                <div style={labelStyle}>
                  {item.label}
                </div>

                <div style={valueStyle}>
                  {item.value}
                </div>

                <p style={mutedStyle}>
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* =====================================================
            MACRO FRAMEWORK
            ===================================================== */}

        <section style={sectionStyle}>
          <SectionTitle title="Macro Framework" />

          <div style={frameworkGridStyle}>
            {marketWeek.framework.map((item) => (
              <div
                key={item.number}
                style={cardStyle}
              >
                <div style={numberStyle}>
                  {item.number}
                </div>

                <h3 style={headingStyle}>
                  {item.title}
                </h3>

                <p style={mutedStyle}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* =====================================================
            SCENARIO ENGINE
            ===================================================== */}

        <section style={sectionStyle}>
          <SectionTitle title="Scenario Engine" />

          <div style={scenarioGridStyle}>
            {marketWeek.scenarios.map((scenario) => (
              <div
                key={scenario.label}
                style={scenarioStyle}
              >
                <div style={labelStyle}>
                  {scenario.label}
                </div>

                <h3 style={scenarioHeadingStyle}>
                  {scenario.title}
                </h3>

                <p style={mutedStyle}>
                  {scenario.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* =====================================================
            KEY CATALYSTS
            ===================================================== */}

        <section style={sectionStyle}>
          <SectionTitle title="Key Catalysts" />

          <div style={catalystCardStyle}>
            {marketWeek.catalysts.map((catalyst, index) => (
              <div
                key={catalyst.name}
                style={{
                  ...catalystStyle,
                  borderBottom:
                    index === marketWeek.catalysts.length - 1
                      ? "none"
                      : "1px solid #252b33",
                }}
              >
                <span style={catalystNameStyle}>
                  {catalyst.name}
                </span>

                <span style={tagStyle}>
                  {catalyst.tag}
                </span>
              </div>
            ))}
          </div>
        </section>


        {/* =====================================================
            FOOTER
            ===================================================== */}

        <footer style={footerStyle}>
          FA Market Lab · Market intelligence and scenario-based research
        </footer>

      </div>
    </main>
  );
}


/* =========================================================
   COMPONENTS
   ========================================================= */

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 style={sectionTitleStyle}>
      {title}
    </h2>
  );
}


/* =========================================================
   GLOBAL PAGE
   ========================================================= */

const pageStyle = {
  minHeight: "100vh",
  width: "100%",
  background: "#0b0f14",
  color: "#f5f7fa",
  fontFamily:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  padding: "40px 24px",
  boxSizing: "border-box" as const,
};

const containerStyle = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
};


/* =========================================================
   HEADER
   ========================================================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "24px",
  borderBottom: "1px solid #252b33",
  paddingBottom: "28px",
  marginBottom: "36px",
  flexWrap: "wrap" as const,
};

const headerLeftStyle = {
  minWidth: 0,
};

const eyebrowStyle = {
  fontSize: "12px",
  color: "#8b949e",
  letterSpacing: "2.5px",
  fontWeight: 600,
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "38px",
  lineHeight: 1.1,
  margin: 0,
  fontWeight: 700,
  letterSpacing: "-0.8px",
};

const subtitleStyle = {
  color: "#8b949e",
  marginTop: "12px",
  marginBottom: 0,
  fontSize: "15px",
  lineHeight: 1.6,
};

const weekBadgeStyle = {
  border: "1px solid #303740",
  borderRadius: "10px",
  padding: "12px 16px",
  minWidth: "150px",
  background: "#0f141b",
  boxSizing: "border-box" as const,
};

const weekBadgeLabelStyle = {
  fontSize: "11px",
  color: "#8b949e",
  letterSpacing: "1.5px",
  marginBottom: "5px",
};

const weekBadgeDateStyle = {
  fontSize: "13px",
  color: "#d7dce2",
};


/* =========================================================
   SECTIONS
   ========================================================= */

const sectionStyle = {
  marginBottom: "36px",
};

const sectionTitleStyle = {
  fontSize: "20px",
  margin: "0 0 16px",
  fontWeight: 650,
  letterSpacing: "-0.2px",
};


/* =========================================================
   SHARED CARDS
   ========================================================= */

const cardStyle = {
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "20px",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  fontSize: "10px",
  letterSpacing: "1.6px",
  color: "#7f8994",
  fontWeight: 600,
  marginBottom: "10px",
};

const valueStyle = {
  fontSize: "22px",
  fontWeight: 700,
  marginBottom: "10px",
  letterSpacing: "-0.3px",
};

const mutedStyle = {
  color: "#8b949e",
  fontSize: "14px",
  lineHeight: 1.65,
  margin: 0,
};


/* =========================================================
   MARKET PULSE
   ========================================================= */

const pulseGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};


/* =========================================================
   MACRO FRAMEWORK
   ========================================================= */

const frameworkGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px",
};

const numberStyle = {
  fontSize: "11px",
  color: "#69737e",
  letterSpacing: "1.5px",
  fontWeight: 600,
};

const headingStyle = {
  fontSize: "18px",
  margin: "7px 0 10px",
  fontWeight: 650,
};


/* =========================================================
   SCENARIO ENGINE
   ========================================================= */

const scenarioGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
};

const scenarioStyle = {
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "22px",
  minHeight: "155px",
  boxSizing: "border-box" as const,
};

const scenarioHeadingStyle = {
  fontSize: "19px",
  margin: "6px 0 11px",
  fontWeight: 650,
};


/* =========================================================
   KEY CATALYSTS
   ========================================================= */

const catalystCardStyle = {
  width: "100%",
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "4px 20px",
  boxSizing: "border-box" as const,
};

const catalystStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "16px 0",
  minHeight: "52px",
  boxSizing: "border-box" as const,
};

const catalystNameStyle = {
  fontSize: "14px",
  color: "#d7dce2",
  lineHeight: 1.5,
};

const tagStyle = {
  flexShrink: 0,
  fontSize: "9px",
  fontWeight: 600,
  letterSpacing: "1px",
  color: "#8b949e",
  border: "1px solid #303740",
  borderRadius: "5px",
  padding: "5px 8px",
};


/* =========================================================
   FOOTER
   ========================================================= */

const footerStyle = {
  borderTop: "1px solid #252b33",
  paddingTop: "20px",
  marginTop: "10px",
  color: "#68727d",
  fontSize: "12px",
  lineHeight: 1.5,
};

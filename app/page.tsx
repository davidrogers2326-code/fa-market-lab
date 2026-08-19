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
          <div style={headerContentStyle}>
            <div style={eyebrowStyle}>FA MARKET LAB</div>

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
                style={pulseCardStyle}
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
                style={frameworkCardStyle}
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
                <div style={scenarioLabelStyle}>
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

          <div style={catalystListStyle}>
            {marketWeek.catalysts.map((catalyst, index) => (
              <div
                key={catalyst.name}
                style={{
                  ...catalystRowStyle,
                  borderBottom:
                    index === marketWeek.catalysts.length - 1
                      ? "none"
                      : "1px solid #252b33",
                }}
              >
                <div style={catalystNameStyle}>
                  {catalyst.name}
                </div>

                <div style={tagStyle}>
                  {catalyst.tag}
                </div>
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
  padding: "48px 24px 56px",
  boxSizing: "border-box" as const,
};


/* =========================================================
   MAIN CONTAINER
   ========================================================= */

const containerStyle = {
  width: "100%",
  maxWidth: "1180px",
  margin: "0 auto",
};


/* =========================================================
   HEADER
   ========================================================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "32px",
  borderBottom: "1px solid #252b33",
  paddingBottom: "30px",
  marginBottom: "38px",
  flexWrap: "wrap" as const,
};

const headerContentStyle = {
  flex: "1 1 500px",
};

const eyebrowStyle = {
  fontSize: "11px",
  color: "#8b949e",
  letterSpacing: "2.8px",
  fontWeight: 700,
  marginBottom: "11px",
};

const titleStyle = {
  fontSize: "40px",
  lineHeight: 1.08,
  margin: 0,
  fontWeight: 700,
  letterSpacing: "-1px",
};

const subtitleStyle = {
  color: "#8b949e",
  marginTop: "12px",
  marginBottom: 0,
  fontSize: "15px",
  lineHeight: 1.6,
  maxWidth: "650px",
};

const weekBadgeStyle = {
  border: "1px solid #303740",
  borderRadius: "10px",
  padding: "14px 17px",
  minWidth: "155px",
  background: "#0f141b",
  boxSizing: "border-box" as const,
};

const weekBadgeLabelStyle = {
  fontSize: "10px",
  color: "#8b949e",
  letterSpacing: "1.7px",
  fontWeight: 700,
  marginBottom: "6px",
};

const weekBadgeDateStyle = {
  fontSize: "13px",
  color: "#d7dce2",
};


/* =========================================================
   SECTIONS
   ========================================================= */

const sectionStyle = {
  marginBottom: "38px",
};

const sectionTitleStyle = {
  fontSize: "20px",
  margin: "0 0 16px",
  fontWeight: 650,
  letterSpacing: "-0.25px",
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

const pulseCardStyle = {
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "20px",
  minHeight: "150px",
  boxSizing: "border-box" as const,
};

const labelStyle = {
  fontSize: "10px",
  letterSpacing: "1.6px",
  color: "#7f8994",
  fontWeight: 650,
  marginBottom: "10px",
};

const valueStyle = {
  fontSize: "22px",
  fontWeight: 700,
  marginBottom: "10px",
  letterSpacing: "-0.35px",
};


/* =========================================================
   GENERAL TEXT
   ========================================================= */

const mutedStyle = {
  color: "#8b949e",
  fontSize: "14px",
  lineHeight: 1.65,
  margin: 0,
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

const frameworkCardStyle = {
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "20px",
  minHeight: "170px",
  boxSizing: "border-box" as const,
};

const numberStyle = {
  fontSize: "10px",
  color: "#69737e",
  letterSpacing: "1.7px",
  fontWeight: 700,
};

const headingStyle = {
  fontSize: "18px",
  margin: "8px 0 10px",
  fontWeight: 650,
  letterSpacing: "-0.2px",
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
  minHeight: "165px",
  boxSizing: "border-box" as const,
};

const scenarioLabelStyle = {
  fontSize: "10px",
  color: "#7f8994",
  letterSpacing: "1.6px",
  fontWeight: 700,
};

const scenarioHeadingStyle = {
  fontSize: "19px",
  margin: "8px 0 11px",
  fontWeight: 650,
  letterSpacing: "-0.25px",
};


/* =========================================================
   KEY CATALYSTS
   ========================================================= */

const catalystListStyle = {
  width: "100%",
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "4px 20px",
  boxSizing: "border-box" as const,
};

const catalystRowStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "17px 0",
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
  fontWeight: 700,
  letterSpacing: "1px",
  color: "#8b949e",
  border: "1px solid #303740",
  borderRadius: "5px",
  padding: "5px 8px",
  whiteSpace: "nowrap" as const,
};


/* =========================================================
   FOOTER
   ========================================================= */

const footerStyle = {
  borderTop: "1px solid #252b33",
  paddingTop: "20px",
  marginTop: "8px",
  color: "#68727d",
  fontSize: "12px",
  lineHeight: 1.5,
};

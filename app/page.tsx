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
      description: "Track inflation, labour markets, growth and activity data.",
    },
    {
      number: "02",
      title: "Fed Expectations",
      description: "Translate economic data into changing rate expectations.",
    },
    {
      number: "03",
      title: "Positioning",
      description: "Identify how positioning and flows can amplify market moves.",
    },
    {
      number: "04",
      title: "Market Reaction",
      description: "Build scenarios instead of relying on a single directional prediction.",
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
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0f14",
        color: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #252b33",
            paddingBottom: "24px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#8b949e",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              FA MARKET LAB
            </div>

            <h1
              style={{
                fontSize: "34px",
                margin: 0,
                fontWeight: 700,
              }}
            >
              Market Intelligence
            </h1>

            <p
              style={{
                color: "#8b949e",
                marginTop: "10px",
                fontSize: "15px",
              }}
            >
              Macro analysis, market structure and scenario-based research.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #303740",
              borderRadius: "8px",
              padding: "10px 14px",
              color: "#9aa4af",
              fontSize: "13px",
            }}
          >
            MARKET LAB
          </div>
        </header>

        {/* MARKET PULSE */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
            Market Pulse
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            <div style={cardStyle}>
              <div style={labelStyle}>RISK REGIME</div>
              <div style={valueStyle}>Risk-On</div>
              <div style={mutedStyle}>
                Equities remain supported by liquidity expectations.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={labelStyle}>FED EXPECTATIONS</div>
              <div style={valueStyle}>Data Dependent</div>
              <div style={mutedStyle}>
                Incoming inflation and labour data remain key.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={labelStyle}>USD</div>
              <div style={valueStyle}>Neutral</div>
              <div style={mutedStyle}>
                Direction depends heavily on rate expectations.
              </div>
            </div>

            <div style={cardStyle}>
              <div style={labelStyle}>GOLD</div>
              <div style={valueStyle}>Constructive</div>
              <div style={mutedStyle}>
                Sensitive to real yields, USD and risk sentiment.
              </div>
            </div>
          </div>
        </section>

        {/* CORE FRAMEWORK */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
            Macro Framework
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            <div style={cardStyle}>
              <div style={numberStyle}>01</div>
              <h3 style={headingStyle}>US Data</h3>
              <p style={mutedStyle}>
                Track inflation, labour markets, growth and activity data.
              </p>
            </div>

            <div style={cardStyle}>
              <div style={numberStyle}>02</div>
              <h3 style={headingStyle}>Fed Expectations</h3>
              <p style={mutedStyle}>
                Translate economic data into changing rate expectations.
              </p>
            </div>

            <div style={cardStyle}>
              <div style={numberStyle}>03</div>
              <h3 style={headingStyle}>Positioning</h3>
              <p style={mutedStyle}>
                Identify how positioning and flows can amplify market moves.
              </p>
            </div>

            <div style={cardStyle}>
              <div style={numberStyle}>04</div>
              <h3 style={headingStyle}>Market Reaction</h3>
              <p style={mutedStyle}>
                Build scenarios instead of relying on a single directional
                prediction.
              </p>
            </div>
          </div>
        </section>

        {/* SCENARIOS */}
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
            Scenario Engine
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            <div style={scenarioStyle}>
              <div style={labelStyle}>BASE CASE</div>
              <h3 style={headingStyle}>Soft Landing</h3>
              <p style={mutedStyle}>
                Growth slows without a major deterioration in employment.
                Policy expectations remain supportive.
              </p>
            </div>

            <div style={scenarioStyle}>
              <div style={labelStyle}>BULL CASE</div>
              <h3 style={headingStyle}>Disinflation + Growth</h3>
              <p style={mutedStyle}>
                Inflation continues to cool while economic activity remains
                resilient.
              </p>
            </div>

            <div style={scenarioStyle}>
              <div style={labelStyle}>BEAR CASE</div>
              <h3 style={headingStyle}>Growth Shock</h3>
              <p style={mutedStyle}>
                Labour-market weakness and deteriorating activity increase
                recession concerns.
              </p>
            </div>
          </div>
        </section>

        {/* CATALYSTS */}
<section style={{ marginBottom: "32px" }}>
  <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>
    Key Catalysts
  </h2>

  <div
  style={{
    ...cardStyle,
    alignSelf: "flex-start",
    height: "fit-content",
    padding: "8px 20px",
  }}
>
  {marketWeek.catalysts.map((catalyst) => (
    <div
      key={catalyst.name}
      style={{
        ...catalystStyle,
        padding: "12px 0",
      }}
    >
      <span>{catalyst.name}</span>
      <span style={tagStyle}>{catalyst.tag}</span>
    </div>
  ))}
</div>
</section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid #252b33",
            paddingTop: "20px",
            color: "#68727d",
            fontSize: "13px",
          }}
        >
          FA Market Lab · Market intelligence and scenario-based research
        </footer>
      </div>
    </main>
  );
}

const cardStyle = {
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "20px",
};

const scenarioStyle = {
  background: "#11161d",
  border: "1px solid #252b33",
  borderRadius: "10px",
  padding: "22px",
  minHeight: "160px",
};

const labelStyle = {
  fontSize: "11px",
  letterSpacing: "1.5px",
  color: "#7f8994",
  marginBottom: "10px",
};

const valueStyle = {
  fontSize: "22px",
  fontWeight: 700,
  marginBottom: "10px",
};

const mutedStyle = {
  color: "#8b949e",
  fontSize: "14px",
  lineHeight: "1.6",
};

const headingStyle = {
  fontSize: "18px",
  margin: "6px 0 10px",
};

const numberStyle = {
  fontSize: "12px",
  color: "#69737e",
  letterSpacing: "1px",
};

const catalystStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 0",
  borderBottom: "1px solid #252b33",
  fontSize: "14px",
};

const tagStyle = {
  fontSize: "10px",
  letterSpacing: "1px",
  color: "#8b949e",
  border: "1px solid #303740",
  borderRadius: "5px",
  padding: "5px 8px",
};

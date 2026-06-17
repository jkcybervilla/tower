import DetailSection, {
  BodyText,
  SubHeading,
  BulletList,
  HighlightBox,
  StatGrid,
  ServiceCategories,
} from "./DetailSection";

export default function ContentSections() {
  return (
    <>
      {/* ── Foundation Work ── */}
      <DetailSection id="foundation" headline="Foundation Work">
        <BodyText>
          <p>
            Every transmission tower relies on a robust foundation. We execute precise
            foundation engineering tailored to soil conditions, load requirements, and
            environmental factors across diverse Indian terrains.
          </p>
        </BodyText>
        <SubHeading>Our Foundation Capabilities</SubHeading>
        <BulletList
          items={[
            "Soil investigation & geotechnical analysis",
            "Pile & pad foundation design and execution",
            "Reinforced cement concrete (RCC) works",
            "Rock anchor & grillage foundations",
            "Dewatering & shoring for deep excavations",
            "Quality control with compressive strength testing",
          ]}
        />
        <StatGrid
          stats={[
            { value: "500+", label: "Foundation Completed" },
            { value: "25+", label: "Years Experience" },
            { value: "15", label: "States Covered" },
            { value: "98%", label: "On-Time Delivery" },
          ]}
        />
        <HighlightBox>
          <strong>Quality Assurance:</strong> All foundations comply with IS:456 and
          relevant BIS standards. We maintain detailed records of mix designs, curing
          periods, and load test results for every project.
        </HighlightBox>
      </DetailSection>

      {/* ── Tower Erection ── */}
      <DetailSection id="tower-erection" headline="Tower Erection">
        <BodyText>
          <p>
            From lattice steel towers to tubular poles, our erection teams bring decades
            of field experience. We follow stringent safety protocols and precision
            alignment procedures to ensure every structure meets design specifications.
          </p>
        </BodyText>
        <SubHeading>Erection Services</SubHeading>
        <BulletList
          items={[
            "Lattice tower assembly & erection (up to 132 kV & above)",
            "Tubular & monopole installation",
            "Guyed tower erection for river crossings",
            "Bolt torque verification & member alignment",
            "Anti-climbing device installation",
            "Hot-dip galvanized corrosion protection checks",
          ]}
        />
        <HighlightBox>
          <strong>Safety First:</strong> All erection work follows IS:875 (wind loads) and
          OHSAS 18001 guidelines. Our teams are trained in fall protection, rigging, and
          emergency response.
        </HighlightBox>
      </DetailSection>

      {/* ── Stringing & OPGW ── */}
      <DetailSection id="stringing" headline="Stringing & OPGW">
        <BodyText>
          <p>
            Conductor stringing is a high-precision operation requiring careful tension
            control and sag calculation. We handle both conventional ACSR/AAAC conductors
            and modern OPGW (Optical Power Ground Wire) installations.
          </p>
        </BodyText>
        <SubHeading>Stringing Capabilities</SubHeading>
        <BulletList
          items={[
            "ACSR, AAAC & bundled conductor stringing",
            "OPGW installation with fiber splicing & testing",
            "Pilot wire & earth wire stringing",
            "Tension stringing with dynamometer control",
            "Sag calculation using catenary & parabolic methods",
            "Vibration damper & spacer installation",
          ]}
        />
        <StatGrid
          stats={[
            { value: "2,500+", label: "KM Conductor Strung" },
            { value: "800+", label: "KM OPGW Installed" },
            { value: "50+", label: "River Crossings" },
            { value: "0.01%", label: "Defect Rate" },
          ]}
        />
      </DetailSection>

      {/* ── Manpower Supply ── */}
      <DetailSection id="manpower" headline="Manpower & Engineering">
        <BodyText>
          <p>
            Beyond construction, we provide skilled technical manpower and engineering
            support for transmission projects across India. Our personnel are certified,
            experienced, and ready to deploy.
          </p>
        </BodyText>
        <SubHeading>Manpower Services</SubHeading>
        <BulletList
          items={[
            "Site engineers & project managers",
            "Supervisors for foundation, erection & stringing",
            "Safety officers with NEBOSH / OSHA certifications",
            "QA/QC inspectors for civil & electrical works",
            "Survey & tower spotting teams",
            "Documentation & billing support staff",
          ]}
        />
        <HighlightBox>
          <strong>Rapid Deployment:</strong> We maintain a database of 500+ screened
          professionals and can deploy teams to any project site within 72 hours.
        </HighlightBox>
      </DetailSection>

      {/* ── Our Expertise ── */}
      <DetailSection id="expertise" headline="Our Expertise" dark={false}>
        <BodyText>
          <p>
            With over two decades in the power transmission sector, Tower Line
            Infrastructure Pvt. Ltd. has delivered projects ranging from rural
            electrification to high-capacity interstate transmission corridors.
          </p>
        </BodyText>
        <SubHeading>Core Competencies</SubHeading>
        <BulletList
          items={[
            "End-to-end project execution — foundation to commissioning",
            "Multi-voltage capability: 33 kV to 765 kV",
            "Specialized river crossing & difficult terrain construction",
            "OPGW & communication line integration",
            "Substation earthing & civil works",
            "Electromechanical maintenance & retrofitting",
          ]}
        />
        <ServiceCategories
          categories={[
            {
              title: "Transmission Lines",
              items: [
                "132 kV & 220 kV Double Circuit",
                "400 kV Quad Bundle",
                "765 kV Six Bundle",
                "Distribution lines (11 kV – 33 kV)",
              ],
            },
            {
              title: "Substations",
              items: [
                "GIS & AIS substation civil works",
                "Equipment foundation & gantry erection",
                "Cable trench & earthing grid",
                "Control room buildings",
              ],
            },
            {
              title: "Special Projects",
              items: [
                "Railway traction OHE works",
                "Solar park evacuation lines",
                "Offshore wind farm cable laying",
                "Telecom tower installation",
              ],
            },
          ]}
        />
      </DetailSection>

      {/* ── Contact ── */}
      <DetailSection id="contact" headline="Contact Us">
        <BodyText>
          <p>
            Ready to discuss your next transmission project? Reach out to our team for
            a consultation, site visit, or project quotation.
          </p>
        </BodyText>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Address</span>
            <span className="contact-value">
              Tower Line Infrastructure Pvt. Ltd.<br />
              Plot No. 45, Sector 12<br />
              New Delhi – 110078, India
            </span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone</span>
            <a href="tel:+911123456789" className="contact-value">
              +91 11 2345 6789
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a href="mailto:info@towerline.in" className="contact-value">
              info@towerline.in
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Office Hours</span>
            <span className="contact-value">
              Mon – Sat: 9:00 AM – 6:00 PM
            </span>
          </div>
        </div>
        <div className="cta-buttons">
          <a href="tel:+911123456789" className="btn-primary">
            Call Now
          </a>
          <a href="mailto:info@towerline.in" className="btn-secondary">
            Send Enquiry
          </a>
        </div>
      </DetailSection>
    </>
  );
}
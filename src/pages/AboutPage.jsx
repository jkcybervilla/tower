import DetailSection, {
  BodyText,
  SubHeading,
  BulletList,
  ServiceCategories,
} from "../components/DetailSection";
import DetailPageLayout from "../components/DetailPageLayout";
import DiagonalStreakTransition from "../components/DiagonalStreakTransition";

export default function AboutPage() {
  return (
    <DetailPageLayout sectionId="expertise">
      <DiagonalStreakTransition
        outgoing={
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
        }
        incoming={
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
        }
      />
    </DetailPageLayout>
  );
}
import DetailSection, { BodyText, SubHeading, BulletList, StatGrid } from "../components/DetailSection";
import DetailPageLayout from "../components/DetailPageLayout";

export default function StringingPage() {
  return (
    <DetailPageLayout sectionId="stringing">
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
    </DetailPageLayout>
  );
}
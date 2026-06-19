import DetailSection, { BodyText, SubHeading, BulletList, HighlightBox } from "../components/DetailSection";
import DetailPageLayout from "../components/DetailPageLayout";

export default function TowerErectionPage() {
  return (
    <DetailPageLayout sectionId="tower-erection">
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
    </DetailPageLayout>
  );
}
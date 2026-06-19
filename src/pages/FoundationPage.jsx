import DetailSection, { BodyText, SubHeading, BulletList, HighlightBox } from "../components/DetailSection";
import DetailPageLayout from "../components/DetailPageLayout";

export default function FoundationPage() {
  return (
    <DetailPageLayout sectionId="foundation">
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
            "Pile foundation design & execution",
            "Spread / raft footing for normal soil conditions",
            "Rock anchor foundations for hilly terrain",
            "Soil testing & geotechnical investigation",
            "Reinforcement detailing as per IS:456",
            "Quality control & curing supervision",
          ]}
        />
        <HighlightBox>
          <strong>Engineering Precision:</strong> Every foundation is designed against
          site-specific soil reports, ensuring structural integrity for the tower's
          full design life.
        </HighlightBox>
      </DetailSection>
    </DetailPageLayout>
  );
}
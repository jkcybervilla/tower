import DetailSection, { BodyText, SubHeading, BulletList, HighlightBox } from "../components/DetailSection";
import DetailPageLayout from "../components/DetailPageLayout";

export default function ManpowerPage() {
  return (
    <DetailPageLayout sectionId="manpower">
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
    </DetailPageLayout>
  );
}
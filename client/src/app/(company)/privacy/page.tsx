import LegalDocument from "@/modules/landing/components/legal-documents";

const sections = [
  {
    id: 'scope',
    title: '1. Scope and role',
    paragraphs: [
      'This Privacy Policy explains how Vibhava Estate Systems collects, uses, stores, and protects information when you use our platform, website, or client services. Vibhava acts as a service provider to property operators and their organizations.',
      'Information belonging to a property operator, tenant, owner, or vendor is processed only to provide the contracted services and according to the instructions of the relevant organization.',
    ],
    bullets: ['We collect only information needed to operate the platform.', 'We do not sell personal information or use tenant records for advertising.', 'Questions about organization-specific practices should be directed to that organization.'],
  },
  {
    id: 'collection',
    title: '2. Information we collect',
    paragraphs: [
      'Account administrators may provide names, work contact details, organization information, billing details, and authentication records. Platform activity may include property, unit, lease, maintenance, payment, and communication records entered by an authorized organization.',
      'We also receive limited technical information such as browser type, device identifiers, access timestamps, and security events so we can maintain reliable and protected service operations.',
    ],
  },
  {
    id: 'isolation',
    title: '3. Multi-tenant isolation',
    paragraphs: [
      'Vibhava is structured around organization_id boundaries. Records are associated with the organization that owns or controls them, and access decisions are enforced at the data layer rather than relying only on the interface.',
      'Row-level security policies restrict reads and writes to authorized organization members. A user belonging to one organization cannot query or modify another organization’s tenant, property, financial, or maintenance records through the platform.',
    ],
    bullets: ['Organization membership is checked before protected data is returned.', 'Administrative and audit fields are not user-controlled through ordinary platform actions.', 'Access events and policy decisions are recorded for review.'],
  },
  {
    id: 'security',
    title: '4. Security and retention',
    paragraphs: [
      'We use access controls, encryption in transit, restricted service credentials, and layered monitoring to protect information. Our security program is designed around least privilege and clear accountability.',
      'Audit logs are retained for a minimum of twelve months, or longer where required by contract, law, or an active security investigation. Operational records are retained for the duration of the customer relationship and deleted or returned according to the applicable agreement.',
    ],
  },
  {
    id: 'rights',
    title: '5. Choices and requests',
    paragraphs: [
      'Depending on your role and location, you may have rights to access, correct, export, or delete personal information. Requests should first be directed to the property operator or organization that controls the relevant record.',
      'You may contact Vibhava at privacy@vibhava.estate for questions about our processing, security practices, or a request that cannot be resolved by the organization administrator.',
    ],
  },
  {
    id: 'changes',
    title: '6. Policy updates',
    paragraphs: [
      'We may update this policy when our services, legal obligations, or security practices change. Material changes will be communicated through the platform or by email where appropriate. The date at the top of this page identifies the current version.',
    ],
  },
];

export default function PrivacyPage() {
  return <LegalDocument title="Privacy Policy" eyebrow="Trust & privacy" updated="September 9, 2026" intro="Privacy is not an add-on to property operations. It is the boundary that makes responsible stewardship possible. Vibhava protects information through organization-aware controls, strict data minimization, and durable auditability." sections={sections} />;
}

import LegalDocument from "@/modules/landing/components/legal-documents";

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement and eligibility',
    paragraphs: [
      'These Terms of Service govern access to Vibhava Estate Systems and the services made available through the platform. By accepting an order form, creating an account, or using the service, you agree to these terms on behalf of your organization.',
      'You must have authority to bind the organization you represent. Individual users are responsible for keeping credentials private and using the platform only for legitimate property operations.',
    ],
  },
  {
    id: 'subscription',
    title: '2. Subscription tiers and unit limits',
    paragraphs: [
      'Access is provided through the subscription tier and unit allowance shown in your order form or account workspace. A unit means a residential, commercial, or other managed space represented in the platform.',
      'Your organization may not exceed its purchased allowance without first upgrading or receiving written approval. Vibhava may contact an administrator when usage approaches a tier limit so service continuity is not interrupted.',
    ],
    bullets: ['Foundation: up to 50 managed units with core property and maintenance workflows.', 'Portfolio: up to 500 managed units with financial automation and expanded reporting.', 'Institutional: negotiated unit limits, controls, onboarding, and support commitments.'],
  },
  {
    id: 'access',
    title: '3. Platform access and acceptable use',
    paragraphs: [
      'Subject to these terms and timely payment, Vibhava grants your organization a limited, non-exclusive, non-transferable right to access the platform during the subscription period. You retain ownership of the records you submit.',
      'You may not reverse engineer the platform, interfere with its security, use it to violate law or another person’s rights, resell access without authorization, or attempt to access another organization’s records.',
    ],
  },
  {
    id: 'responsibilities',
    title: '4. Organization responsibilities',
    paragraphs: [
      'Your organization is responsible for the accuracy and lawfulness of its records, permissions assigned to team members, and notices or consents required from tenants, owners, and vendors. You are also responsible for reviewing platform outputs before taking material legal, financial, or safety action.',
      'Vibhava provides operational tooling and does not act as a property manager, legal adviser, accountant, rent collector, or emergency response provider unless expressly agreed in writing.',
    ],
  },
  {
    id: 'sla',
    title: '5. Availability and SLA commitments',
    paragraphs: [
      'Vibhava targets 99.9% monthly availability for the production platform, excluding scheduled maintenance, emergency maintenance, force majeure events, and outages caused by customer systems or third-party services.',
      'Institutional customers may receive service credits, response targets, recovery objectives, and maintenance notice periods under a separate service level agreement. If an SLA conflicts with these terms, the SLA controls for that subject.',
    ],
  },
  {
    id: 'billing',
    title: '6. Billing, renewal, and termination',
    paragraphs: [
      'Subscription fees, billing interval, renewal terms, and taxes are stated in the applicable order form. Unless otherwise agreed, subscriptions renew for the same period and may be cancelled before the renewal date through the account administrator or written notice.',
      'On termination, access ends at the close of the paid period unless the agreement states otherwise. We will make customer records available for export for a reasonable period and then handle them according to our Privacy Policy and agreement.',
    ],
  },
  {
    id: 'general',
    title: '7. General terms',
    paragraphs: [
      'The platform is provided with commercially reasonable care, but no service can guarantee uninterrupted or error-free operation. To the extent permitted by law, each party’s liability is limited to the fees paid or payable for the twelve months preceding the event giving rise to the claim.',
      'These terms are governed by the law and venue stated in the applicable order form. If no order form states otherwise, the parties will first attempt to resolve disputes through good-faith executive discussion.',
    ],
  },
];

export default function TermsPage() {
  return <LegalDocument title="Terms of Service" eyebrow="Terms & access" updated="September 9, 2026" intro="Vibhava exists to make property operations calmer, clearer, and more accountable. These terms define the access, responsibilities, and service commitments that support that standard." sections={sections} />;
}

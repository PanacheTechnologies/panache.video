import { DocumentationLayout } from '~/components/documentation/documentation-layout'
import { NavLink } from '~/components/marketing-layout/header/nav-link'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '~/components/ui/breadcrumb'

export default function PrivacyPolicy() {
  return (
    <DocumentationLayout className="!space-y-0">
      <div className="grid sm:grid-cols-5 gap-5 sm:divide-x divide-y divide-neutral-200 border-t border-neutral-200">
        <div className="col-span-1 flex flex-col gap-2 pt-4 pr-4 w-full">
          <span className="font-medium text-sm text-neutral-900 px-2 pb-2">Legal</span>
          <NavLink href="/legal/privacy-policy">Privacy Policy</NavLink>
          <NavLink href="/legal/terms-of-service">Terms of Service</NavLink>
        </div>
        <div className="col-span-4 my-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>Legal</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <section className="prose prose-sm max-w-none overflow-x-hidden mt-4">
            <h1>Privacy Policy</h1>
            <p>
              At Panache Technologies, we respect your privacy and are committed to protecting your
              personal data in accordance with the General Data Protection Regulation (GDPR).
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect only the minimum necessary information to operate our platform:</p>
            <ul>
              <li>Your email address and name when you create an account</li>
              <li>Your newsletter content and subscription data</li>
              <li>Basic usage analytics (see below)</li>
            </ul>

            <h2>2. Cookies</h2>
            <p>We use a single, essential cookie for authentication purposes only. This cookie:</p>
            <ul>
              <li>Is required for you to stay logged in</li>
              <li>Does not track you across websites</li>
              <li>Is not shared with any third parties</li>
            </ul>
            <p>
              No other cookies are used. We do not use any third-party trackers or ad-related
              cookies.
            </p>

            <h2>3. Analytics</h2>
            <p>
              We use{' '}
              <a href="https://simpleanalytics.com" target="_blank" rel="noopener noreferrer">
                Simple Analytics
              </a>
              , a GDPR-compliant and privacy-first analytics provider. It does not use cookies or
              collect personally identifiable information. We use it solely to understand general
              trends in site usage.
            </p>

            <h2>4. Data Storage</h2>
            <p>
              Your data is stored securely on servers located in the European Union. We take all
              reasonable technical and organizational measures to protect your information.
            </p>

            <h2>5. Your Rights</h2>
            <p>Under the GDPR, you have the right to:</p>
            <ul>
              <li>Access the data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>6. Contact Us</h2>
            <p>
              For any questions about this policy or your data, please contact us at{' '}
              <a href="mailto:privacy@panache.tech">privacy@panache.tech</a>.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in our practices or legal
              obligations. You will be notified of significant changes through our platform.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              This Privacy Policy is governed by the laws of France and interpreted in accordance
              with GDPR and applicable French data protection laws.
            </p>
          </section>
        </div>
      </div>
    </DocumentationLayout>
  )
}

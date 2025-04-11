import { DocumentationLayout } from '~/components/documentation/documentation-layout'
import { NavLink } from '~/components/marketing-layout/header/nav-link'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '~/components/ui/breadcrumb'

export default function TermsOfService() {
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
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <section className="prose prose-sm max-w-none overflow-x-hidden mt-4">
            <h1>Terms of Service</h1>
            <p>
              Welcome to Panache — a newsletter platform designed for creators. By accessing or
              using Panache Technologies, you agree to be bound by these Terms of Service.
            </p>

            <h2>1. Use of the Platform</h2>
            <p>
              Panache provides tools for creators to build, manage, and distribute newsletters. You
              may only use the platform for lawful purposes and in accordance with these Terms.
            </p>

            <h2>2. User Accounts</h2>
            <p>
              You are responsible for safeguarding your account credentials. You agree not to share
              your login details and to notify us immediately of any unauthorized access.
            </p>

            <h2>3. Content Ownership</h2>
            <p>
              You retain all rights to the content you create and distribute through Panache. By
              using our platform, you grant us a limited license to host and display your content as
              necessary to operate the service.
            </p>

            <h2>4. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to Panache at our discretion,
              especially in cases of misuse or violation of these Terms.
            </p>

            <h2>5. Modifications</h2>
            <p>
              We may update these Terms from time to time. Continued use of Panache after changes
              constitutes acceptance of the new Terms.
            </p>

            <h2>6. Prohibited Uses</h2>
            <p>
              You agree not to use Panache Technologies for any unlawful, harmful, or abusive
              purpose. This includes, but is not limited to:
            </p>
            <ul>
              <li>Engaging in fraud, scams, or deceptive practices</li>
              <li>Distributing spam, malware, or harmful code</li>
              <li>Infringing on intellectual property rights of others</li>
              <li>Harassing, threatening, or defaming individuals or groups</li>
              <li>Attempting to gain unauthorized access to systems or data</li>
              <li>Using the platform for any purpose prohibited by applicable law or regulation</li>
            </ul>

            <h2>7. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of
              France, without regard to its conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </DocumentationLayout>
  )
}

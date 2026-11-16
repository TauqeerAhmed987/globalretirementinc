import Container from '../components/common/Container.jsx'
import PageBanner from '../components/common/PageBanner.jsx'
import Reveal from '../components/common/Reveal.jsx'
import bannerImage from '../assets/site-image/sect-fur-image.jpeg'

function PrivacyPolicy() {
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        image={bannerImage}
      />

      <section className="section">
        <Container>
          <Reveal className="legal-content">
            <p>
              Last updated: August 13, 2026
            </p>

            <p>
              Global Retirement Funds ("we", "us", or "our") respects your
              privacy and is committed to protecting the personal information
              you share with us. This Privacy Policy explains what
              information we collect, how we use it, and the choices you have
              regarding your information.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect personal information you provide directly to us,
              such as your name, email address, phone number, and any
              details you submit through our contact or inquiry forms. We
              may also collect certain technical information automatically,
              such as your IP address, browser type, and pages visited on
              our website.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide the services you request</li>
              <li>Communicate with you about our products and services</li>
              <li>Improve our website and the experience we provide to visitors</li>
              <li>Comply with applicable legal and regulatory obligations</li>
            </ul>

            <h2>Sharing Your Information</h2>
            <p>
              We do not sell your personal information. We may share your
              information with trusted service providers who assist us in
              operating our website and conducting our business, provided
              they agree to keep this information confidential.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable measures to protect your personal
              information from unauthorized access, alteration, disclosure,
              or destruction. However, no method of transmission over the
              internet is completely secure, and we cannot guarantee
              absolute security.
            </p>

            <h2>Your Choices</h2>
            <p>
              You may contact us at any time to ask about the information we
              hold about you, or to request that it be corrected or removed,
              subject to any legal requirements that may apply.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any
              changes will be posted on this page with an updated revision
              date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a href="mailto:michael@globalretirementfundsinc.com">michael@globalretirementfundsinc.com</a> or
              call +1 780 531 6230.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

export default PrivacyPolicy

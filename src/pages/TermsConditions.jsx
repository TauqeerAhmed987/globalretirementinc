import Container from '../components/common/Container.jsx'
import PageBanner from '../components/common/PageBanner.jsx'
import Reveal from '../components/common/Reveal.jsx'
import bannerImage from '../assets/site-image/sect-fur-image.jpeg'

function TermsConditions() {
  return (
    <>
      <PageBanner
        title="Terms & Conditions"
        subtitle="The terms that govern your use of our website and services."
        image={bannerImage}
      />

      <section className="section">
        <Container>
          <Reveal className="legal-content">
            <p>
              Last updated: August 13, 2026
            </p>

            <p>
              Please read these Terms &amp; Conditions carefully before using
              the Global Retirement Funds website. By accessing or using our
              website, you agree to be bound by these terms.
            </p>

            <h2>Use of Our Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in
              a way that does not infringe the rights of, or restrict or
              inhibit the use and enjoyment of, this site by any third
              party.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos,
              and images, is the property of Global Retirement Funds or its
              licensors and is protected by applicable intellectual property
              laws. You may not reproduce, distribute, or create derivative
              works from this content without our prior written consent.
            </p>

            <h2>No Financial Advice</h2>
            <p>
              The information provided on this website is for general
              informational purposes only and does not constitute financial,
              legal, or investment advice. You should consult a qualified
              professional before making any financial decisions.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Global Retirement Funds shall not be liable for any direct,
              indirect, incidental, or consequential damages arising from
              your use of this website or reliance on any information
              provided on it.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are
              not responsible for the content, accuracy, or practices of any
              linked websites.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms &amp;
              Conditions at any time. Continued use of the website after any
              changes constitutes acceptance of the updated terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms &amp; Conditions,
              please contact us at{' '}
              <a href="mailto:malagu4@yahoo.com">malagu4@yahoo.com</a> or
              call +1 780 531 6230.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

export default TermsConditions

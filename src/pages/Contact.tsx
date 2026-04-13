import PageLayout from '@/components/PageLayout';

const Contact = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-3xl mx-auto text-center">
      <div className="aurea-section-label">Get in Touch</div>
      <h1 className="aurea-section-title mb-10">Contact <em>Us</em></h1>
      <div className="text-[15px] leading-[1.85] font-light text-warm-black/80 space-y-6">
        <p>We'd love to hear from you. Whether you have a question about your order, need help choosing the perfect piece, or just want to say hello — we're here for you.</p>
        <div className="border border-gold/25 p-10 mt-10" style={{ background: '#FAF7F0' }}>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-1">Email</div>
              <a href="mailto:contact@aurea18k.com" className="text-dark-green hover:text-gold transition-colors font-medium">contact@aurea18k.com</a>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-1">Instagram</div>
              <a href="https://www.instagram.com/aureajewels.18k/" target="_blank" rel="noopener noreferrer" className="text-dark-green hover:text-gold transition-colors font-medium">@aureajewels.18k</a>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold font-medium mb-1">Facebook</div>
              <a href="https://www.facebook.com/aureajewels.18k/" target="_blank" rel="noopener noreferrer" className="text-dark-green hover:text-gold transition-colors font-medium">Aurea Jewels</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

export default Contact;

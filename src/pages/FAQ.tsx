import PageLayout from '@/components/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'What is 18K Gold Plated jewelry?', a: 'Our jewelry features a thick 18K gold plating over hypoallergenic stainless steel. This gives you the look and feel of solid gold at a fraction of the price, with exceptional durability.' },
  { q: 'Is your jewelry hypoallergenic?', a: 'Yes! All Aurea pieces are made with hypoallergenic stainless steel and are nickel-free, making them safe for sensitive skin.' },
  { q: 'How long does shipping take?', a: 'Orders ship within 3–5 business days. We offer free shipping on all orders over $120. We ship worldwide.' },
  { q: 'What is your return policy?', a: 'We offer a 7-day exchange policy on manufacturing defects. We stand behind every piece we sell.' },
  { q: 'Can I wear your jewelry in the shower?', a: 'Yes! Our 18K gold plated pieces are designed for everyday wear, including showers and gym sessions. However, we recommend avoiding prolonged exposure to saltwater and harsh chemicals.' },
  { q: 'Do you offer gift wrapping?', a: 'All orders come in our signature Aurea packaging, perfect for gifting. No additional gift wrap needed!' },
  { q: 'How do I track my order?', a: 'Once your order ships, you will receive a confirmation email with a tracking number. You can use this to track your package on our website.' },
];

const FAQ = () => (
  <PageLayout>
    <div className="aurea-section bg-cream-light max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <div className="aurea-section-label">Help</div>
        <h1 className="aurea-section-title">Frequently Asked <em>Questions</em></h1>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-gold/25 px-6" style={{ background: '#FAF7F0' }}>
            <AccordionTrigger className="font-serif text-[17px] font-normal text-dark-green hover:text-gold transition-colors py-5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-[14px] text-warm-black/70 font-light leading-[1.8] pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center mt-12">
        <p className="text-[14px] text-warm-gray font-light mb-4">Still have questions?</p>
        <a href="mailto:contact@aurea18k.com" className="btn-aurea-primary">Contact Us</a>
      </div>
    </div>
  </PageLayout>
);

export default FAQ;

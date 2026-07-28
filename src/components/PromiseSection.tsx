import { Gem, Lock, Gift, Globe, RefreshCcw, LucideIcon } from 'lucide-react';

const promises: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Gem, title: 'Premium Quality', text: 'Up to 10 microns of 18K gold over hypoallergenic stainless steel.' },
  { icon: Lock, title: 'Secure Checkout', text: 'Encrypted payments through trusted providers.' },
  { icon: Gift, title: 'Gift-Ready Packaging', text: 'Every order arrives in elegant Aurea packaging.' },
  { icon: Globe, title: 'Worldwide Shipping', text: '3–5 business days. Free on orders over $120.' },
  { icon: RefreshCcw, title: 'Exchange Guarantee', text: '7-day exchange on manufacturing defects.' },
];

const PromiseSection = () => (
  <section className="aurea-section bg-cream-light">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
      {promises.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="bg-cream border border-gold/15 transition-colors duration-300 hover:border-gold/50 flex items-start gap-4 p-5 md:block md:p-7 md:text-center"
        >
          <Icon size={22} strokeWidth={1.25} className="text-gold shrink-0 mt-1 md:w-[26px] md:h-[26px] md:mt-0 md:mx-auto" />
          <div>
            <div className="font-serif text-[17px] md:text-[19px] text-dark-green md:mt-4">{title}</div>
            <p className="font-sans text-[12.5px] text-warm-gray leading-[1.6] md:leading-[1.7] mt-1 md:mt-2">{text}</p>
          </div>
        </div>
      ))}
    </div>

  </section>
);

export default PromiseSection;

import { Gem, Lock, Gift, Globe, RefreshCcw } from 'lucide-react';
import { useT } from '@/i18n';

const promiseIcons = [Gem, Lock, Gift, Globe, RefreshCcw];

const PromiseSection = () => {
  const t = useT();
  return (
  <section className="aurea-section bg-cream-light">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
      {t.promise.items.map(({ title, text }, i) => {
        const Icon = promiseIcons[i];
        return (
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
        );
      })}
    </div>

  </section>
  );
};

export default PromiseSection;

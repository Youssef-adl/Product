import React from 'react';

export default function Stats() {
  const stats = [
    { label: 'Énergie Pure', value: '15W', detail: 'Solaire Flux' },
    { label: 'Délai de Lumière', value: '0.1s', detail: 'Réponse Vive' },
    { label: 'Or 24 Carats', value: '100%', detail: 'Placage Pur' },
    { label: 'Usinage Luxe', value: '2.5μ', detail: 'Précision' }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-solar-cream border-y border-sand/20">
      <div className="container-solar relative z-10">
        <div className="bento-solar">
          {stats.map((stat, i) => (
            <div key={i} className="bento-item-solar" data-size="standard">
              <div className="flex flex-col items-center text-center gap-6 group">
                <span className="subtitle-silk !before:hidden !after:hidden !text-[10px]">{stat.label}</span>
                <h3 className="text-gradient-sun font-serif text-5xl lg:text-7xl font-light leading-tight">
                   {stat.value}
                </h3>
                <div className="h-px w-8 bg-gold-sun/30 mx-auto" />
                <span className="font-sans text-[10px] tracking-[0.4em] text-navy-soft uppercase font-bold">{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

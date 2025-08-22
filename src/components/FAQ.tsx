import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qu'est-ce qui rend les suppléments Sobitas différents ?",
    answer: "Nos suppléments sont formulés avec des ingrédients de la plus haute qualité, subissent des tests rigoureux par des tiers, et sont conçus spécifiquement pour les athlètes sérieux et les passionnés de fitness. Nous utilisons uniquement des ingrédients premium et scientifiquement prouvés dans des dosages optimaux."
  },
  {
    question: "Combien de temps prend la livraison ?",
    answer: "Nous offrons une livraison rapide avec la plupart des commandes arrivant dans les 2-5 jours ouvrables. Nous proposons également des options de livraison express pour les commandes urgentes. Toutes les commandes de plus de 75€ bénéficient de la livraison gratuite."
  },
  {
    question: "Vos produits sont-ils sûrs et testés ?",
    answer: "Absolument. Tous nos produits subissent des tests complets par des tiers pour la pureté, la puissance et la sécurité. Nous nous engageons à la transparence et fournissons des listes d'ingrédients détaillées et des informations nutritionnelles pour tous les produits."
  },
  {
    question: "Offrez-vous une garantie de remboursement ?",
    answer: "Oui, nous soutenons nos produits avec une garantie de remboursement de 30 jours. Si vous n'êtes pas complètement satisfait de votre achat, nous vous fournirons un remboursement complet, sans questions."
  },
  {
    question: "Puis-je obtenir des conseils professionnels sur la sélection de produits ?",
    answer: "Notre équipe de nutritionnistes certifiés et d'experts fitness est disponible pour vous aider à choisir les bons produits pour vos objectifs. Vous pouvez nous contacter via notre support chat ou programmer un appel de consultation."
  },
  {
    question: "Avez-vous des prix en gros pour les salles de sport et les entraîneurs ?",
    answer: "Oui, nous offrons des prix de gros spéciaux pour les salles de sport, les entraîneurs personnels et les installations de fitness. Contactez notre équipe de développement commercial pour discuter des remises sur volume et des opportunités de partenariat."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-sobitas-charcoal to-sobitas-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Questions <span className="text-gradient">Fréquentes</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Vous avez des questions ? Nous avons les réponses pour vous aider à faire le meilleur choix pour votre parcours fitness.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4 animate-scale-in">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/50 backdrop-blur-sm border-sobitas-charcoal rounded-lg px-6 data-[state=open]:border-sobitas-red transition-smooth"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-sobitas-red font-semibold text-lg py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
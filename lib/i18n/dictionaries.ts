export type Lang = "fr" | "nl" | "en";
export const LANGS: Lang[] = ["fr", "nl", "en"];

export type ServiceCategory = "coiffure" | "nails" | "microshading";

export interface Dict {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string;
  };
  nav: { services: string; why: string; gallery: string; faq: string; contact: string; book: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    altBooking: string;
  };
  form: {
    title: string;
    stepLabel: string;
    categoryTitle: string;
    categories: Record<ServiceCategory, { label: string; desc: string }>;
    back: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    date: string;
    time: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: { name: string; desc: string; category: ServiceCategory }[];
  };
  why: {
    eyebrow: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  gallery: { eyebrow: string; title: string };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    ctaTitle: string;
    ctaText: string;
    cta: string;
    hours: string;
    hoursDetail: string[];
    address: string;
    rights: string;
  };
}

export const dictionaries: Record<Lang, Dict> = {
  fr: {
    meta: {
      title: "GiGi L Coiffure Tongres — Tresses africaines, Tissage & Microshading",
      description:
        "Salon de coiffure africaine et européenne à Tongres (Limbourg). Spécialiste tresses, tissage, rastas, coupes afro, microshading sourcils, prothèse ongulaire. Prenez rendez-vous en ligne.",
      ogTitle: "GiGi L Coiffure — Le salon afro de référence à Tongres",
      ogDescription:
        "Tresses africaines, tissage, microshading & ongles à Tongres. Le seul salon du Limbourg spécialisé cheveux crépus, bouclés et frisés. RDV en ligne.",
      keywords:
        "coiffure africaine Tongres, tresses africaines Belgique, salon cheveux crépus Limbourg, tissage Tongres, microshading Tongres, box braids Tongres, coiffure afro Tongres, kapper afro Tongeren, nagelstudio Tongeren",
    },
    nav: { services: "Services", why: "Pourquoi nous", gallery: "Galerie", faq: "FAQ", contact: "Contact", book: "Prendre RDV" },
    hero: {
      eyebrow: "Coiffure africaine · Microshading · Ongles — Tongres",
      title: "Des années de passion au service de votre beauté",
      subtitle:
        "Coiffure africaine et européenne, microshading et prothèse ongulaire — pour tous les types de cheveux. Le salon de référence pour les cheveux bouclés, frisés et crépus à Tongres.",
      cta: "Réserver maintenant",
      altBooking: "Ou réservez via notre agenda en ligne",
    },
    form: {
      title: "Demande de rendez-vous",
      stepLabel: "Étape",
      categoryTitle: "Que souhaitez-vous réserver ?",
      categories: {
        coiffure: { label: "Coiffure", desc: "Tresses, tissage, coupes, rastas, chignons, perruques…" },
        nails:    { label: "Ongles", desc: "Prothèse ongulaire, gel, résine, nail art…" },
        microshading: { label: "Microshading", desc: "Sourcils effet poudré, rehaussement de cils, maquillage semi-permanent…" },
      },
      back: "← Retour",
      name: "Nom complet",
      phone: "Téléphone",
      email: "E-mail (optionnel)",
      service: "Service souhaité",
      date: "Date souhaitée",
      time: "Heure souhaitée",
      message: "Message (optionnel)",
      submit: "Envoyer la demande",
      sending: "Envoi en cours…",
      success: "Merci ! Votre demande est bien reçue. Nous vous confirmons le rendez-vous très vite.",
      error: "Une erreur est survenue. Appelez-nous au +32 484 16 49 05 ou réessayez.",
      required: "Veuillez remplir les champs obligatoires.",
    },
    services: {
      eyebrow: "Nos services",
      title: "Un savoir-faire complet, pour tous les cheveux",
      items: [
        { name: "Tresses africaines", desc: "Box braids, nattes collées, twists — des tresses soignées qui protègent et subliment.", category: "coiffure" },
        { name: "Coupes européennes", desc: "Coupes femmes, hommes et enfants, adaptées à votre style et votre type de cheveux.", category: "coiffure" },
        { name: "Rastas & crochets", desc: "Création et entretien de locks, crochet braids et styles protecteurs durables.", category: "coiffure" },
        { name: "Tissage", desc: "Pose de tissage de qualité pour un volume et une longueur naturels.", category: "coiffure" },
        { name: "Chignon & coiffures événement", desc: "Mariages, cérémonies et grandes occasions : une coiffure à la hauteur du moment.", category: "coiffure" },
        { name: "Coloration", desc: "Colorations et soins adaptés aux cheveux texturés comme aux cheveux fins.", category: "coiffure" },
        { name: "Perruques & mèches", desc: "Vente et pose de perruques, vente de mèches de qualité sélectionnées avec soin.", category: "coiffure" },
        { name: "Microshading sourcils", desc: "Sourcils redessinés avec un effet poudré naturel, réalisé avec précision.", category: "microshading" },
        { name: "Prothèse ongulaire & nail art", desc: "Onglerie professionnelle, gel, résine et nail art pour des ongles impeccables.", category: "nails" },
      ],
    },
    why: {
      eyebrow: "Pourquoi GiGi L",
      title: "Le salon de référence à Tongres pour les cheveux texturés",
      items: [
        { title: "Expertise tous types de cheveux", desc: "Bouclés, frisés, crépus, lisses : des techniques maîtrisées et respectueuses de votre nature de cheveux." },
        { title: "Un accueil qui vous comprend", desc: "Écoute, conseil honnête et résultats qui vous ressemblent — pas de coiffure standardisée." },
        { title: "Beauté complète sous un même toit", desc: "Coiffure, microshading, ongles, maquillage, perruques : tout au même endroit, à Tongres." },
        { title: "Note de 4,6/5 sur Google", desc: "La confiance de nos clientes et clients, construite rendez-vous après rendez-vous." },
      ],
    },
    gallery: { eyebrow: "Galerie", title: "Nos réalisations" },
    faq: {
      eyebrow: "FAQ",
      title: "Questions fréquentes",
      items: [
        { q: "Faut-il prendre rendez-vous ?", a: "Oui, nous travaillons sur rendez-vous afin de consacrer à chaque client le temps nécessaire. Utilisez le formulaire ci-dessus ou appelez le +32 484 16 49 05." },
        { q: "Coiffez-vous tous les types de cheveux ?", a: "Absolument. Le salon est spécialisé dans les cheveux bouclés, frisés et crépus, et réalise aussi toutes les coupes européennes classiques." },
        { q: "Combien de temps dure une pose de tresses ?", a: "Selon le style choisi (box braids, nattes collées, twists), comptez entre 2 et 6 heures. Nous vous donnons une estimation précise à la réservation." },
        { q: "Faites-vous aussi les ongles et le microshading ?", a: "Oui ! Nous proposons la prothèse ongulaire complète ainsi que le microshading sourcils. Sélectionnez la catégorie correspondante lors de votre réservation." },
        { q: "Vendez-vous des mèches et des perruques ?", a: "Oui, nous vendons des mèches de qualité ainsi que des perruques, avec un service de pose professionnel au salon." },
        { q: "Où se trouve le salon ?", a: "Au Koninksemsteenweg 144, 3700 Tongres, facilement accessible en voiture avec stationnement à proximité." },
      ],
    },
    footer: {
      ctaTitle: "Prête à révéler votre beauté ?",
      ctaText: "Réservez votre rendez-vous dès aujourd'hui — coiffure, ongles ou microshading, votre beauté vous attend à Tongres.",
      cta: "Prendre rendez-vous",
      hours: "Horaires",
      hoursDetail: ["Jeu – Sam : 09:00 – 18:00", "Dim – Mer : sur rendez-vous"],
      address: "Koninksemsteenweg 144, 3700 Tongres",
      rights: "Tous droits réservés.",
    },
  },

  nl: {
    meta: {
      title: "GiGi L Coiffure Tongeren — Afrikaanse vlechten, Weaves & Microshading",
      description:
        "Kapsalon in Tongeren gespecialiseerd in krullend, kroes- en afrohaar. Afrikaanse vlechten, weaves, rasta's, microshading wenkbrauwen, nagelstudio. Boek online een afspraak.",
      ogTitle: "GiGi L Coiffure — Hét afro-kapsalon in Tongeren",
      ogDescription:
        "Afrikaanse vlechten, weaves, microshading & nagels in Tongeren. Het enige salon in Limburg gespecialiseerd in kroes-, krullend- en afrohaar. Online afspraak.",
      keywords:
        "kapper afro haar Tongeren, Afrikaanse vlechten Tongeren, salon kroeshaar Limburg, weaves Tongeren, microshading Tongeren, box braids Tongeren, nagelstudio Tongeren, kapper krullend haar Tongeren",
    },
    nav: { services: "Diensten", why: "Waarom wij", gallery: "Galerij", faq: "FAQ", contact: "Contact", book: "Afspraak maken" },
    hero: {
      eyebrow: "Kapsalon · Microshading · Nagels — Tongeren",
      title: "Jaren van passie in dienst van uw schoonheid",
      subtitle:
        "Afrikaanse en Europese haarstyling, microshading en nagelstudio — voor elk haartype. Hét referentiesalon voor krullend, kroes- en afrohaar in Tongeren.",
      cta: "Nu reserveren",
      altBooking: "Of boek via onze online agenda",
    },
    form: {
      title: "Afspraak aanvragen",
      stepLabel: "Stap",
      categoryTitle: "Wat wilt u reserveren?",
      categories: {
        coiffure: { label: "Kapsalon", desc: "Vlechten, weaves, snitten, rasta's, opsteekkapsels, pruiken…" },
        nails:    { label: "Nagels", desc: "Nagelstudio, gel, acryl, nail art…" },
        microshading: { label: "Microshading", desc: "Wenkbrauwen poedereffect, wimperlifting, semi-permanente make-up…" },
      },
      back: "← Terug",
      name: "Volledige naam",
      phone: "Telefoon",
      email: "E-mail (optioneel)",
      service: "Gewenste dienst",
      date: "Gewenste datum",
      time: "Gewenst uur",
      message: "Bericht (optioneel)",
      submit: "Aanvraag versturen",
      sending: "Versturen…",
      success: "Bedankt! Uw aanvraag is goed ontvangen. We bevestigen uw afspraak zo snel mogelijk.",
      error: "Er ging iets mis. Bel ons op +32 484 16 49 05 of probeer opnieuw.",
      required: "Vul de verplichte velden in.",
    },
    services: {
      eyebrow: "Onze diensten",
      title: "Volledig vakmanschap, voor elk haartype",
      items: [
        { name: "Afrikaanse vlechten", desc: "Box braids, cornrows, twists — verzorgde vlechten die uw haar beschermen en laten stralen.", category: "coiffure" },
        { name: "Europese snitten", desc: "Dames-, heren- en kinderkapsels, afgestemd op uw stijl en haartype.", category: "coiffure" },
        { name: "Rasta's & crochets", desc: "Aanleg en onderhoud van locks, crochet braids en duurzame beschermende stijlen.", category: "coiffure" },
        { name: "Weave", desc: "Professionele weaves voor natuurlijk volume en lengte.", category: "coiffure" },
        { name: "Opsteekkapsels & events", desc: "Bruiloften, feesten en speciale gelegenheden: een kapsel dat het moment waardig is.", category: "coiffure" },
        { name: "Kleuring", desc: "Kleuringen en verzorging op maat van getextureerd én fijn haar.", category: "coiffure" },
        { name: "Pruiken & extensions", desc: "Verkoop en plaatsing van pruiken, verkoop van zorgvuldig geselecteerde extensions.", category: "coiffure" },
        { name: "Microshading wenkbrauwen", desc: "Wenkbrauwen met een natuurlijk poedereffect, met precisie aangebracht.", category: "microshading" },
        { name: "Nagelstudio & nail art", desc: "Professionele nagelstyling, gel, acryl en nail art voor perfecte nagels.", category: "nails" },
      ],
    },
    why: {
      eyebrow: "Waarom GiGi L",
      title: "Hét referentiesalon in Tongeren voor getextureerd haar",
      items: [
        { title: "Expertise in elk haartype", desc: "Krullend, kroes-, afro- of steil haar: beheerste technieken met respect voor uw haarnatuur." },
        { title: "Een salon dat u begrijpt", desc: "Luisteren, eerlijk advies en een resultaat dat bij ú past — geen standaardkapsels." },
        { title: "Complete beauty onder één dak", desc: "Kapsels, microshading, nagels, make-up, pruiken: alles op één adres in Tongeren." },
        { title: "4,6/5 op Google", desc: "Het vertrouwen van onze klanten, opgebouwd afspraak na afspraak." },
      ],
    },
    gallery: { eyebrow: "Galerij", title: "Onze realisaties" },
    faq: {
      eyebrow: "FAQ",
      title: "Veelgestelde vragen",
      items: [
        { q: "Moet ik een afspraak maken?", a: "Ja, wij werken op afspraak zodat elke klant de nodige tijd krijgt. Gebruik het formulier hierboven of bel +32 484 16 49 05." },
        { q: "Knippen jullie elk haartype?", a: "Zeker. Het salon is gespecialiseerd in krullend, kroes- en afrohaar, en verzorgt ook alle klassieke Europese snitten." },
        { q: "Hoelang duurt het vlechten?", a: "Afhankelijk van de stijl (box braids, cornrows, twists) rekent u op 2 tot 6 uur. Bij de reservering krijgt u een precieze inschatting." },
        { q: "Doen jullie ook nagels en microshading?", a: "Ja! We bieden een volledig nagelstudio-aanbod en microshading wenkbrauwen aan. Kies de juiste categorie bij uw reservering." },
        { q: "Verkopen jullie extensions en pruiken?", a: "Ja, we verkopen kwaliteitsextensions en pruiken, met professionele plaatsing in het salon." },
        { q: "Waar ligt het salon?", a: "Koninksemsteenweg 144, 3700 Tongeren — vlot bereikbaar met de auto, parkeren in de buurt." },
      ],
    },
    footer: {
      ctaTitle: "Klaar om te stralen?",
      ctaText: "Boek vandaag uw afspraak — kapsalon, nagels of microshading, uw schoonheid wacht op u in Tongeren.",
      cta: "Afspraak maken",
      hours: "Openingsuren",
      hoursDetail: ["Do – Za: 09:00 – 18:00", "Zo – Wo: op afspraak"],
      address: "Koninksemsteenweg 144, 3700 Tongeren",
      rights: "Alle rechten voorbehouden.",
    },
  },

  en: {
    meta: {
      title: "GiGi L Coiffure Tongeren — African Braids, Weaves & Microshading",
      description:
        "Hair salon in Tongeren specialised in curly, coily and afro hair. African braids, weaves, locks, microshading eyebrows, nail studio. Book your appointment online.",
      ogTitle: "GiGi L Coiffure — Tongeren's afro hair reference salon",
      ogDescription:
        "African braids, weaves, microshading & nails in Tongeren. The only salon in Belgian Limburg specialised in coily, curly and afro hair. Book online.",
      keywords:
        "African hair salon Tongeren, afro braids Belgium, curly hair salon Limburg, weaves Tongeren, microshading Tongeren, box braids Tongeren, nail studio Tongeren, coily hair Tongeren",
    },
    nav: { services: "Services", why: "Why us", gallery: "Gallery", faq: "FAQ", contact: "Contact", book: "Book now" },
    hero: {
      eyebrow: "Hair salon · Microshading · Nails — Tongeren",
      title: "Years of passion, devoted to your beauty",
      subtitle:
        "African and European hairstyling, microshading and nail studio — for every hair type. Tongeren's reference salon for curly, coily and afro hair.",
      cta: "Book now",
      altBooking: "Or book through our online agenda",
    },
    form: {
      title: "Request an appointment",
      stepLabel: "Step",
      categoryTitle: "What would you like to book?",
      categories: {
        coiffure: { label: "Hair", desc: "Braids, weaves, cuts, locks, updos, wigs…" },
        nails:    { label: "Nails", desc: "Nail studio, gel, acrylic, nail art…" },
        microshading: { label: "Microshading", desc: "Powder-effect brows, lash lift, semi-permanent make-up…" },
      },
      back: "← Back",
      name: "Full name",
      phone: "Phone",
      email: "Email (optional)",
      service: "Service",
      date: "Preferred date",
      time: "Preferred time",
      message: "Message (optional)",
      submit: "Send request",
      sending: "Sending…",
      success: "Thank you! Your request has been received. We'll confirm your appointment shortly.",
      error: "Something went wrong. Call us at +32 484 16 49 05 or try again.",
      required: "Please fill in the required fields.",
    },
    services: {
      eyebrow: "Our services",
      title: "Complete craftsmanship, for every hair type",
      items: [
        { name: "African braids", desc: "Box braids, cornrows, twists — meticulous braiding that protects and elevates your hair.", category: "coiffure" },
        { name: "European cuts", desc: "Cuts for women, men and children, tailored to your style and hair type.", category: "coiffure" },
        { name: "Locks & crochet", desc: "Creation and maintenance of locks, crochet braids and lasting protective styles.", category: "coiffure" },
        { name: "Weaves", desc: "Quality weave installation for natural volume and length.", category: "coiffure" },
        { name: "Updos & event styling", desc: "Weddings, ceremonies and big occasions: a hairstyle worthy of the moment.", category: "coiffure" },
        { name: "Colouring", desc: "Colour and care adapted to textured as well as fine hair.", category: "coiffure" },
        { name: "Wigs & extensions", desc: "Sale and fitting of wigs, plus carefully selected quality extensions.", category: "coiffure" },
        { name: "Microshading eyebrows", desc: "Brows redefined with a natural powdered effect, applied with precision.", category: "microshading" },
        { name: "Nail studio & nail art", desc: "Professional nail styling, gel, acrylic and nail art for flawless nails.", category: "nails" },
      ],
    },
    why: {
      eyebrow: "Why GiGi L",
      title: "Tongeren's reference salon for textured hair",
      items: [
        { title: "Expertise in every hair type", desc: "Curly, coily, afro or straight: mastered techniques that respect your hair's nature." },
        { title: "A salon that understands you", desc: "Listening, honest advice and results that look like you — no one-size-fits-all styling." },
        { title: "Complete beauty under one roof", desc: "Hair, microshading, nails, make-up, wigs: everything in one place in Tongeren." },
        { title: "Rated 4.6/5 on Google", desc: "The trust of our clients, built one appointment at a time." },
      ],
    },
    gallery: { eyebrow: "Gallery", title: "Our work" },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "Do I need an appointment?", a: "Yes, we work by appointment so every client gets the time they deserve. Use the form above or call +32 484 16 49 05." },
        { q: "Do you style every hair type?", a: "Absolutely. The salon specialises in curly, coily and afro hair, and also offers all classic European cuts." },
        { q: "How long does braiding take?", a: "Depending on the style (box braids, cornrows, twists), allow 2 to 6 hours. You'll get a precise estimate when booking." },
        { q: "Do you also do nails and microshading?", a: "Yes! We offer a full nail studio service and microshading eyebrows. Select the right category when booking." },
        { q: "Do you sell extensions and wigs?", a: "Yes, we sell quality extensions and wigs, with professional fitting at the salon." },
        { q: "Where is the salon?", a: "Koninksemsteenweg 144, 3700 Tongeren — easy to reach by car, with parking nearby." },
      ],
    },
    footer: {
      ctaTitle: "Ready to shine?",
      ctaText: "Book your appointment today — hair, nails or microshading, your beauty is waiting in Tongeren.",
      cta: "Book an appointment",
      hours: "Opening hours",
      hoursDetail: ["Thu – Sat: 09:00 – 18:00", "Sun – Wed: by appointment"],
      address: "Koninksemsteenweg 144, 3700 Tongeren",
      rights: "All rights reserved.",
    },
  },
};

export function getDict(lang: string): Dict {
  return dictionaries[(LANGS.includes(lang as Lang) ? lang : "fr") as Lang];
}

import christmasImg from "../../assets/images/christmas.jpg";
import firstNightImg from "../../assets/images/first-night.jpg";
import brideWelcomeImg from "../../assets/images/bride-welcome.jpg";

const HeroSection = () => {
  const cards = [
    {
      title: "Need Christmas Decoration",
      image: christmasImg,
    },
    {
      title: "Need First Night Decoration",
      image: firstNightImg,
    },
    {
      title: "Need Bride Welcome Decoration",
      image: brideWelcomeImg,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-[360px] object-cover"
            />

            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-semibold mb-3">
                {card.title}
              </h3>
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full w-fit">
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

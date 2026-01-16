import birthdayImg from "../../assets/images/birthday.jpg";
import kidsImg from "../../assets/images/kids.jpg";
import newbornImg from "../../assets/images/newborn.jpg";
import anniversaryImg from "../../assets/images/anniversary.jpg";
import babyShowerImg from "../../assets/images/baby-shower.jpg";
import corporateImg from "../../assets/images/corporate.jpg";


const categories = [
  { name: "Birthday Decoration", image: birthdayImg },
  { name: "Kids Decoration", image: kidsImg },
  { name: "Newborn Welcome", image: newbornImg },
  { name: "Anniversary Decoration", image: anniversaryImg },
  { name: "Baby Shower", image: babyShowerImg },
  { name: "Corporate Events", image: corporateImg },
];

const CategorySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="text-center cursor-pointer">
            <div className="rounded-xl overflow-hidden shadow hover:scale-105 transition">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
            </div>
            <p className="mt-3 font-medium text-sm">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;

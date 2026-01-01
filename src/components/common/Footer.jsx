import { Facebook, Instagram, Linkedin, Phone, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            balloondekor
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            BalloonDekor.com offers stunning balloon decoration services for
            birthdays, baby showers, anniversaries, and special events across
            India. We make every celebration memorable with professional,
            hassle-free decor.
          </p>
        </div>

        {/* IMPORTANT LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Important Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Terms & Conditions</li>
            <li>About Us</li>
            <li>Disclaimer</li>
            <li>Privacy Policy</li>
            <li>Cancellation Policy</li>
          </ul>
        </div>

        {/* TOP CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-3">Top Categories</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Birthday</li>
            <li>Anniversary</li>
            <li>Baby Shower</li>
            <li>Welcome Baby</li>
            <li>Kids Theme</li>
            <li>Balloon Decoration</li>
            <li>First Night Decorations</li>
            <li>Baby Ceremony Decorations</li>
          </ul>
        </div>

        {/* TOP CITIES */}
        <div>
          <h3 className="font-semibold mb-3">Top Cities</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Bangalore</li>
            <li>Mumbai</li>
            <li>Delhi</li>
            <li>Ahmedabad</li>
            <li>Kolkata</li>
            <li>Chennai</li>
            <li>Hyderabad</li>
            <li>Pune</li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h3 className="font-semibold mb-3">Info</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Contact Us</li>
            <li>Sitemap</li>
            <li>Our Recent Work</li>
            <li>International Presence</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t py-4 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">

        <p className="text-sm text-gray-600">
          © 2025 balloondekor.com - All Rights Reserved
        </p>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <Facebook className="w-5 h-5 cursor-pointer hover:text-pink-600" />
          <X className="w-5 h-5 cursor-pointer hover:text-pink-600" />
          <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-600" />
          <Linkedin className="w-5 h-5 cursor-pointer hover:text-pink-600" />
        </div>
      </div>

      {/* FLOATING CALL & WHATSAPP */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button className="bg-red-500 p-4 rounded-full text-white shadow-lg">
          <Phone />
        </button>
        <button className="bg-green-500 p-4 rounded-full text-white shadow-lg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="whatsapp"
            className="w-6 h-6"
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

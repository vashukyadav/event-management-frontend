import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* 🔝 MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch!</h2>
          <p className="text-gray-600 mb-8">
            It is very important to us to keep in touch with you, so we are always
            ready to answer any question that interests you. Shoot!
          </p>

          {/* Illustration Placeholder */}
          <div className="mb-10">
            <img
              src="https://illustrations.popsy.co/pink/customer-support.svg"
              alt="contact illustration"
              className="w-72"
            />
          </div>

          {/* SOCIALS */}
          <div>
            <p className="font-semibold mb-3">Socials :</p>
            <div className="flex gap-4">
              {["f", "x", "i", "in"].map((s, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center border border-pink-400 rounded-full text-pink-500 cursor-pointer hover:bg-pink-50"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="border-2 border-pink-400 rounded-xl p-6 relative">
          <h3 className="text-xl font-semibold mb-6">Send us a message</h3>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <input
              type="text"
              placeholder="Enter number"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <textarea
              rows="4"
              placeholder="Enter your message"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
            />

            {/* CAPTCHA UI ONLY */}
            <div>
              <p className="text-sm mb-2">Enter Captcha In Image</p>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-gray-100 font-bold tracking-widest">
                  tdfen
                </div>
                <input
                  type="text"
                  placeholder="Captcha"
                  className="flex-1 border rounded-lg px-4 py-2"
                />
                <button type="button" className="text-sm underline">
                  Refresh
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* 🔽 CONTACT DETAILS */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="border border-pink-300 rounded-lg p-4 flex gap-3">
          <Mail className="text-pink-500" />
          <div>
            <p className="font-semibold">Email us:</p>
            <p className="text-gray-600">info@balloondekor.com</p>
          </div>
        </div>

        <div className="border border-pink-300 rounded-lg p-4 flex gap-3">
          <Phone className="text-pink-500" />
          <div>
            <p className="font-semibold">Phone:</p>
            <p className="text-gray-600">+91 8910960060</p>
            <p className="text-xs text-gray-500">
              Mon–Sat 10:30am to 7:30pm
            </p>
          </div>
        </div>

        <div className="border border-pink-300 rounded-lg p-4 flex gap-3">
          <MapPin className="text-pink-500" />
          <div>
            <p className="font-semibold">Address:</p>
            <p className="text-gray-600">
              EC 91 Saltlake Sector 1 Kolkata 700064
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

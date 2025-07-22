import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactForm() {
  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Contact Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fostering Knowledge, Igniting Change - Reach Out for Educational Impact
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#00BA9E]" />
                </div>
                <span className="text-gray-700">+92 (0) 51 111 323 424</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00BA9E]" />
                </div>
                <span className="text-gray-700">info@oladfoundation.co.uk</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#00BA9E]" />
                </div>
                <span className="text-gray-700">sponsor@oladfoundation.co.uk</span>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-[#00BA9E]" />
                </div>
                <span className="text-gray-700 leading-relaxed">
                  3rd Floor, Al-Farooq Plaza, Bahria Enclave (Kuri) Road, Chak Shahzad,
                  <br />
                  Islamabad - Pakistan.
                </span>
              </div>
            </div>

            {/* Illustration */}
            <div className="mt-8">
              <Image
                src="/contact-us/get-in-touch.svg"
                alt="Two people working on laptops with speech bubbles"
                width={400}
                height={300}
                className="w-full max-w-md"
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Write here"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25f4a] focus:border-transparent outline-none transition-colors placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Write here"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25f4a] focus:border-transparent outline-none transition-colors placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Your Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Write here"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25f4a] focus:border-transparent outline-none transition-colors placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Write here"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f25f4a] focus:border-transparent outline-none transition-colors placeholder-gray-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#f25f4a]  hover:bg-coral-600 text-white font-medium py-4 px-6 rounded-full transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

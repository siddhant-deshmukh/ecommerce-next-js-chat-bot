import { Facebook, Instagram, Linkedin, Twitter, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black w-full text-white px-4 py-10">
      <div className="mx-auto container flex flex-col md:flex-row gap-20 justify-between">
        
        <div className="flex items-start space-x-3">
          <div className="badge-gradient p-3 rounded-full shadow-lg">
            <Sparkles className="w-6 h-6 " />
          </div>
          <div>
            <div className="text-2xl font-bold">
              <span className="text-white">Luxury</span>
              <span className="text-gradient pl-1">
                Gems
              </span>
            </div>
            <p className="text-xs text-gray-400">Fine Jewelry Collection</p>
          </div>
        </div>

        
        <div className="space-y-3 text-sm">
          <h2 className="font-semibold text-lg">Quick Links</h2>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-amber-500" />
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-amber-500" />
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-amber-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" aria-label="Linkedin" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 hover:text-amber-500" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Luxury Gems. All rights reserved.
      </div>
    </footer>
  )
}

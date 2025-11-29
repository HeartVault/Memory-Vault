'use client';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a] text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              MemoryVault
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Preserve your memories. Share with loved ones. Create your digital legacy.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Family Vaults</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Time Capsules</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Legacy Mode</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">AI Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} MemoryVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

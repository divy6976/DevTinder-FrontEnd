import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen w-full bg-[#020617] relative">
      {/* Enhanced Red Radial Glow Background */}
      <div
        className="absolute inset-0 z-0 animate-pulse"
        style={{
          backgroundImage: `
            radial-gradient(circle 800px at 20% 20%, rgba(239,68,68,0.3), transparent 70%),
            radial-gradient(circle 600px at 80% 80%, rgba(239,68,68,0.2), transparent 70%),
            radial-gradient(circle 1000px at 50% 50%, rgba(239,68,68,0.15), transparent 80%),
            radial-gradient(circle 400px at 0% 100%, rgba(239,68,68,0.25), transparent 60%),
            radial-gradient(circle 500px at 100% 0%, rgba(239,68,68,0.2), transparent 60%)
          `,
        }}
      />
      {/* Additional subtle overlay for depth */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(239,68,68,0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 50%, rgba(239,68,68,0.05) 100%)
          `,
        }}
      />
      <header className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-lg border-b border-red-500/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">💚</span>
              </div>
              <span className="text-xl font-bold text-white">DevMatch</span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-red-400 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 text-balance">
              Connect with Amazing
              <span className="text-red-400"> Developers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-pretty">
              DevMatch is where developers meet, collaborate, and build meaningful connections. Swipe right on your
              next coding partner, mentor, or maybe something more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/signup"
                className="px-8 py-4 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Connecting
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-xl border-2 border-gray-600 hover:border-red-400 hover:text-red-400 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Free to join</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Verified developers only</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why Developers Love DevMatch</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              More than just networking - build genuine connections in the developer community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 hover:border-red-400/50">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Matching</h3>
              <p className="text-gray-300">
                Our algorithm matches you with developers based on skills, interests, and career goals for meaningful
                connections.
              </p>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 hover:border-red-400/50">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Verified Profiles</h3>
              <p className="text-gray-300">
                All developers are verified through GitHub integration. Connect with confidence knowing profiles are
                authentic.
              </p>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 hover:border-red-400/50">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Code & Chat</h3>
              <p className="text-gray-300">
                Share code snippets, discuss projects, and collaborate directly in our integrated chat with syntax
                highlighting.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
          {/* Reddish Black Texture Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                radial-gradient(circle 400px at 20% 20%, rgba(0,0,0,0.3), transparent 60%),
                radial-gradient(circle 300px at 80% 80%, rgba(0,0,0,0.2), transparent 60%),
                radial-gradient(circle 500px at 50% 50%, rgba(0,0,0,0.15), transparent 70%),
                linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.1) 100%)
              `,
            }}
          />
          {/* Additional texture overlay for depth */}
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
  <div className="max-w-4xl mx-auto px-8 relative z-10">
    <h2 className="text-3xl font-bold mb-4">🚀 Introducing the Future of Developer Collaboration</h2>
    <p className="text-red-100 mb-12 text-lg">
      A new way to connect with coding partners, mentors, and innovators — built by developers, for developers.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <div className="text-3xl font-bold mb-2">Just Launched</div>
        <div className="text-red-100">Early Access Open</div>
      </div>
      <div>
        <div className="text-3xl font-bold mb-2">First 1,000</div>
        <div className="text-red-100">Founding Developers</div>
      </div>
      <div>
        <div className="text-3xl font-bold mb-2">150+</div>
        <div className="text-red-100">Tech Stacks Supported</div>
      </div>
      <div>
        <div className="text-3xl font-bold mb-2">Community First</div>
        <div className="text-red-100">Feedback-Driven</div>
      </div>
    </div>
  </div>
</section>


      </main>

      <footer className="bg-[#020617] text-gray-300 py-16 mt-20 relative z-10 border-t border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💚</span>
                </div>
                <span className="text-xl font-bold text-white">DevMatch</span>
              </div>
              <p className="text-gray-400 mb-4">
                Where developers connect, collaborate, and find their perfect match.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-500/30 mt-12 pt-8 text-center">
            <p>&copy; 2024 DevMatch. All rights reserved. Made with 💚 for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
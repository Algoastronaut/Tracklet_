export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
          Terms of Service
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing or using Tracklet, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Permission is granted to temporarily use Tracklet for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              Tracklet shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:support@tracklet.com" className="text-violet-600 hover:text-violet-700 font-semibold">
                support@tracklet.com
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


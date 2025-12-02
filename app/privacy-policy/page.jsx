export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At Tracklet, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial management platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Account information (name, email address, password)</li>
              <li>Financial transaction data</li>
              <li>Account balances and budgets</li>
              <li>Any other information you choose to provide</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{" "}
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


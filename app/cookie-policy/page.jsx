export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-5 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
          Cookie Policy
        </h1>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">What Are Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">How We Use Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Tracklet uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
              <li><strong>Authentication:</strong> To keep you logged in and maintain your session</li>
              <li><strong>Security:</strong> To protect against unauthorized access and ensure data security</li>
              <li><strong>Preferences:</strong> To remember your preferences and settings</li>
              <li><strong>Analytics:</strong> To understand how you use our platform and improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Functional Cookies</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  These cookies allow the website to remember choices you make and provide enhanced, personalized features.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Managing Cookies</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have questions about our Cookie Policy, please contact us at{" "}
              <a href="mailto:support@tracklet.com" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-semibold">
                support@tracklet.com
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


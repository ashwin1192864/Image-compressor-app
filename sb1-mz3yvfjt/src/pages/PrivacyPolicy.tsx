import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Image Compressor
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Introduction</h2>
              <p>
                At Image Compressor, we value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our online 
                image compression service.
              </p>
              <p>
                We process all images locally in your browser, which means your images never leave your device or get 
                uploaded to our servers. This browser-based processing ensures maximum privacy and security for your data.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Information We Don't Collect</h2>
              <p>
                Since all image processing happens locally in your browser, we do not collect, store, or have access to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your images or any image content</li>
                <li>Image metadata (EXIF data)</li>
                <li>File names</li>
                <li>Any personal information contained within your images</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Information We May Collect</h2>
              <p>
                While using our service, we may collect the following anonymous usage data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Time and date of your visit</li>
                <li>Pages visited</li>
                <li>Anonymous usage statistics (e.g., number of images compressed, average compression ratio)</li>
              </ul>
              <p className="mt-4">
                This information helps us improve our service and user experience. We do not use this data to identify individual users.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Cookies and Local Storage</h2>
              <p>
                We use cookies and local storage to remember your preferences (such as dark/light mode) and compression settings. 
                These are stored locally on your device and are not shared with us or any third parties.
              </p>
              <p className="mt-2">
                You can clear these at any time by clearing your browser's cookies and local storage.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Analytics</h2>
              <p>
                We use anonymous analytics to understand how users interact with our service. This helps us improve the user 
                experience and fix issues. The analytics data is aggregated and does not identify individual users.
              </p>
              <p className="mt-2">
                You can opt out of analytics by using browser extensions that block tracking or by enabling "Do Not Track" in your browser settings.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Third-Party Services</h2>
              <p>
                Our service may include links to third-party websites or services. We are not responsible for the privacy 
                practices of these third parties. We encourage you to read the privacy policies of any third-party services you visit.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Data Security</h2>
              <p>
                We take data security seriously. Since all image processing happens locally in your browser, your images 
                are never at risk of being intercepted during transmission or stored on external servers.
              </p>
              <p className="mt-2">
                Our website uses HTTPS encryption to protect any communication between your browser and our servers.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Children's Privacy</h2>
              <p>
                Our service is not directed to children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe that your child has 
                provided us with personal information, please contact us so that we can take necessary actions.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="mt-2">
                We recommend that you review this Privacy Policy periodically for any changes. Changes to this Privacy 
                Policy are effective when they are posted on this page.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>By email: tawhidsolution@gmail.com</li>
                <li>By visiting the contact page on our website</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
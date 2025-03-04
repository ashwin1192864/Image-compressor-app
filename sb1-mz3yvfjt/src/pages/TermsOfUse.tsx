import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfUse: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms of Use</h1>
          
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Introduction</h2>
              <p>
                Welcome to Image Compressor. These Terms of Use govern your use of our online image compression service. 
                By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of 
                the terms, you may not access the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Service Description</h2>
              <p>
                Image Compressor is a free online tool that allows users to compress and optimize images for web use. 
                All image processing happens locally in your browser, ensuring your images never leave your device.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">User Responsibilities</h2>
              <p>
                When using our service, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Use the service only for lawful purposes and in accordance with these Terms</li>
                <li>Not use the service in any way that could damage, disable, overburden, or impair the service</li>
                <li>Not attempt to gain unauthorized access to any part of the service</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are owned by Image Compressor and are 
                protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="mt-2">
                We do not claim any ownership rights to the images you compress using our service. You retain all rights 
                to your images before and after compression.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Free Service and Limitations</h2>
              <p>
                Image Compressor is provided as a free service. We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Modify or discontinue, temporarily or permanently, the service with or without notice</li>
                <li>Limit certain features or restrict access to parts or all of the service without notice or liability</li>
                <li>Introduce new features or impose limits on certain features</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Disclaimer of Warranties</h2>
              <p>
                The service is provided "as is" and "as available" without any warranties of any kind, either express or implied, 
                including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="mt-2">
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>The service will function uninterrupted, secure, or available at any particular time or location</li>
                <li>Any errors or defects will be corrected</li>
                <li>The service is free of viruses or other harmful components</li>
                <li>The results of using the service will meet your requirements</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Limitation of Liability</h2>
              <p>
                In no event shall Image Compressor, its directors, employees, partners, agents, suppliers, or affiliates be 
                liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Any content obtained from the service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Image Compressor and its licensee and licensors, and their 
                employees, contractors, agents, officers, and directors, from and against any and all claims, damages, 
                obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), 
                resulting from or arising out of:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Your use and access of the service</li>
                <li>Your violation of any term of these Terms</li>
                <li>Your violation of any third-party right, including without limitation any copyright, property, or privacy right</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of [Your Country/State], 
                without regard to its conflict of law provisions.
              </p>
              <p className="mt-2">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                of these Terms will remain in effect.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide 
                notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
              </p>
              <p className="mt-2">
                By continuing to access or use our service after those revisions become effective, you agree to be bound by 
                the revised terms. If you do not agree to the new terms, please stop using the service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us:
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

export default TermsOfUse;
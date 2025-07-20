'use client';

import React from 'react';
import { Brain, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary-50 border-t border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-bold text-secondary-900">
                BrevityAI
              </span>
            </div>
            <p className="text-secondary-600 text-sm">
              AI destekli akıllı özetleyici ve not çıkarıcı platform. 
              Metinlerinizi hızlıca özetleyin ve önemli noktaları çıkarın.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">
              Bağlantılar
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-secondary-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Hakkında
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="text-secondary-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Ayarlar
                </a>
              </li>
              <li>
                <a
                  href="https://ai.google.dev/gemini-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Gemini API
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-secondary-900 uppercase tracking-wider">
              İletişim
            </h3>
            <div className="flex space-x-4">
              <a
                href="mailto:info@brevityai.com"
                className="text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/brevityai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/brevityai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-primary-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-secondary-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-500 text-sm">
              © 2024 BrevityAI. Tüm hakları saklıdır.
            </p>
            <p className="text-secondary-500 text-sm mt-2 md:mt-0">
              Verileriniz sadece cihazınızda saklanır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/lib/i18n/locales/en/translation.json';
import fr from '@/lib/i18n/locales/fr/translation.json';

i18n.use(initReactI18next)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'en',
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: { translation: en },
			fr: { translation: fr },
		},
	});

export default i18n;

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import about_es from './locales/es/about.json'
import activities_es from './locales/es/activities.json'
import contact_es from './locales/es/contact.json'
import home_es from './locales/es/home.json'
import navigation_es from './locales/es/navigation.json'
import gallery_es from './locales/es/gallery.json'
import common_es from './locales/es/common.json'
import loginRegister_es from './locales/es/loginRegister.json'
import validation_es from './locales/es/validation.json'
import admin_es from './locales/es/admin.json'
import event_es from './locales/es/events.json'
import student_es from './locales/es/student.json'
import stats_es from './locales/es/stats.json'

import about_gl from './locales/gl/about.json'
import contact_gl from './locales/gl/contact.json'
import activities_gl from './locales/gl/activities.json'
import home_gl from './locales/gl/home.json'
import navigation_gl from './locales/gl/navigation.json'
import gallery_gl from './locales/gl/gallery.json'
import common_gl from './locales/gl/common.json'
import loginRegister_gl from './locales/gl/loginRegister.json'
import validation_gl from './locales/gl/validation.json'
import admin_gl from './locales/gl/admin.json'
import event_gl from './locales/gl/events.json'
import student_gl from './locales/gl/student.json'
import stats_gl from './locales/gl/stats.json'

i18n.use(initReactI18next).init({
  resources: {
    es: {
      about: about_es,
      contact: contact_es,
      activities: activities_es,
      home: home_es,
      navigation: navigation_es,
      gallery: gallery_es,
      common: common_es,
      loginRegister: loginRegister_es,
      validation: validation_es,
      admin: admin_es,
      events: event_es,
      student: student_es,
      stats: stats_es,
    },
    gl: {
      about: about_gl,
      contact: contact_gl,
      activities: activities_gl,
      home: home_gl,
      navigation: navigation_gl,
      gallery: gallery_gl,
      common: common_gl,
      loginRegister: loginRegister_gl,
      validation: validation_gl,
      admin: admin_gl,
      events: event_gl,
      student: student_gl,
      stats: stats_gl,
    },
  },
  lng: 'es',
  fallbackLng: 'es',
  ns: [
    'about',
    'activities',
    'home',
    'navigation',
    'gallery',
    'common',
    'loginRegister',
    'validation',
    'events',
    'admin',
    'contact',
    'student',
    'stats',
  ],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

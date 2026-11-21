// Contacto directo: todo se centraliza aquí (botones de la página, barra móvil y pie).
// Para añadir el correo basta con rellenar `profile.email` en projects.ts:
// el botón «Correo» aparece solo cuando hay valor.
import { profile } from './projects';

export const PHONE_E164 = '+50245977742';
export const PHONE_DISPLAY = '+502 4597 7742';
export const WHATSAPP_MESSAGE = 'Hola Pablo, vi tu portafolio y me gustaría hablar contigo.';
export const WHATSAPP_URL = `https://wa.me/${PHONE_E164.slice(1)}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const TEL_URL = `tel:${PHONE_E164}`;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/pablo-david-adonay-merida-velasquez-4a151b310/';
export const EMAIL = profile.email;
export const EMAIL_SUBJECT = 'Contacto desde tu portafolio';
export const MAILTO_URL = EMAIL ? `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}` : '';

export type ContactAction = {
  id: 'whatsapp' | 'llamar' | 'correo' | 'linkedin';
  label: string;
  /** Texto secundario (dato visible del canal). */
  hint?: string;
  aria: string;
  href: string;
  external: boolean;
  /** Contenido interno de un <svg viewBox="0 0 24 24"> de trazo. */
  icon: string;
};

const all: ContactAction[] = [
  {
    id: 'whatsapp', label: 'WhatsApp', hint: PHONE_DISPLAY, aria: 'Escribir por WhatsApp a Pablo (abre en otra pestaña)',
    href: WHATSAPP_URL, external: true,
    icon: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M9 10c.5 2 2.5 4 5 5l1.5-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2z" fill="currentColor" stroke="none"/>',
  },
  {
    id: 'llamar', label: 'Llamar', hint: PHONE_DISPLAY, aria: 'Llamar a Pablo por teléfono',
    href: TEL_URL, external: false,
    icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  },
  {
    id: 'correo', label: 'Correo', hint: EMAIL, aria: 'Escribir un correo a Pablo',
    href: MAILTO_URL, external: false,
    icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  },
  {
    id: 'linkedin', label: 'LinkedIn', aria: 'Ver el perfil de LinkedIn de Pablo (abre en otra pestaña)',
    href: LINKEDIN_URL, external: true,
    icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  },
];

/** Acciones activas: el correo solo existe si hay `profile.email`. */
export const contactActions = all.filter((a) => a.href);
export const action = (id: ContactAction['id']) => contactActions.find((a) => a.id === id);

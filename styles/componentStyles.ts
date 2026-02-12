import { CSSProperties } from 'react';

export const inputStyle: CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid var(--color-neutral-200)',
  borderRadius: '0.5rem',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-neutral-900)',
  fontSize: '1rem',
  fontFamily: "'Rubik', sans-serif",
  transition: 'all 0.2s ease',
};

export const labelStyle: CSSProperties = {
  display: 'block',
  fontWeight: 700,
  marginBottom: '0.5rem',
  color: 'var(--color-neutral-900)',
};

export const cardStyle: CSSProperties = {
  backgroundColor: 'var(--color-surface)',
  borderRadius: '1rem',
  padding: '2rem',
  border: '2px solid var(--color-neutral-200)',
  marginBottom: '2rem',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
};

export const buttonPrimaryStyle: CSSProperties = {
  backgroundColor: 'var(--color-primary)',
  color: 'white',
  fontWeight: 700,
  padding: '1rem 2rem',
  borderRadius: '0.5rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textAlign: 'center',
};

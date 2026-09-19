'use client';

import React, { useState } from 'react';
import { useForm } from '@payloadcms/ui';

interface TranslationItem {
  path: string;
  sourceText: string;
  targetCurrentText: string;
}

/**
 * Finds all Dutch -> English field pairs in a nested object.
 * Identifies any property 'X' that has a corresponding 'XEn' sibling.
 */
function findTranslationPairs(
  obj: unknown,
  currentPath: string = '',
  pairs: TranslationItem[] = []
): TranslationItem[] {
  if (!obj || typeof obj !== 'object') return pairs;

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const arrayPath = currentPath ? `${currentPath}.${index}` : `${index}`;
      findTranslationPairs(item, arrayPath, pairs);
    });
    return pairs;
  }

  const record = obj as Record<string, unknown>;
  const keys = Object.keys(record);

  for (const key of keys) {
    const targetKey = `${key}En`;
    if (keys.includes(targetKey)) {
      const sourceVal = record[key];
      const targetVal = record[targetKey];

      if (typeof sourceVal === 'string' && sourceVal.trim()) {
        const fullTargetPath = currentPath ? `${currentPath}.${targetKey}` : targetKey;
        pairs.push({
          path: fullTargetPath,
          sourceText: sourceVal.trim(),
          targetCurrentText: typeof targetVal === 'string' ? targetVal.trim() : '',
        });
      }
    }

    const val = record[key];
    if (val && typeof val === 'object' && !Array.isArray(val) && !key.endsWith('En')) {
      const nestedPath = currentPath ? `${currentPath}.${key}` : key;
      findTranslationPairs(val, nestedPath, pairs);
    } else if (Array.isArray(val)) {
      const nestedPath = currentPath ? `${currentPath}.${key}` : key;
      findTranslationPairs(val, nestedPath, pairs);
    }
  }

  return pairs;
}

/**
 * Clean, native-feeling AutoTranslateBar Component for Payload CMS Admin.
 */
export const AutoTranslateBar: React.FC = () => {
  const form = useForm();
  const [isTranslating, setIsTranslating] = useState(false);
  const [overwriteExisting, setOverwriteExisting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleTranslateAll = async () => {
    try {
      setIsTranslating(true);
      setStatusType('loading');
      setStatusMessage('Scanning fields...');

      const data = form?.getData ? form.getData() : {};
      const allPairs = findTranslationPairs(data);

      const pairsToTranslate = allPairs.filter((p) => {
        if (overwriteExisting) return true;
        return !p.targetCurrentText;
      });

      if (pairsToTranslate.length === 0) {
        setIsTranslating(false);
        setStatusType('idle');
        setStatusMessage(
          allPairs.length > 0
            ? 'All English fields are filled. Enable overwrite to replace.'
            : 'No Dutch text found to translate.'
        );
        setTimeout(() => setStatusMessage(null), 4000);
        return;
      }

      setStatusMessage(`Translating ${pairsToTranslate.length} field${pairsToTranslate.length > 1 ? 's' : ''}...`);

      const texts = pairsToTranslate.map((p) => p.sourceText);
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texts, from: 'nl', to: 'en' }),
      });

      const json = await res.json();
      if (!res.ok || !json.success || !Array.isArray(json.translations)) {
        throw new Error(json.error || 'Server error');
      }

      const translations: string[] = json.translations;

      let updatedCount = 0;
      pairsToTranslate.forEach((pair, idx) => {
        const translatedText = translations[idx];
        if (translatedText) {
          if (form?.dispatchFields) {
            form.dispatchFields({
              type: 'UPDATE',
              path: pair.path,
              value: translatedText,
            });
          }

          try {
            const domSelector = `[name="${pair.path}"], [id="field-${pair.path.replace(/\./g, '__')}"]`;
            const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(domSelector);
            inputs.forEach((input) => {
              input.value = translatedText;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
            });
          } catch {
            // Ignore DOM fallback issues
          }

          updatedCount++;
        }
      });

      setIsTranslating(false);
      setStatusType('success');
      setStatusMessage(`Updated ${updatedCount} English field${updatedCount > 1 ? 's' : ''}`);
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err: unknown) {
      console.error('[AutoTranslateBar] Translation error:', err);
      setIsTranslating(false);
      setStatusType('error');
      setStatusMessage(
        err instanceof Error ? err.message : 'Translation failed'
      );
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return (
    <div
      style={{
        margin: '0 0 20px 0',
        padding: '10px 14px',
        borderRadius: '8px',
        backgroundColor: 'var(--theme-elevation-50, #141416)',
        border: '1px solid var(--theme-elevation-150, #27272a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '13px',
      }}
    >
      {/* Left side: Context label & info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--theme-elevation-500, #a1a1aa)', flexShrink: 0 }}
        >
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>

        <span style={{ fontWeight: 500, color: 'var(--theme-text, #f4f4f5)' }}>
          Translate to English
        </span>

        <span
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'var(--theme-elevation-400, #71717a)',
            backgroundColor: 'var(--theme-elevation-100, #1f1f23)',
            padding: '1px 6px',
            borderRadius: '4px',
            border: '1px solid var(--theme-elevation-200, #2e2e33)',
          }}
        >
          NL → EN
        </span>

        {statusMessage && (
          <span
            style={{
              fontSize: '12px',
              marginLeft: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color:
                statusType === 'success'
                  ? '#22c55e'
                  : statusType === 'error'
                  ? '#ef4444'
                  : 'var(--theme-elevation-400, #a1a1aa)',
            }}
          >
            {statusType === 'loading' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: '2px solid currentColor',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
            )}
            {statusType === 'success' && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {statusMessage}
          </span>
        )}
      </div>

      {/* Right side: Actions & Overwrite Checkbox */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--theme-elevation-500, #a1a1aa)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={overwriteExisting}
            onChange={(e) => setOverwriteExisting(e.target.checked)}
            disabled={isTranslating}
            style={{
              cursor: 'pointer',
              accentColor: 'var(--theme-text, #f4f4f5)',
            }}
          />
          <span>Overwrite existing</span>
        </label>

        <button
          type="button"
          onClick={handleTranslateAll}
          disabled={isTranslating}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: 500,
            backgroundColor: 'var(--theme-elevation-800, #e4e4e7)',
            color: 'var(--theme-elevation-0, #09090b)',
            border: '1px solid var(--theme-elevation-200, #d4d4d8)',
            cursor: isTranslating ? 'not-allowed' : 'pointer',
            opacity: isTranslating ? 0.6 : 1,
            transition: 'background-color 0.15s ease, opacity 0.15s ease',
          }}
        >
          {isTranslating ? (
            <span>Translating...</span>
          ) : (
            <span>Auto-Translate</span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AutoTranslateBar;

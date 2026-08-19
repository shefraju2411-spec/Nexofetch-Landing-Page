import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage, languages, t } = useLanguage()

  return (
    <div className="lang-switcher">
      <label className="lang-switcher-label" htmlFor="lang-select">
        {t.header.languageLabel}
      </label>
      <select
        id="lang-select"
        className="lang-switcher-select"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        aria-label={t.header.languageLabel}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} · {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}

# قانون دوست | QanoonDost

### A citizen-focused Pakistani legal rights assistant 

**QanoonDost** is a civic-tech web application designed to make Pakistani laws easier to understand and navigate. It helps citizens explore their legal rights, find relevant statutory references, and understand possible steps to take when facing common legal issues.

Legal information is often difficult to access, written in unfamiliar terminology, or intimidating to people who don't know where to begin. QanoonDost aims to bridge that gap through plain-language explanations, Urdu voice support, practical guidance, and legal application templates.

The goal is simple: make legal information more accessible to ordinary citizens.

---

## What can you do with QanoonDost?

- **Explore your legal rights:** Find information about common legal issues through a dedicated rights explorer.
- **Ask questions in Urdu or English:** Submit legal queries using text or Urdu voice input.
- **Understand the law:** Get simplified explanations alongside relevant statutory references.
- **Listen to answers:** Use Urdu text-to-speech narration, with normal and slower playback speeds.
- **Prepare legal applications:** Generate structured drafts for common complaints and legal requests.
- **Find emergency contacts:** Access a directory of relevant helplines.
- **Understand legal terminology:** Explore a glossary explaining commonly used legal terms in plain Urdu.
- **Use it comfortably on mobile:** Navigate a responsive interface designed for accessibility and readability.

---

## Features

### 1. Legal rights explorer

Explore common legal topics and discover relevant provisions of Pakistani law without having to navigate lengthy legal documents yourself.

The application covers areas including:

| Legal area | Relevant laws and provisions |
|---|---|
| Constitutional rights | Constitution of Pakistan, 1973 |
| Criminal law | Pakistan Penal Code (PPC), 1860 |
| Criminal procedure | Code of Criminal Procedure (CrPC), 1898 |
| Family law | Muslim Family Laws Ordinance, 1961; Family Courts Act, 1964 |
| Cybercrime | Prevention of Electronic Crimes Act (PECA), 2016 |
| Tenancy | Applicable provincial tenancy laws |
| Inheritance | Succession laws and women's property rights legislation |
| Labour | Industrial and employment legislation |
| Consumer rights | Applicable provincial consumer protection laws |

The application's legal database includes selected provisions relating to arrest safeguards, FIR registration, bail, maintenance, harassment, fraud, cybercrime, tenancy disputes, inheritance and consumer complaints.

<sub>Coverage varies by topic and jurisdiction. The application is not a complete database of Pakistani law.</sub>

### 2. Urdu voice interaction

Designed to make legal information easier to access for users who may prefer speaking over typing.

- Urdu speech-to-text input using the browser's Web Speech API.
- Speech recognition configured for `ur-PK`.
- Urdu text-to-speech narration.
- Adjustable playback speeds of 1.0x and 0.8x.
- Bilingual interface with Urdu RTL and English LTR layouts.

### 3. Simplified legal answers

Legal provisions can be difficult to interpret without context. QanoonDost presents legal information in a more approachable format, including:

- Plain-language explanations.
- Relevant statutory citations.
- Practical steps a citizen may consider.
- Relevant authorities or institutions to approach.

The application is designed to avoid inventing statutory references when it cannot identify a supported provision. Unverified queries are handled with a disclaimer rather than presented as established law.

### 4. Legal application drafter

The application includes structured templates to help citizens prepare common legal applications and complaints.

Currently supported templates include:

- **FIR application:** A draft application to the Station House Officer (SHO) concerning FIR registration under Section 154 CrPC.
- **Application under Sections 22-A/22-B CrPC:** A draft for seeking appropriate judicial intervention in matters involving police inaction, subject to legal applicability.
- **Cybercrime complaint:** A structured complaint draft for reporting relevant cybercrime matters.
- **Consumer complaint notice:** A draft notice for consumer-related disputes.

These templates are intended to help users organise their information and prepare a draft, not replace professional legal advice.

### 5. Emergency helplines

A dedicated section provides quick access to selected emergency and assistance contacts.

| Service | Contact |
|---|---|
| Police Emergency | 15 |
| FIA Cybercrime | 1991 |
| Punjab Women Helpline | 1043 |
| Legal Aid Society | 0800-70806 |
| Child Protection | 1121 |
| Edhi Emergency Service | 115 |

<sub>Helpline availability, service coverage and numbers should be verified before relying on them. Some services may be province-specific.</sub>

### 6. Legal glossary

A plain-language Urdu glossary helps users understand commonly encountered legal terminology, including:

- مدعی — Complainant
- مدعا علیہ — Defendant / Respondent
- روبکار — Court notice / summons, depending on context
- حکم امتناعی — Injunction
- ضمانتی مچلکہ — Bail bond

The glossary aims to make unfamiliar legal language less intimidating.

---

## Design & accessibility

QanoonDost uses a civic-inspired interface with a focus on clarity, usability and readability.

- **Colour palette:** Royal navy, warm amber and white.
- **Bilingual navigation:** Urdu and English.
- **RTL support:** Native right-to-left layout for Urdu.
- **Typography:** Noto Nastaliq Urdu.
- **Responsive layout:** Designed for mobile and desktop screens.
- **Font controls:** Adjustable text size for improved readability.
- **Audio support:** Spoken Urdu answers for users who prefer listening.

---

## Security & privacy considerations

The application incorporates several measures to improve the handling of user queries:

- **Rate limiting:** Sliding-window request throttling on the legal query API.
- **Input sanitisation:** HTML tag stripping and query length restrictions.
- **Search history controls:** A clear-history option for users sharing devices.
- **Reduced framework exposure:** `poweredByHeader` disabled in Next.js configuration.
- **Legal disclaimers:** Informational limitations communicated within the application.

These measures are intended to reduce risks, but they do not constitute a complete security audit. The application should not be assumed to provide confidential or privileged handling of legal information.

---

## Tech stack

| Technology | Purpose |
|---|---|
| Next.js 14 | Application framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive UI |
| React | Component-based interface |
| Web Speech API | Speech recognition and voice interaction |
| Browser Speech Synthesis | Audio narration |

---

## Project structure

```text 
QanoonDost/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── legal-query/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AudioPlayerButton.tsx
│   │   ├── FIRDrafterModal.tsx
│   │   ├── HelplineBanner.tsx
│   │   ├── LegalGlossaryModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── QueryCard.tsx
│   │   ├── RightsExplorer.tsx
│   │   └── VoiceInputButton.tsx
│   ├── lib/
│   │   ├── complaintTemplates.ts
│   │   ├── legalEngine.ts
│   │   ├── legalGlossary.ts
│   │   └── pakistanLawDatabase.ts
│   └── types/
│       └── law.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Core modules

| Module | Responsibility |
|---|---|
| `legalEngine.ts` | Processes legal queries, identifies relevant provisions and structures responses. |
| `pakistanLawDatabase.ts` | Stores the application's statutory reference data. |
| `complaintTemplates.ts` | Contains structured complaint and application templates. |
| `legalGlossary.ts` | Contains plain-language legal terminology. |
| `legal-query/route.ts` | Handles incoming legal queries through the API. |

---

## API reference

### `POST /api/legal-query`

Accepts a legal question and returns a structured response containing the relevant legal information, where available.

**Request**

```json
{
  "query": "شوہر خرچہ نہیں دیتا بیوی کے کیا حقوق ہیں"
}
```

**Response structure**

```json
{
  "success": true,
  "timestamp": "2026-11-23T19:24:45.000Z",
  "result": {
    "found": true,
    "userQuery": "شوہر خرچہ نہیں دیتا بیوی کے کیا حقوق ہیں",
    "languageDetected": "urdu",
    "category": "family",
    "citations": [],
    "laymanAnswerUrdu": "...",
    "practicalRoadmapUrdu": [],
    "authoritiesToVisitUrdu": []
  }
}
```

The response may include:

- `found` — Whether a supported legal reference was identified.
- `languageDetected` — The detected query language.
- `category` — The legal category of the query.
- `citations` — Relevant statutory references.
- `laymanAnswerUrdu` — The simplified explanation.
- `practicalRoadmapUrdu` — Suggested practical steps.
- `authoritiesToVisitUrdu` — Relevant institutions or authorities.

If a supported provision cannot be identified, the API returns an appropriate disclaimer instead of presenting an unverified citation as established law.

---

## Getting started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate into the project
cd QanoonDost

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

---

## Legal disclaimer

QanoonDost is an informational civic-tech project intended to help citizens better understand Pakistani legal provisions and navigate common legal concerns.

The information and templates provided by the application are for educational and informational purposes only. They do not constitute formal legal advice, legal representation, or the establishment of an attorney-client relationship.

Laws, procedures and legal interpretations may change, and their applicability depends on the facts of an individual case and the relevant jurisdiction. Statutory references, suggested steps, templates and helpline details should be independently verified before taking legal action.

For case-specific guidance, consult an enrolled advocate or an appropriate legal aid organisation.

---

*Built with the intention of making legal information a little less intimidating and a little more accessible to the people who need it.*
#   Q a n o o n D o s t 
 
 

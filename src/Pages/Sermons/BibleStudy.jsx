import { useState } from "react";

const BIBLE_STUDIES = [
  {
    id: 1,
    title: "Epistle to the Romans: Justification by Faith",
    passage: "Romans 3:21–5:11",
    author: "Pastor Saravanan Immanuel",
    topic: "Salvation & Righteousness",
    memoryVerse: "Romans 5:1 — 'Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ.'",
    sections: [
      {
        heading: "1. The Universality of Sin (Romans 3:23)",
        content: "Both Jew and Gentile stand equally guilty before the holy standard of God. Human self-righteousness can never bridge the chasm between mortal sin and divine purity.",
      },
      {
        heading: "2. Redemption in Christ Jesus (Romans 3:24–25)",
        content: "Justification is God's legal declaration that the believer is righteous, grounded wholly upon the propitiation through faith in Christ's shed blood.",
      },
      {
        heading: "3. The Blessed Fruits of Justification (Romans 5:1–5)",
        content: "Peace with God, standing in grace, joyful boasting in hope, and perseverance in tribulations which produces character and Holy Spirit love.",
      },
    ],
    questions: [
      "Why is human effort inadequate to attain righteousness before God?",
      "How does having 'peace with God' impact your daily mental anxiety?",
      "In what way does suffering produce enduring spiritual hope in a believer?",
    ],
  },
  {
    id: 2,
    title: "The Mystery of the Church: The Body of Christ",
    passage: "Ephesians 1:15–2:22",
    author: "Pastoral Teaching Team",
    topic: "Ecclesiology & Divine Calling",
    memoryVerse: "Ephesians 2:8–9 — 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.'",
    sections: [
      {
        heading: "1. The Eyes of the Heart Enlightened (Ephesians 1:18)",
        content: "Paul prays for the spiritual illumination to comprehend the hope of God's calling and the surpassing greatness of His resurrection power.",
      },
      {
        heading: "2. Made Alive With Christ (Ephesians 2:1–6)",
        content: "We who were dead in trespasses and sins have been resurrected, energized, and seated with Christ in the heavenly realms.",
      },
      {
        heading: "3. The Breaking Down of the Middle Wall (Ephesians 2:14–18)",
        content: "Christ has made Jew and Gentile one new spiritual humanity, reconciling all believers through the cross and giving access by one Spirit to the Father.",
      },
    ],
    questions: [
      "What does it mean practically that believers are seated with Christ in heavenly places?",
      "How does God's grace empower us for good works according to Ephesians 2:10?",
      "How should the unity of the Body of Christ be demonstrated in local fellowship?",
    ],
  },
  {
    id: 3,
    title: "The Armor of God & Prevailing Warfare",
    passage: "Ephesians 6:10–20",
    author: "Eva. Glory Devapiriyam",
    topic: "Spiritual Warfare",
    memoryVerse: "Ephesians 6:11 — 'Put on the whole armor of God, that you may be able to stand against the wiles of the devil.'",
    sections: [
      {
        heading: "1. The Nature of the Battle (Ephesians 6:12)",
        content: "Our struggle is not against flesh and blood, but against principalities, powers, rulers of darkness, and spiritual hosts of wickedness.",
      },
      {
        heading: "2. The Defensive Armor Pieces (Ephesians 6:14–17)",
        content: "Belt of Truth, Breastplate of Righteousness, Shoes of Peace, Shield of Faith (quenching flaming arrows), and Helmet of Salvation.",
      },
      {
        heading: "3. The Offensive Weapon & Constant Prayer (Ephesians 6:17–18)",
        content: "The Sword of the Spirit (rhema word of God) combined with praying always with all prayer and supplication in the Spirit.",
      },
    ],
    questions: [
      "How do we actively quench the flaming darts of guilt and accusation using the Shield of Faith?",
      "Why is speaking the written Word of God so potent against demonic temptation?",
      "What is the role of persistent intercession in winning spiritual victories?",
    ],
  },
];

export default function BibleStudy() {
  const [activeStudy, setActiveStudy] = useState(BIBLE_STUDIES[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
      {/* Sidebar */}
      <aside className="bg-white rounded-[18px] border-[1.5px] border-gold/25 p-6 shadow-sm">
        <h3 className="font-serif text-lg text-green-dark mb-4 font-bold">Expository Studies</h3>
        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
          {BIBLE_STUDIES.map((study) => (
            <li
              key={study.id}
              className={`p-3.5 sm:px-4 rounded-xl border transition-all cursor-pointer ${
                activeStudy.id === study.id
                  ? "border-gold bg-grad-sanctuary text-ivory shadow-sm"
                  : "border-gray-200 bg-ivory hover:border-gold hover:bg-white text-text-main"
              }`}
              onClick={() => setActiveStudy(study)}
            >
              <span className="font-bold text-[0.9rem] mb-1 block leading-snug">{study.title}</span>
              <span
                className={`text-[0.74rem] block ${
                  activeStudy.id === study.id ? "text-gold-light" : "text-text-muted"
                }`}
              >
                {study.passage}
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Study Details */}
      <article className="bg-white rounded-[20px] border-[1.5px] border-gold/40 p-6 sm:p-9 shadow-md" aria-labelledby="study-title">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2">
          {activeStudy.topic}
        </span>
        <h2 id="study-title" className="font-serif text-[clamp(1.4rem,3vw,1.85rem)] text-green-dark my-2 mb-1.5 font-bold leading-tight">
          {activeStudy.title}
        </h2>
        <div className="text-[0.84rem] text-gold-dark font-bold mb-5">
          📖 Scripture: {activeStudy.passage} | 👤 Teacher: {activeStudy.author}
        </div>

        {/* Memory Verse Box */}
        <div className="bg-gradient-to-r from-green-deep to-green-dark text-gold-bright p-4 sm:p-5 rounded-xl border border-gold/30 font-serif italic text-sm sm:text-base leading-relaxed my-5 shadow-sm">
          {activeStudy.memoryVerse}
        </div>

        {/* Study Sections */}
        <div className="my-7 flex flex-col gap-5">
          {activeStudy.sections.map((sec, idx) => (
            <div key={idx} className="bg-ivory border border-gold/25 rounded-xl p-5 sm:p-6">
              <h4 className="font-serif text-lg text-green mb-2 font-bold">{sec.heading}</h4>
              <p className="text-[0.92rem] text-text-muted leading-[1.75] m-0">{sec.content}</p>
            </div>
          ))}
        </div>

        {/* Reflection Questions */}
        <div className="bg-gold-soft rounded-xl p-6 border-[1.5px] border-gold/40 mt-7.5">
          <h4 className="font-serif text-lg text-green-dark mb-3 font-bold">
            💡 Personal &amp; Group Reflection Questions:
          </h4>
          <ol className="pl-5 text-green-dark leading-[1.8] text-[0.92rem] list-decimal space-y-1.5">
            {activeStudy.questions.map((q, idx) => (
              <li key={idx}>
                {q}
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}

const ARTICLES = [
  {
    num: "1",
    title: "The Holy Scriptures",
    text: "We believe that the Holy Bible, consisting of the Old and New Testaments, is the inspired Word of God, divinely given and authoritative for faith, doctrine, conduct and Christian living.",
    refs: "2 Timothy 3:16–17; 2 Peter 1:20–21; Psalm 119:105",
  },
  {
    num: "2",
    title: "The One True God — The Trinity",
    text: "We believe in one true and living God, eternally existing in three distinct Persons: God the Father, God the Son, and God the Holy Spirit. Each Person is fully God, united in divine nature, glory and purpose.",
    refs: "Deuteronomy 6:4; Matthew 28:19; 2 Corinthians 13:14",
  },
  {
    num: "3",
    title: "Jesus Christ",
    text: "We believe that Jesus Christ is the eternal Son of God, fully God and fully man. He was born of the virgin Mary, lived a sinless life, died on the cross for the sins of humanity, was bodily raised from the dead, ascended into heaven, and is seated at the right hand of the Father. We believe salvation is found in Jesus Christ alone.",
    refs: "John 1:1–14; Matthew 1:20–23; Philippians 2:5–11; Acts 4:12; 1 Corinthians 15:3–4",
  },
  {
    num: "4",
    title: "The Holy Spirit",
    text: "We believe in the Person and present ministry of the Holy Spirit. The Holy Spirit convicts of sin, regenerates, sanctifies, empowers, guides, comforts and equips believers for holy living and effective ministry. We believe in the baptism and filling of the Holy Spirit, the gifts of the Spirit, and the supernatural working of the Holy Spirit in the Church today.",
    refs: "John 14:16–17; John 16:7–13; Acts 1:8; Acts 2:1–4; 1 Corinthians 12:4–11; Ephesians 5:18",
  },
  {
    num: "5",
    title: "The Full Gospel",
    text: "We believe and proclaim the Full Gospel of Jesus Christ — that Jesus Christ saves, transforms, heals, delivers, restores and empowers His people. We believe the Gospel must be proclaimed to every nation and that the Church is called to preach the Word, make disciples, demonstrate God's love and minister through the power of the Holy Spirit.",
    refs: "Mark 16:15–20; Luke 4:18–19; Matthew 28:18–20; Romans 1:16",
  },
  {
    num: "6",
    title: "Salvation",
    text: "We believe that all humanity is separated from God because of sin and that salvation is by God's grace through faith in Jesus Christ. We believe in repentance, faith in Christ, regeneration, justification and the transforming work of God in the life of every believer.",
    refs: "John 3:3–7; Acts 2:38; Romans 3:23–26; Ephesians 2:8–9; Titus 3:5",
  },
  {
    num: "7",
    title: "Water Baptism",
    text: "We believe that believers should follow Christ's command and example by receiving water baptism as an outward expression of faith, identification with Christ's death and resurrection, and obedience to His Word.",
    refs: "Matthew 28:19; Acts 2:38; Romans 6:3–4",
  },
  {
    num: "8",
    title: "The Church",
    text: "We believe the Church is the Body of Christ, called to worship God, proclaim the Gospel, make disciples, serve humanity, equip believers and demonstrate the Kingdom of God. We believe every believer has a place and purpose in the Body of Christ.",
    refs: "Matthew 16:18; Acts 2:42–47; Ephesians 1:22–23; Ephesians 4:11–16",
  },
  {
    num: "9",
    title: "Divine Healing and Deliverance",
    text: "We believe that God is our Healer and that divine healing is part of God's gracious provision through Jesus Christ. We believe in praying for the sick, ministering to the brokenhearted and proclaiming freedom from the works and bondage of the enemy through the authority of Jesus Christ. We recognize that healing is ultimately according to God's sovereign will and purpose.",
    refs: "Isaiah 53:4–5; Psalm 103:2–3; Mark 16:17–18; James 5:14–16; Luke 4:18",
  },
  {
    num: "10",
    title: "The Gifts and Power of the Holy Spirit",
    text: "We believe the supernatural gifts of the Holy Spirit continue to operate in the Church today for the edification of the Body of Christ, the advancement of the Gospel and the glory of God. We believe in gifts including prophecy, tongues, interpretation, healing, miracles, faith, discernment and other spiritual gifts.",
    refs: "1 Corinthians 12:4–11; 1 Corinthians 14:1–5; Romans 12:6–8",
  },
  {
    num: "11",
    title: "Holy and Transformed Living",
    text: "We believe that those who belong to Christ are called to live lives of holiness, righteousness, love, obedience and spiritual transformation. The grace of God does not merely forgive us; it transforms us to become more like Christ.",
    refs: "Romans 12:1–2; Galatians 5:22–25; 1 Peter 1:15–16; 2 Corinthians 5:17",
  },
  {
    num: "12",
    title: "The Second Coming of Jesus Christ",
    text: "We believe in the personal, visible, bodily and glorious Second Coming of Jesus Christ. We believe Christ will return according to His promise, and every believer must live in readiness, holiness and faithful service while proclaiming the Gospel.",
    refs: "John 14:1–3; Acts 1:10–11; Matthew 24:30–31; 1 Thessalonians 4:16–17; Revelation 19:11–16",
  },
  {
    num: "13",
    title: "The Resurrection and Eternal Destiny",
    text: "We believe in the bodily resurrection of the dead, the eternal life of those who belong to Christ, and the final judgment of all humanity. We believe there is an eternal kingdom prepared for those who are reconciled to God through Jesus Christ.",
    refs: "John 5:28–29; 1 Corinthians 15:51–54; Revelation 20:11–15; Revelation 21:1–4",
  },
  {
    num: "14",
    title: "Our Mission",
    text: "We believe the Church is commissioned by Jesus Christ to preach the Gospel, make disciples, proclaim freedom, minister healing and restoration, equip believers, and prepare people for the coming of Christ. Therefore, our ministry is committed to: PREACH • DELIVER • HEAL • EQUIP.",
    refs: "Matthew 28:18–20; Mark 16:15–20; Acts 1:8; Ephesians 4:11–13; 1 Peter 2:9",
  },
];

const CONFESSIONS = [
  "We believe the Bible.",
  "We exalt Jesus Christ.",
  "We honour the Father.",
  "We welcome the work and power of the Holy Spirit.",
  "We preach the Full Gospel.",
  "We believe in salvation, healing, deliverance and transformation.",
  "We pursue holiness and biblical discipleship.",
  "We believe in the gifts and power of the Holy Spirit.",
  "We believe Jesus Christ is coming again.",
  "We live to preach the Gospel and make disciples.",
];

export default function Faith() {
  return (
    <div className="font-sans">
      <p className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.26em] uppercase text-gold-dark font-bold py-1.5 px-4.5 border-[1.5px] border-gold/35 rounded-full bg-gold/12 mb-4">
        ✝ Our Statement of Faith
      </p>
      <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] text-green-deep m-0 mb-2.5 font-black">
        What We Believe
      </h2>
      <p className="text-base text-gray-700 m-0 mb-9 leading-relaxed max-w-[720px]">
        We are an Apostolic, Bible-believing, Christ-centred, Spirit-filled church committed to
        proclaiming the Full Gospel of Jesus Christ.
      </p>

      <div className="bg-white border-[1.5px] border-gold/40 rounded-[18px] p-5.5 sm:p-7 md:p-8 mb-10 shadow-[0_6px_20px_rgba(18,45,36,0.06)]">
        <p className="text-[0.98rem] text-gray-700 leading-relaxed m-0">
          We believe the Holy Scriptures are the{" "}
          <strong className="text-green-deep font-bold">
            inspired, authoritative and unchanging Word of God
          </strong>{" "}
          and the foundation for our faith, doctrine and Christian life.
        </p>
      </div>

      {/* Articles */}
      <div className="flex flex-col border-[1.5px] border-gold/35 rounded-[20px] overflow-hidden bg-white shadow-[0_8px_28px_rgba(18,45,36,0.06)]">
        {ARTICLES.map((a) => (
          <div
            className="grid grid-cols-[42px_1fr] sm:grid-cols-[56px_1fr] border-b border-gold/20 last:border-b-0 hover:bg-ivory transition-colors duration-200"
            key={a.num}
          >
            <div
              className="bg-ivory flex items-start justify-center pt-5 sm:pt-6 font-serif text-sm sm:text-[0.95rem] font-bold text-gold-dark border-r border-gold/25 flex-shrink-0"
              aria-hidden="true"
            >
              {a.num}
            </div>
            <div className="p-5 sm:p-6 sm:pl-7">
              <h3 className="font-serif text-[1.2rem] text-green-deep m-0 mb-2 font-bold">
                {a.title}
              </h3>
              <p className="text-[0.94rem] text-gray-700 leading-relaxed m-0 mb-2">{a.text}</p>
              <p className="text-[0.78rem] text-green italic m-0 font-semibold">{a.refs}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Confession */}
      <div className="mt-12 bg-gradient-to-br from-white to-ivory border-[1.5px] border-gold/40 rounded-[24px] p-6 sm:p-10 md:p-11 text-center shadow-[0_10px_32px_rgba(18,45,36,0.06)]">
        <h3 className="font-serif text-[1.6rem] text-green-deep m-0 mb-1.5 font-bold">
          Our Confession
        </h3>
        <span className="text-[0.75rem] tracking-[0.2em] uppercase text-gold-dark mb-7.5 block">
          Christ's Tabernacle · Prayer & Worship Centre
        </span>
        <div className="flex flex-col gap-3 mb-8">
          {CONFESSIONS.map((c) => (
            <div
              className="flex items-center gap-3.5 bg-white border border-gold/30 rounded-xl p-3.5 sm:px-5 text-left shadow-[0_2px_8px_rgba(18,45,36,0.04)] transition-all duration-200 hover:bg-ivory hover:border-gold hover:translate-x-1"
              key={c}
            >
              <span className="text-gold-dark text-[0.95rem] flex-shrink-0" aria-hidden="true">
                ✝
              </span>
              <span className="text-[0.92rem] text-green-deep font-semibold leading-snug">{c}</span>
            </div>
          ))}
        </div>
        <p className="text-[0.85rem] text-gold-dark tracking-wider font-serif italic">
          A House of Prayer. A Place of Deliverance. A Centre of Healing. A School of Discipleship.
          <br />
          <br />
          PREACH • DELIVER • HEAL • EQUIP
        </p>
      </div>
    </div>
  );
}

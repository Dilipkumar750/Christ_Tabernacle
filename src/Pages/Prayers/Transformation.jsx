import { useState } from "react";

const DECLARATIONS = [
  {
    id: 1,
    title: "1. Renewal of the Mind & Freedom from Worldly Conformity",
    scripture: "Romans 12:2",
    verseText: "Do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.",
    prayer:
      "Lord Jesus, today I surrender every toxic thought, worldly pattern, and anxious imagination at Your cross. By the power of the Holy Spirit, renew my thinking to align with Your living truth. Give me the mind of Christ and pure spiritual discernment in all decisions.",
  },
  {
    id: 2,
    title: "2. New Creation Identity & Severing Past Regrets",
    scripture: "2 Corinthians 5:17",
    verseText: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
    prayer:
      "I decree and declare that my past mistakes, failures, and guilt have no hold over me. In Christ Jesus, I am thoroughly washed in the Blood of the Lamb. I am a brand-new creation, accepted in the Beloved, and clothed in divine righteousness.",
  },
  {
    id: 3,
    title: "3. Total Deliverance from Condemnation and Fear",
    scripture: "Romans 8:1; 2 Timothy 1:7",
    verseText: "There is therefore now no condemnation to those who are in Christ Jesus... For God has not given us a spirit of fear, but of power and of love and of a sound mind.",
    prayer:
      "I renounce the spirit of fear, panic, insecurity, and depression. I receive the spirit of adoption by which I cry 'Abba, Father!' The Blood of Jesus silences every accusation of the enemy against me, my marriage, and my children.",
  },
  {
    id: 4,
    title: "4. Crucified Life & Spiritual Fruitfulness",
    scripture: "Galatians 2:20",
    verseText: "I have been crucified with Christ; it is no longer I who live, but Christ lives in me; and the life which I now live in the flesh I live by faith in the Son of God.",
    prayer:
      "Holy Spirit, crucify every selfish ambition, pride, and fleshly desire in my life. Let the sweet fruits of love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, and self-control flourish abundantly in me today.",
  },
  {
    id: 5,
    title: "5. Healing & Wholeness in Body, Soul, and Spirit",
    scripture: "1 Thessalonians 5:23; Isaiah 53:5",
    verseText: "Now may the God of peace Himself sanctify you completely; and may your whole spirit, soul, and body be preserved blameless at the coming of our Lord Jesus Christ.",
    prayer:
      "By the stripes of Jesus Christ, my body is healed, my mind is restored, and my spirit is quickened. I command sickness, infirmity, fatigue, and pain to depart from my mortal flesh in the mighty name of Jesus Christ.",
  },
  {
    id: 6,
    title: "6. Divine Protection Over Home & Family",
    scripture: "Psalm 91:9–11",
    verseText: "Because you have made the LORD, who is my refuge, even the Most High, your dwelling place, no evil shall befall you, nor shall any plague come near your dwelling.",
    prayer:
      "I draw the Blood line of Jesus Christ around my household, my children, our coming in, and our going out. Lord, dispatch Your ministering angels to surround our home and preserve us from every snare of the fowler and wicked pestilence.",
  },
  {
    id: 7,
    title: "7. Overcoming Victory & Kingdom Authority",
    scripture: "Romans 8:37; Luke 10:19",
    verseText: "Yet in all these things we are more than conquerors through Him who loved us.",
    prayer:
      "I step boldly into this day knowing that greater is He that is in me than he that is in the world. In the name of Jesus, every obstacle shall become a stepping stone for God's glory. Amen and Amen!",
  },
];

export default function Transformation() {
  const [checkedIds, setCheckedIds] = useState([]);

  const toggleCheck = (id) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Hero */}
      <div
        className="rounded-[20px] border-[1.5px] border-gold/40 p-6 sm:p-9 md:p-10 mb-10 shadow-[0_4px_20px_rgba(18,45,36,0.05)] text-text-main"
        style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5ECDD 100%)" }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark border border-gold/40 mb-2">
          † Spiritual Renewal &amp; Deliverance †
        </span>
        <h2 className="font-serif text-[clamp(1.6rem,3.5vw,2.3rem)] my-2 md:my-3 text-green-dark font-bold leading-tight">
          Transformation Prayer <span className="text-gold-dark">Declarations</span>
        </h2>
        <p className="text-gray-700 text-[0.98rem] leading-[1.7] m-0">
          "Do not be conformed to this world, but be transformed by the renewing of your mind." — Romans 12:2. Pray through these 7 foundational biblical declarations daily to maintain spiritual liberty, victory, and divine power in your personal walk with Christ.
        </p>
      </div>

      {/* Progress Strip */}
      <div className="bg-white rounded-[14px] border border-gold/25 p-4 sm:px-6 mb-7 flex justify-between items-center shadow-sm">
        <div>
          <span className="font-bold text-green-dark text-[0.92rem]">
            Today's Prayer Progress:
          </span>{" "}
          <span className="text-gold-dark font-bold">
            {checkedIds.length} of {DECLARATIONS.length} Prayed
          </span>
        </div>
        {checkedIds.length > 0 && (
          <button
            onClick={() => setCheckedIds([])}
            className="text-[0.78rem] text-text-light hover:text-green underline cursor-pointer transition-colors"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Declarations List */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {DECLARATIONS.map((d) => {
          const isDone = checkedIds.includes(d.id);
          return (
            <article
              key={d.id}
              className={`border-[1.5px] rounded-[18px] p-6 sm:p-7 shadow-sm transition-all duration-200 ${
                isDone ? "border-gold bg-gold-soft" : "border-gold/25 bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3">
                <h3 className="font-serif text-lg sm:text-[1.22rem] text-green-dark m-0 font-bold leading-snug">
                  {d.title}
                </h3>
                <button
                  className={`px-3.5 py-1.5 rounded-full text-[0.78rem] font-bold border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isDone
                      ? "bg-gradient-to-r from-green-deep to-green-medium text-gold-bright border-transparent shadow-sm"
                      : "bg-white text-green border-gold/40 hover:border-gold hover:bg-gold/10"
                  }`}
                  onClick={() => toggleCheck(d.id)}
                  aria-pressed={isDone}
                >
                  {isDone ? "✓ Prayed Today" : "Mark as Prayed"}
                </button>
              </div>

              <div className="bg-ivory border-l-[3px] border-gold p-3 sm:p-4 rounded-r-[10px] font-serif italic text-[0.92rem] text-green-dark leading-relaxed my-2.5 sm:my-3.5 mb-4">
                "{d.verseText}"
                <cite className="block not-italic text-[0.76rem] font-bold text-gold-dark mt-1">
                  — {d.scripture}
                </cite>
              </div>

              <p className="text-[0.94rem] text-text-muted leading-[1.75] m-0 pl-1">
                <strong className="text-green-dark">Your Prayer: </strong>
                {d.prayer}
              </p>
            </article>
          );
        })}
      </div>
    </>
  );
}

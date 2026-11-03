import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, BookOpen, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quiz';
import { useLearningProgress } from '../hooks/useLearningProgress';
import { Link } from 'react-router-dom';

export const QuizComponent: React.FC = () => {
  const { recordQuizResult, bestScore, lastScore } = useLearningProgress();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [scoreCount, setScoreCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});

  const categories = [
    { id: 'all', label: 'Semua Soal (10 Soal)' },
    { id: 'Pengertian', label: 'Pengertian & Wajib' },
    { id: 'Ihram', label: 'Ihram & Niat' },
    { id: 'Wukuf', label: 'Wukuf Arafah' },
    { id: 'Thawaf', label: 'Thawaf Ifadah' },
    { id: 'Sa\'i', label: 'Sa\'i' },
    { id: 'Tahallul', label: 'Tahallul' },
    { id: 'Tertib', label: 'Tertib & Urutan' },
  ];

  const filteredQuestions: QuizQuestion[] = selectedCategory === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.category === selectedCategory || (selectedCategory === 'Tertib' && q.category === 'Urutan'));

  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];
  const totalQuestions = filteredQuestions.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // Prevent changing answer after lock

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    setUserAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));

    if (optionIndex === currentQuestion.correctAnswer) {
      setScoreCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Finished quiz!
      const finalScore = Math.round(((scoreCount + (selectedAnswer === currentQuestion.correctAnswer ? 0 : 0)) / totalQuestions) * 100);
      setIsFinished(true);
      recordQuizResult(finalScore, scoreCount, totalQuestions);

      // Trigger celebratory confetti if score >= 70
      if (finalScore >= 70) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore in environments without canvas
        }
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScoreCount(0);
    setIsFinished(false);
    setUserAnswers({});
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScoreCount(0);
    setIsFinished(false);
    setUserAnswers({});
  };

  const finalPercentage = Math.round((scoreCount / totalQuestions) * 100);

  const getGradeInfo = (pct: number) => {
    if (pct >= 90) return { title: 'Mumtaz! (Sempurna)', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', desc: 'Pemahamanmu tentang rukun dan manasik haji luar biasa mendalam.' };
    if (pct >= 75) return { title: 'Jayyid Jiddan (Sangat Baik)', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', desc: 'Kamu telah menguasai sebagian besar materi dan rukun ibadah haji dengan sangat baik.' };
    if (pct >= 60) return { title: 'Jayyid (Cukup Baik)', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', desc: 'Pemahamanmu sudah cukup baik, ulangi materi beberapa rukun untuk hasil maksimal.' };
    return { title: 'Perlu Pengulangan', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', desc: 'Yuk pelajari kembali modul materi 6 rukun haji agar semakin siap dan memahami tata cara haji.' };
  };

  return (
    <div className="space-y-6">
      
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-hajj-primary text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Quiz Card */}
      {!isFinished ? (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-hajj-border shadow-card space-y-6">
          
          {/* Top Header: Question index & Progress bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="px-2.5 py-1 rounded-full bg-hajj-light text-hajj-primary font-bold">
                Soal {currentIndex + 1} dari {totalQuestions}
              </span>
              <span className="text-hajj-navy font-bold">
                Skor Saat Ini: {scoreCount} Benar
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-hajj-secondary to-hajj-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-hajj-muted">
              Kategori: {currentQuestion.category}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-hajj-navy leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          {/* 4 Answer Options */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((option, optIdx) => {
              const optionLetters = ['A', 'B', 'C', 'D'];
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = optIdx === currentQuestion.correctAnswer;

              let optionStyle = 'border-slate-200 hover:border-hajj-primary/50 hover:bg-slate-50 text-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-50/80 text-rose-900 line-through';
                } else {
                  optionStyle = 'border-slate-200 opacity-60 text-slate-500';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all text-xs sm:text-sm ${optionStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isAnswered && isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswered && isSelected && !isCorrect
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {optionLetters[optIdx]}
                  </span>
                  <span className="flex-1 min-w-0 pt-0.5 leading-relaxed">
                    {option}
                  </span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Reveals after answering) */}
          {isAnswered && (
            <div className="p-4 sm:p-5 rounded-2xl bg-hajj-light/80 border border-hajj-border space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-hajj-primary font-bold text-xs">
                <Sparkles className="w-4 h-4 text-hajj-gold" />
                <span>Penjelasan Jawaban:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="py-3 px-6 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>{currentIndex + 1 < totalQuestions ? 'Soal Selanjutnya' : 'Lihat Hasil Kuis'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Final Score & Evaluation View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-hajj-border shadow-card text-center space-y-6">
          
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-hajj-gold text-hajj-navy flex items-center justify-center mx-auto shadow-lg shadow-amber-400/25">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-hajj-muted">
              Evaluasi Hasil Pembelajaran
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-hajj-navy">
              Skor Akhir: {finalPercentage} / 100
            </h3>
          </div>

          {/* Grade Badge */}
          {(() => {
            const grade = getGradeInfo(finalPercentage);
            return (
              <div className={`p-4 rounded-2xl border ${grade.bg} max-w-md mx-auto space-y-1`}>
                <p className={`font-bold text-base ${grade.color}`}>
                  {grade.title}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {grade.desc}
                </p>
              </div>
            );
          })()}

          {/* Score Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500">Jawaban Benar</p>
              <p className="text-lg font-bold text-emerald-600">{scoreCount} Soal</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs text-slate-500">Jawaban Salah</p>
              <p className="text-lg font-bold text-rose-600">{totalQuestions - scoreCount} Soal</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
              <p className="text-xs text-slate-500">Skor Tertinggi</p>
              <p className="text-lg font-bold text-hajj-primary">{bestScore} Poin</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-hajj-primary hover:bg-hajj-navy text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>

            <Link
              to="/materi"
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-hajj-light text-hajj-primary hover:bg-hajj-primary hover:text-white border border-hajj-border text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Materi Haji</span>
            </Link>
          </div>

        </div>
      )}

      {/* Highest Score & Info Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>Riwayat Tersimpan di Browser (localStorage)</span>
        {lastScore !== null && <span>Skor Terakhir: {lastScore} Poin</span>}
      </div>

    </div>
  );
};

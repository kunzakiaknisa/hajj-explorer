import { useState } from 'react';

const STORAGE_KEYS = {
  QUIZ_HISTORY: 'hajj_explorer_quiz_history',
  BEST_SCORE: 'hajj_explorer_best_score',
  LAST_SCORE: 'hajj_explorer_last_score'
};

export interface QuizAttempt {
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
}

export function useLearningProgress() {
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BEST_SCORE);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [lastScore, setLastScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_SCORE);
      return saved !== null ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const recordQuizResult = (score: number, correctAnswers: number, totalQuestions: number) => {
    const attempt: QuizAttempt = {
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score,
      totalQuestions,
      correctAnswers
    };

    const newHistory = [attempt, ...quizHistory].slice(0, 10);
    setQuizHistory(newHistory);
    setLastScore(score);
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem(STORAGE_KEYS.BEST_SCORE, score.toString());
      } catch (e) {
        console.warn(e);
      }
    }

    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SCORE, score.toString());
      localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(newHistory));
    } catch (e) {
      console.warn("Gagal menyimpan riwayat kuis:", e);
    }
  };

  return {
    bestScore,
    lastScore,
    quizHistory,
    recordQuizResult
  };
}

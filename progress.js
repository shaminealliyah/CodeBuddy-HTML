const PROGRESS_KEY = "studentProgress";

function createDefaultProgress() {
  return {
    overallProgress: 0,
    completedExercises: 0,
    totalExercises: 8,
    averageScore: 0,

    moduleProgress: {
      module1: 0,
      module2: 0,
      module3: 0,
      module4: 0,
      module5: 0,
      module6: 0,
      module7: 0,
      module8: 0
    },

    moduleScores: {
      module1: null,
      module2: null,
      module3: null,
      module4: null,
      module5: null,
      module6: null,
      module7: null,
      module8: null
    },

    quizProgress: {
      completedQuiz: 0,
      totalQuiz: 5,
      currentQuizProgress: 0,
      averageQuizScore: 0
    }
  };
}

function getStudentProgress() {
  const defaultProgress = createDefaultProgress();
  const savedData = localStorage.getItem(PROGRESS_KEY);

  if (!savedData) {
    return defaultProgress;
  }

  const savedProgress = JSON.parse(savedData);

  return {
    ...defaultProgress,
    ...savedProgress,

    moduleProgress: {
      ...defaultProgress.moduleProgress,
      ...savedProgress.moduleProgress
    },

    moduleScores: {
      ...defaultProgress.moduleScores,
      ...savedProgress.moduleScores
    },

    quizProgress: {
      ...defaultProgress.quizProgress,
      ...savedProgress.quizProgress
    }
  };
}

function saveModuleProgress(moduleNumber, completedSteps, totalSteps, score = null) {
  const progress = getStudentProgress();

  const moduleKey = "module" + moduleNumber;

  const percentage = Math.round(
    (completedSteps / totalSteps) * 100
  );

  progress.moduleProgress[moduleKey] = Math.max(
    progress.moduleProgress[moduleKey],
    Math.min(100, percentage)
  );

  if (typeof score === "number") {
    progress.moduleScores[moduleKey] = score;
  }

  const moduleValues = Object.values(progress.moduleProgress);

  progress.overallProgress = Math.round(
    moduleValues.reduce((total, value) => total + value, 0) /
    moduleValues.length
  );

  progress.completedExercises = moduleValues.filter(function(value) {
    return value >= 100;
  }).length;

  const scores = Object.values(progress.moduleScores).filter(function(score) {
    return typeof score === "number";
  });

  progress.averageScore = scores.length > 0
    ? Math.round(
        scores.reduce((total, score) => total + score, 0) / scores.length
      )
    : 0;

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function saveQuizProgress(completedQuiz, totalQuiz, averageScore) {
  const progress = getStudentProgress();

  progress.quizProgress.completedQuiz = completedQuiz;
  progress.quizProgress.totalQuiz = totalQuiz;
  progress.quizProgress.currentQuizProgress = Math.round(
    (completedQuiz / totalQuiz) * 100
  );
  progress.quizProgress.averageQuizScore = averageScore;

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}
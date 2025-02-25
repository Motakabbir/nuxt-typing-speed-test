import { ref, computed, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from './useAuth';

interface TestResult {
  wpm: number;
  accuracy: number;
  timestamp: number;
  language: string;
  userId?: string;
}

export const useTypingTest = () => {
  const { $firestore } = useNuxtApp();
  const { locale } = useI18n();
  
  const textToType = ref('');
  const userInput = ref('');
  const startTime = ref(0);
  const endTime = ref(0);
  const isTesting = ref(false);
  const errors = ref(0);
  const totalCharacters = ref(0);
  const hasError = ref(false);
  const isTestCompleted = ref(false);
  const timerInterval: Ref<any> = ref(null);
  const testDuration = ref(60); // Default 60 seconds
  const timeRemaining = ref(testDuration.value);

  // Sample texts in different languages
  const texts = {
    en: [
      "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.",
      "Programming is the art of telling another human what one wants the computer to do.",
      "Technology is best when it brings people together. The internet is becoming the town square for the global village of tomorrow."
    ],
    es: [
      "El veloz murciélago hindú comía feliz cardillo y kiwi. La cigüeña tocaba el saxofón detrás del palenque de paja.",
      "La tecnología es mejor cuando une a las personas. Internet se está convirtiendo en la plaza del pueblo de la aldea global.",
      "Programar es el arte de decirle a otro humano lo que uno quiere que haga la computadora."
    ],
    fr: [
      "Portez ce vieux whisky au juge blond qui fume. Les naïfs ægithales hâtifs pondant à Noël où il gèle sont sûrs d'être déçus.",
      "La technologie est meilleure lorsqu'elle rassemble les gens. Internet devient la place publique du village mondial.",
      "La programmation est l'art de dire à un autre humain ce que l'on veut que l'ordinateur fasse."
    ]
  };

  const timeElapsed = computed(() => {
    return testDuration.value - timeRemaining.value;
  });

  const wpm = computed(() => {
    if (!isTestCompleted.value) return 0;
    const timeInMinutes = timeElapsed.value / 60;
    return timeInMinutes > 0 ? Math.round((userInput.value.split(' ').length / timeInMinutes)) : 0;
  });

  const accuracy = computed(() => {
    const correctCharacters = userInput.value.split('').filter((char, index) => char === textToType.value[index]).length;
    return totalCharacters.value > 0 ? Math.round((correctCharacters / totalCharacters.value) * 100) : 0;
  });

  const currentText = computed(() => textToType.value);

  const getRandomText = () => {
    const currentLang = locale.value as keyof typeof texts;
    const availableTexts = texts[currentLang] || texts.en;
    const randomIndex = Math.floor(Math.random() * availableTexts.length);
    return availableTexts[randomIndex];
  };

  const startTimer = () => {
    if (timerInterval.value) return;
    
    timerInterval.value = setInterval(() => {
      if (timeRemaining.value <= 0) {
        endTest();
        return;
      }
      timeRemaining.value--;
    }, 1000);
  };

  const startTest = () => {
    textToType.value = getRandomText();
    userInput.value = '';
    errors.value = 0;
    totalCharacters.value = textToType.value.length;
    timeRemaining.value = testDuration.value;
    isTesting.value = true;
    startTime.value = Date.now();
    isTestCompleted.value = false;
    hasError.value = false;
    startTimer();
  };

  const endTest = async () => {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    endTime.value = Date.now();
    isTesting.value = false;
    isTestCompleted.value = true;

    // Save result to Firebase if user is authenticated
    const { user } = useAuth();
    if (user.value) {
      const result: TestResult = {
        wpm: wpm.value,
        accuracy: accuracy.value,
        timestamp: Date.now(),
        language: locale.value,
        userId: user.value.uid
      };

      try {
        await addDoc(collection($firestore, 'typing-results'), result);
      } catch (error) {
        console.error('Error saving result:', error);
      }
    }
  };

  const handleInput = (input: string) => {
    if (!isTesting.value || isTestCompleted.value) return;
    
    userInput.value = input;
    const incorrectChars = [...input].filter((char, index) => char !== textToType.value[index]).length;
    errors.value = incorrectChars;
    hasError.value = incorrectChars > 0;

    // Auto-end test if text is completed correctly
    if (input === textToType.value) {
      endTest();
    }
  };

  const onInput = (event: Event) => {
    const input = (event.target as HTMLTextAreaElement).value;
    handleInput(input);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (userInput.value === textToType.value) {
        endTest();
      }
    }
  };

  const retryTest = () => {
    resetTest();
    startTest();
  };

  const resetTest = () => {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    textToType.value = '';
    userInput.value = '';
    startTime.value = 0;
    endTime.value = 0;
    isTesting.value = false;
    errors.value = 0;
    totalCharacters.value = 0;
    hasError.value = false;
    isTestCompleted.value = false;
    timeRemaining.value = testDuration.value;
  };

  // Cleanup on component unmount
  onUnmounted(() => {
    clearInterval(timerInterval.value);
  });

  return {
    textToType,
    userInput,
    isTesting,
    wpm,
    accuracy,
    currentText,
    startTest,
    endTest,
    handleInput,
    onInput,
    handleKeydown,
    retryTest,
    resetTest,
    hasError,
    isTestCompleted,
    timeElapsed,
    timeRemaining,
    testDuration
  };
};
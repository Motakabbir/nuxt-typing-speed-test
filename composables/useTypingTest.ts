import { ref, computed } from 'vue';

export const useTypingTest = () => {
  const textToType = ref('');
  const userInput = ref('');
  const startTime = ref(0);
  const endTime = ref(0);
  const isTesting = ref(false);
  const errors = ref(0);
  const totalCharacters = ref(0);
  const hasError = ref(false);
  const isTestCompleted = ref(false);
  const timeElapsed = computed(() => {
    return isTesting.value ? Math.floor((Date.now() - startTime.value) / 1000) : 0;
  });

  const wpm = computed(() => {
    const timeInMinutes = (endTime.value - startTime.value) / 60000;
    return timeInMinutes > 0 ? Math.round((userInput.value.split(' ').length / timeInMinutes)) : 0;
  });

  const accuracy = computed(() => {
    const correctCharacters = userInput.value.split('').filter((char, index) => char === textToType.value[index]).length;
    totalCharacters.value = textToType.value.length;
    return totalCharacters.value > 0 ? Math.round((correctCharacters / totalCharacters.value) * 100) : 0;
  });

  const currentText = computed(() => textToType.value);

  const startTest = (text) => {
    textToType.value = text;
    userInput.value = '';
    errors.value = 0;
    totalCharacters.value = 0;
    isTesting.value = true;
    startTime.value = Date.now();
    isTestCompleted.value = false;
  };

  const endTest = () => {
    endTime.value = Date.now();
    isTesting.value = false;
    isTestCompleted.value = true;
  };

  const handleInput = (input) => {
    userInput.value = input;
    errors.value = [...input].filter((char, index) => char !== textToType.value[index]).length;
    hasError.value = errors.value > 0;
  };

  const onInput = (event) => {
    handleInput(event.target.value);
  };

  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      endTest();
    }
  };

  const retryTest = () => {
    resetTest();
    startTest(textToType.value);
  };

  const resetTest = () => {
    textToType.value = '';
    userInput.value = '';
    startTime.value = 0;
    endTime.value = 0;
    isTesting.value = false;
    errors.value = 0;
    totalCharacters.value = 0;
    hasError.value = false;
    isTestCompleted.value = false;
  };

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
  };
};
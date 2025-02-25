import { defineStore } from 'pinia';

export const useTypingTestStore = defineStore('typingTest', {
  state: () => ({
    text: '',
    userInput: '',
    timer: 0,
    isTesting: false,
    wpm: 0,
    accuracy: 0,
    errors: 0,
    totalCharacters: 0,
    difficulty: 'medium', // easy, medium, hard
    testLength: 60, // in seconds
    leaderboard: [] as Array<{
      id: string,
      username: string,
      wpm: number,
      accuracy: number,
      date: string
    }>
  }),
  actions: {
    startTest(text: string) {
      this.text = text;
      this.userInput = '';
      this.timer = this.testLength;
      this.isTesting = true;
      this.wpm = 0;
      this.accuracy = 0;
      this.errors = 0;
      this.totalCharacters = text.length;
      this.startTimer();
    },
    startTimer() {
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
          this.calculateWPM();
          this.calculateAccuracy();
        } else {
          clearInterval(interval);
          this.isTesting = false;
        }
      }, 1000);
    },
    calculateWPM() {
      const wordsTyped = this.userInput.trim().split(' ').length;
      this.wpm = Math.floor((wordsTyped / (this.testLength - this.timer)) * 60);
    },
    calculateAccuracy() {
      const correctCharacters = this.userInput.split('').filter((char, index) => char === this.text[index]).length;
      this.accuracy = Math.floor((correctCharacters / this.totalCharacters) * 100);
      this.errors = this.totalCharacters - correctCharacters;
    },
    resetTest() {
      this.text = '';
      this.userInput = '';
      this.timer = 0;
      this.isTesting = false;
      this.wpm = 0;
      this.accuracy = 0;
      this.errors = 0;
      this.totalCharacters = 0;
    },
    setDifficulty(level: 'easy' | 'medium' | 'hard') {
      this.difficulty = level;
    },
    setTestLength(length: number) {
      this.testLength = length;
    },
    addToLeaderboard(score: { username: string; wpm: number; accuracy: number }) {
      const entry = {
        id: Date.now().toString(),
        ...score,
        date: new Date().toISOString()
      };
      this.leaderboard.push(entry);
      this.leaderboard.sort((a, b) => b.wpm - a.wpm);
      
      if (process.client) {
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
      }
    },
    initLeaderboard() {
      if (process.client) {
        const saved = localStorage.getItem('leaderboard');
        if (saved) {
          this.leaderboard = JSON.parse(saved);
        }
      }
    }
  },
});